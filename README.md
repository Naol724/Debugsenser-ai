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

### Quick Deploy
This app is optimized for deployment on Render.com. Follow these steps:

1. **Push your code to GitHub** (already done!)

2. **Create a new Web Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure the service**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

4. **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `GROQ_API_KEY`: Your Groq API key

5. Click "Create Web Service" and wait for deployment!

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Alternative: Deploy with render.yaml
This repository includes a `render.yaml` file for one-click deployment:
1. Fork this repository
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Blueprint"
4. Connect your forked repository
5. Add your `GROQ_API_KEY` environment variable
6. Deploy!

## License
MIT
