# PWA Offline Testing Guide

## 🧪 How to Test PWA Offline Functionality

### Step 1: Build and Preview
```bash
cd src/client
npm run build
cd dist
npx serve --listen 4173 --single
```

### Step 2: Open Chrome DevTools
1. Open `http://localhost:4173` in Chrome
2. Press F12 to open DevTools
3. Go to **Application** tab

### Step 3: Check Service Worker
1. Click **Service Workers** in left menu
2. Verify status: "activated and controlling the page"
3. Check that no "other origin" warnings appear

### Step 4: Check Cache Storage
1. Click **Cache Storage** in left menu
2. You should see these caches:
   - `workbox-xxxxxx` (precache cache)
   - `google-fonts-cache`
   - `images-cache`
   - `static-resources`
   - `fonts-cache`

### Step 5: Test Offline Mode
1. Go to **Network** tab
2. Set throttling to **"Offline"**
3. Refresh the page (F5)
4. ✅ App should load from cache

### Step 6: Test PWA Installation
1. Look for install icon (⊕) in Chrome address bar
2. Click to install the PWA
3. Open installed app from app launcher
4. Test offline mode in installed app

## 🔍 What to Look For

### ✅ Working Correctly:
- App loads instantly in offline mode
- No network errors in console
- All assets served from cache
- SPA routing works offline
- Install button appears and works

### ❌ Issues to Fix:
- White screen in offline mode
- Network errors for JS/CSS files
- Service worker not controlling page
- Cache storage empty or missing files

## 📱 Mobile Testing

### Android Chrome:
1. Open app in Chrome
2. Install PWA
3. Turn off internet
4. Open installed app
5. Should work offline

### iOS Safari:
1. Open in Safari
2. Share → Add to Home Screen
3. Turn off internet
4. Open from home screen
5. Should work offline

## 🛠️ Troubleshooting

### If Offline Doesn't Work:
1. Clear browser storage: DevTools → Application → Clear storage
2. Unregister service workers: DevTools → Application → Service Workers → Unregister
3. Hard refresh: Ctrl+Shift+R
4. Rebuild and test again

### Check Console for Errors:
- Service worker registration errors
- Cache access denied
- Network request failures

### Verify Build Output:
```bash
npm run build
# Should show:
# PWA v1.2.0
# mode generateSW
# precache 9 entries (1503.40 KiB)
# files generated
# ../../dist/sw.js
# ../../dist/workbox-*.js
```

## 🎯 Expected Results

After following these steps, your PWA should:
- ✅ Work completely offline
- ✅ Load from cache without network
- ✅ Support SPA routing offline
- ✅ Install and run as standalone app
- ✅ Show proper cache storage

The PWA offline functionality should now work perfectly! 🚀
