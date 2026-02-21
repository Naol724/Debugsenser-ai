# DebugSense AI - Smart Error Explainer for Developers

A simple, educational full-stack web application designed for computer science students to understand and fix programming errors instantly.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS v3
- **Backend**: Node.js, Express
- **AI Integration**: Groq API (LLaMA-3.3-70b-versatile)

## Features
- Clean, modern, responsive UI.
- Paste stack traces or compiler errors to get beginner-friendly explanations.
- Structured AI responses breaking down:
  1. What the error means
  2. Why it happens
  3. How to fix it
  4. Corrected code examples

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- A [Groq API Key](https://console.groq.com/keys)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your Groq API key:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and set `GROQ_API_KEY=your_key_here`*

### Running the App
Start both the Vite frontend and Express backend concurrently:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Deployment (Render.com)
This app is optimized for a single Web Service deployment on Render:
1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. **Environment**: Node
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`
6. Add the following Environment Variables in the Render dashboard:
   - `GROQ_API_KEY`: Your API key
   - `NODE_ENV`: `production`

## License
MIT
