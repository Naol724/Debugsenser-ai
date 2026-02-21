# How to Start DebugSense AI

## Quick Start

### Option 1: Start Both Servers Together (Recommended)
```bash
cd debugsense-ai
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:5173

### Option 2: Start Servers Separately

**Terminal 1 - Backend:**
```bash
cd debugsense-ai
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd debugsense-ai
npm run client
```

## Verify Setup

1. Check if backend is running:
   - Open http://localhost:5000/api/health
   - Should see: `{"status":"ok","message":"Server is running","hasApiKey":true}`

2. Check if frontend is running:
   - Open http://localhost:5173
   - You should see the DebugSense AI interface

## Troubleshooting

### "Failed to fetch explanation from the server"
- Make sure both servers are running
- Check that backend is on port 5000
- Check that GROQ_API_KEY is set in .env file

### Port Already in Use
- Kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### API Key Issues
- Verify .env file exists in debugsense-ai folder
- Check GROQ_API_KEY is set correctly
- Get a new key from https://console.groq.com/keys
