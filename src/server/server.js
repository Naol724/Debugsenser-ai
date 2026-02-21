import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL || '*'
        : ['http://localhost:5173', 'http://localhost:5000'],
    credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running',
        hasApiKey: !!process.env.GROQ_API_KEY 
    });
});

// API Routes
app.post('/api/explain', async (req, res) => {
    try {
        const { errorText, language } = req.body;

        if (!errorText) {
            return res.status(400).json({ error: 'Error text is required.' });
        }

        if (!process.env.GROQ_API_KEY) {
            console.error('❌ GROQ_API_KEY is missing!');
            return res.status(500).json({ 
                error: 'Server configuration error',
                details: 'GROQ_API_KEY is not configured. Please check .env file.' 
            });
        }

        console.log(`📝 Processing request for ${language} error...`);

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
                timeout: 30000
            }
        );

        const explanation = response.data.choices[0].message.content;
        console.log('✅ Successfully generated explanation');
        res.json({ explanation });

    } catch (error) {
        console.error('❌ Error reaching Groq API:', error.response?.data || error.message);
        
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
