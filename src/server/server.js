import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/explain', async (req, res) => {
    try {
        const { errorText, language } = req.body;

        if (!errorText) {
            return res.status(400).json({ error: 'Error text is required.' });
        }

        const prompt = `
            Act as an expert, beginner-friendly programming mentor. 
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
            (Provide a small, clear code block showing the corrected approach)
        `;

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
            }
        );

        const explanation = response.data.choices[0].message.content;
        res.json({ explanation });

    } catch (error) {
        console.error('Error reaching Groq API:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to generate explanation. Please try again later.',
            details: error.response?.data || error.message
        });
    }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../dist')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
