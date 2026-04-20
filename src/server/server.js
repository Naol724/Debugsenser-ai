import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import ErrorExplanation from './models/ErrorExplanation.js';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Connect to MongoDB (with fallback if it fails)
let dbConnected = false;
try {
  connectDB();
  dbConnected = true;
} catch (error) {
  console.error('Database connection failed, running without database...');
  console.error('Some features may not work properly.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Enable trust proxy for proper IP handling in production
app.set('trust proxy', 1);

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL || '*'
        : ['http://localhost:5173', 'http://localhost:5000'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    const health = {
        status: 'ok', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        hasApiKey: !!process.env.GROQ_API_KEY,
        hasDatabase: !!process.env.MONGODB_URI,
        cacheSize: responseCache.size,
        uptime: process.uptime(),
        memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
        }
    };
    
    res.json(health);
});

// Simple in-memory cache for API responses (optional optimization)
const responseCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// API Routes
app.post('/api/explain', async (req, res) => {
    try {
        const { errorText, language, sessionId } = req.body;

        if (!errorText) {
            return res.status(400).json({ error: 'Error text is required.' });
        }

        if (!process.env.GROQ_API_KEY) {
            console.error('GROQ_API_KEY is missing!');
            return res.status(500).json({ 
                error: 'Server configuration error',
                details: 'GROQ_API_KEY is not configured. Please check .env file.' 
            });
        }

        // Generate or use session ID
        const currentSessionId = sessionId || uuidv4();

        // Create cache key
        const cacheKey = `${language}:${errorText.substring(0, 100)}`;
        
        // Check cache first
        const cached = responseCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log('Serving from cache');
            return res.json({ explanation: cached.explanation });
        }

        console.log(`Processing request for ${language} error...`);

        // Lazy load axios only when needed
        const axios = (await import('axios')).default;

        const prompt = `Act as an expert, beginner-friendly programming mentor. 
Analyze the following error message for the programming language: ${language}.

Error Message:
${errorText}

Please provide a structured explanation using Markdown. Your response must include exactly these four sections, cleanly separated by headings (#):
## What the error means
(Briefly explain the error in plain, non-jargon English)

## Why it happens (root cause)
(Explain the underlying concept or common mistake that leads to this)

## How to fix it
(Actionable steps to resolve the issue)

## Corrected Code Example
(Provide a small, clear code block showing the corrected approach)`;

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 25000 // Reduced timeout for faster failure
            }
        );

        const explanation = response.data.choices[0].message.content;
        
        // Save to database (only if connected)
        let savedExplanation = null;
        if (dbConnected && (process.env.MONGODB_URI || "mongodb+srv://gonfanaol39_db_user:vCVuxV1dtJTHUhTt@cluster0.p9tp0za.mongodb.net/?appName=Cluster0")) {
          try {
            const errorExplanation = new ErrorExplanation({
              errorText,
              language,
              explanation,
              sessionId: currentSessionId,
              isPublic: false
            });
            
            savedExplanation = await errorExplanation.save();
            console.log('Saved to database successfully');
          } catch (dbError) {
            console.error('Failed to save to database:', dbError.message);
            // Continue without saving to database
          }
        }
        
        // Cache the response
        responseCache.set(cacheKey, {
          explanation,
          timestamp: Date.now()
        });
        
        // Clean old cache entries periodically
        if (responseCache.size > 100) {
            const now = Date.now();
            for (const [key, value] of responseCache.entries()) {
                if (now - value.timestamp > CACHE_DURATION) {
                    responseCache.delete(key);
                }
            }
        }
        
        console.log('Successfully generated explanation');
        res.json({ 
          explanation,
          sessionId: currentSessionId,
          id: savedExplanation?._id || null
        });

    } catch (error) {
        console.error('Error reaching Groq API:', error.response?.data || error.message);
        
        // Check if it's an API key issue
        if (error.response?.status === 401 || error.response?.status === 403) {
            return res.status(500).json({
                error: 'API authentication failed. Please check your GROQ_API_KEY.',
                details: 'Invalid or missing API key'
            });
        }
        
        // Check if it's a network issue
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            return res.status(500).json({
                error: 'Cannot reach Groq API. Please check your internet connection.',
                details: error.message
            });
        }

        // Check for timeout
        if (error.code === 'ECONNABORTED') {
            return res.status(500).json({
                error: 'Request timeout. Please try again.',
                details: 'The API request took too long to respond'
            });
        }
        
        res.status(500).json({
            error: 'Failed to generate explanation. Please try again later.',
            details: error.response?.data?.error?.message || error.message
        });
    }
});

// Get history for a session
app.get('/api/history/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { limit = 20, page = 1 } = req.query;
        
        if (!dbConnected || !(process.env.MONGODB_URI || "mongodb+srv://gonfanaol39_db_user:vCVuxV1dtJTHUhTt@cluster0.p9tp0za.mongodb.net/?appName=Cluster0")) {
            return res.json({
                history: [],
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: 0,
                    pages: 0
                }
            });
        }
        
        const history = await ErrorExplanation.find({ sessionId })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('errorText language createdAt updatedAt');
        
        const total = await ErrorExplanation.countDocuments({ sessionId });
        
        res.json({
            history,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.json({
            history: [],
            pagination: {
                page: 1,
                limit: 20,
                total: 0,
                pages: 0
            }
        });
    }
});

// Delete a specific error explanation
app.delete('/api/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!dbConnected || !(process.env.MONGODB_URI || "mongodb+srv://gonfanaol39_db_user:vCVuxV1dtJTHUhTt@cluster0.p9tp0za.mongodb.net/?appName=Cluster0")) {
            return res.status(503).json({ error: 'Database not available' });
        }
        
        const result = await ErrorExplanation.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({ error: 'History item not found' });
        }
        
        res.json({ message: 'History item deleted successfully' });
    } catch (error) {
        console.error('Error deleting history item:', error);
        res.status(500).json({ error: 'Failed to delete history item' });
    }
});

// Get public error explanations (for community feature)
app.get('/api/public-explanations', async (req, res) => {
    try {
        const { language, limit = 10, page = 1 } = req.query;
        
        const filter = { isPublic: true };
        if (language && language !== 'All') {
            filter.language = language;
        }
        
        const explanations = await ErrorExplanation.find(filter)
            .sort({ helpfulCount: -1, createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('errorText language explanation helpfulCount createdAt');
        
        const total = await ErrorExplanation.countDocuments(filter);
        
        res.json({
            explanations,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching public explanations:', error);
        res.status(500).json({ error: 'Failed to fetch public explanations' });
    }
});

// Mark explanation as helpful
app.post('/api/explanations/:id/helpful', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ErrorExplanation.findByIdAndUpdate(
            id,
            { $inc: { helpfulCount: 1 } },
            { new: true }
        );
        
        if (!result) {
            return res.status(404).json({ error: 'Explanation not found' });
        }
        
        res.json({ helpfulCount: result.helpfulCount });
    } catch (error) {
        console.error('Error marking as helpful:', error);
        res.status(500).json({ error: 'Failed to update helpful count' });
    }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../dist')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API endpoint: http://localhost:${PORT}/api/explain`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    if (!process.env.GROQ_API_KEY) {
        console.error('⚠️  WARNING: GROQ_API_KEY is not set in .env file!');
    } else {
        console.log('✅ GROQ_API_KEY is configured');
    }
});
