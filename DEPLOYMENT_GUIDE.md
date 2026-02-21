# Deployment Guide for Render.com

## Prerequisites
- GitHub repository with your code pushed
- Render.com account (free tier available)
- Groq API Key

## Step-by-Step Deployment

### 1. Prepare Your Repository
✅ Already done! Your code is ready for deployment.

### 2. Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `Naol724/Debugsenser-ai`

### 3. Configure the Web Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `debugsense-ai` (or any name you prefer)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (or `.` if required)
- **Environment**: `Node`
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

**Instance Type:**
- Select **Free** (or paid if you need better performance)

### 4. Add Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `GROQ_API_KEY` | `your_actual_groq_api_key_here` |
| `PORT` | `5000` (optional, Render sets this automatically) |

⚠️ **IMPORTANT**: Use your real Groq API key, not the placeholder!

### 5. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build the React frontend
   - Start the Express server
3. Wait 3-5 minutes for the first deployment

### 6. Access Your App

Once deployed, Render will provide a URL like:
```
https://debugsense-ai.onrender.com
```

Your app is now live! 🎉

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify build command is correct

### App Crashes on Start
- Check the logs for error messages
- Verify `GROQ_API_KEY` is set correctly
- Ensure `NODE_ENV=production` is set

### API Errors
- Verify your Groq API key is valid
- Check if you have API quota remaining
- Review server logs in Render dashboard

### 404 Errors on Routes
- The app handles React routing automatically
- All routes should work once deployed

## Auto-Deploy

Render automatically deploys when you push to the `main` branch on GitHub.

To disable auto-deploy:
1. Go to your service settings
2. Under "Build & Deploy"
3. Toggle off "Auto-Deploy"

## Custom Domain (Optional)

1. Go to service **Settings** → **Custom Domain**
2. Add your domain
3. Update DNS records as instructed by Render

## Monitoring

- View logs: Dashboard → Your Service → Logs
- Check metrics: Dashboard → Your Service → Metrics
- Set up alerts: Dashboard → Your Service → Notifications

## Cost

- **Free Tier**: 
  - 750 hours/month
  - Spins down after 15 minutes of inactivity
  - Cold starts take 30-60 seconds

- **Paid Tier** ($7/month):
  - Always on
  - No cold starts
  - Better performance

## Support

If you encounter issues:
- Check [Render Documentation](https://render.com/docs)
- Review [Render Community](https://community.render.com/)
- Check your GitHub repository issues
