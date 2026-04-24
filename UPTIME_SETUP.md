# Uptime Monitoring Setup for Render

## Free Uptime Monitoring Services

### 1. UptimeRobot (Recommended)
- **Plan**: Free
- **Monitors**: 50 checks every 5 minutes
- **Setup**: https://uptimerobot.com/

**Steps:**
1. Sign up for free account
2. Add HTTP monitor: `https://your-app.onrender.com/api/health`
3. Set interval to 5 minutes
4. Add alert notifications (optional)

### 2. Pingdom
- **Plan**: Free (limited)
- **Monitors**: 1 check every minute
- **Setup**: https://www.pingdom.com/

### 3. Better Uptime
- **Plan**: Free
- **Monitors**: 20 checks every 1 minute
- **Setup**: https://betteruptime.com/

## Health Check Endpoint

Add this to your server.js:

```javascript
// Health check endpoint for uptime monitors
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## Multiple Monitors Strategy

Set up 3-4 different services:
- UptimeRobot: Every 5 minutes
- Better Uptime: Every 3 minutes  
- Pingdom: Every 1 minute
- GitHub Actions: Every 10 minutes

This ensures your app stays warm 24/7.
