# DebugSense AI

> AI-powered error analysis for developers and students. Paste any stack trace or compiler error and get an instant, structured explanation — what it means, why it happened, and exactly how to fix it.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [NPM Scripts](#npm-scripts)
- [Frontend](#frontend)
  - [Pages & Routes](#pages--routes)
  - [Components](#components)
  - [Styling System](#styling-system)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
  - [Database Models](#database-models)
  - [Caching](#caching)
- [Data Flow](#data-flow)
- [Deployment (Render.com)](#deployment-rendercom)
- [License](#license)

---

## Overview

DebugSense AI is a full-stack web application that connects a React frontend to an Express backend. The backend proxies requests to the [Groq API](https://console.groq.com) running the **LLaMA 3.3 70B** model, which returns structured Markdown explanations. Analyses are persisted per browser session in MongoDB Atlas and surfaced in a dashboard with search and filter.

Key characteristics:
- **No user accounts required** — sessions are identified by a UUID stored in `localStorage`
- **Graceful degradation** — the app works without a database connection; history features are simply disabled
- **In-memory response cache** — identical error+language pairs are served from cache for 5 minutes to reduce Groq API calls
- **Dark / Light theme** — default dark, persisted to `localStorage`, toggled from the navbar

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v3 + `@tailwindcss/typography` |
| Animations | Framer Motion |
| Icons | Lucide React |
| Routing | React Router v7 |
| Markdown rendering | react-markdown |
| Backend runtime | Node.js (ESM) |
| Backend framework | Express 4 |
| AI inference | Groq API — `llama-3.3-70b-versatile` |
| Database | MongoDB Atlas via Mongoose 9 |
| HTTP client | Axios (lazy-loaded on first request) |
| Session IDs | uuid v4 |
| Dev runner | concurrently + nodemon |
| Deployment | Render.com |

---

## Project Structure

```
debugsense-ai/
├── src/
│   ├── client/                     # Vite frontend root
│   │   ├── index.html              # HTML entry point (Inter font, theme init script)
│   │   ├── vite.config.js          # Vite config — proxy /api → :5000, build → /dist
│   │   └── src/
│   │       ├── main.jsx            # React entry — mounts <AppRouter />
│   │       ├── AppRouter.jsx       # BrowserRouter, all page routes, page transitions
│   │       ├── App.jsx             # Legacy debug interface (kept for reference)
│   │       ├── index.css           # Tailwind directives + design system tokens
│   │       ├── components/
│   │       │   ├── Navbar.jsx      # Fixed nav, theme toggle, mobile menu
│   │       │   ├── Footer.jsx      # Site footer with links
│   │       │   ├── HistoryList.jsx # Session history sidebar card
│   │       │   ├── ResultDisplay.jsx # Markdown renderer with code copy buttons
│   │       │   └── ErrorInput.jsx  # (legacy input component)
│   │       └── pages/
│   │           ├── HomePage.jsx    # Landing — hero, features, how-it-works, CTA
│   │           ├── DebugPage.jsx   # Main tool — textarea, language select, results
│   │           ├── DashboardPage.jsx # Analytics — stats cards, history table, search
│   │           ├── AboutPage.jsx   # Mission, values, tech stack, benefits
│   │           ├── PrivacyPage.jsx # Privacy policy
│   │           ├── TermsPage.jsx   # Terms of service
│   │           ├── NotFoundPage.jsx # 404 fallback
│   │           └── ...             # Other static pages (Contact, Docs, etc.)
│   └── server/
│       ├── server.js               # Express app — all API routes, static serving
│       ├── config/
│       │   └── database.js         # Mongoose connection with fallback
│       └── models/
│           ├── ErrorExplanation.js # Main document model (see schema below)
│           └── User.js             # User model (reserved for future auth)
├── dist/                           # Vite production build output (git-ignored)
├── .env                            # Local secrets (git-ignored)
├── .env.example                    # Environment variable template
├── .nvmrc                          # Node version pin
├── package.json                    # Scripts, dependencies
├── tailwind.config.js              # Tailwind theme — custom colors, fonts, animations
├── postcss.config.js               # PostCSS — autoprefixer
├── vite.config.js                  # Root-level Vite config alias
├── render.yaml                     # Render.com one-click deploy config
├── DEPLOYMENT_GUIDE.md             # Detailed deployment walkthrough
├── RUN_APP.bat                     # Windows helper — starts both servers
└── KILL_SERVERS.bat                # Windows helper — kills port 5000 and 5173
```

---

## Getting Started

### Prerequisites

- **Node.js v18+** — check with `node -v` (see `.nvmrc` for pinned version)
- **npm v9+**
- A **[Groq API key](https://console.groq.com/keys)** — free tier is sufficient
- A **MongoDB Atlas** connection string — free M0 cluster works fine (optional; app runs without it)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/debugsense-ai.git
cd debugsense-ai

# 2. Install all dependencies (frontend + backend share one package.json)
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | **Yes** | Your Groq API key from console.groq.com |
| `MONGODB_URI` | No | MongoDB Atlas connection string. If omitted, history features are disabled |
| `PORT` | No | Express server port. Defaults to `5000` |
| `NODE_ENV` | No | Set to `production` on Render. Defaults to `development` |
| `FRONTEND_URL` | No | Allowed CORS origin in production. Defaults to `*` |

`.env` example:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
PORT=5000
NODE_ENV=development
```

### Running Locally

```bash
npm run dev
```

This starts both servers concurrently:

| Server | URL | Description |
|---|---|---|
| Vite dev server | `http://localhost:5173` | React frontend with HMR |
| Express API | `http://localhost:5000` | REST API + health check |

Vite proxies all `/api/*` requests to `http://localhost:5000`, so the frontend never needs to know the backend port.

---

## NPM Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `concurrently "npm run server" "npm run client"` | Start both servers for local development |
| `client` | `vite --config src/client/vite.config.js` | Start Vite dev server only |
| `server` | `nodemon src/server/server.js` | Start Express with auto-restart on changes |
| `build` | `vite build --config src/client/vite.config.js -d dist` | Production build → `/dist` |
| `start` | `node src/server/server.js` | Start Express in production (serves `/dist`) |

---

## Frontend

### Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page — hero, feature cards, how-it-works, CTA |
| `/debug` | `DebugPage` | Main error analysis tool |
| `/app` | `DebugPage` | Legacy alias for `/debug` (backwards compatible) |
| `/dashboard` | `DashboardPage` | Session analytics — stats, history table, search/filter |
| `/about` | `AboutPage` | Mission, vision, values, tech stack |
| `/privacy` | `PrivacyPage` | Privacy policy |
| `/terms` | `TermsPage` | Terms of service |
| `*` | `NotFoundPage` | 404 fallback |

All routes are wrapped in a `PageWrap` motion component that applies a fade+slide-up transition on mount.

### Components

| Component | Purpose |
|---|---|
| `Navbar` | Fixed top bar. Handles theme toggle (dark/light), active route highlighting, mobile hamburger menu. Theme state is read from and written to `localStorage` on every toggle. |
| `Footer` | Site-wide footer with product/legal links and social icons. |
| `HistoryList` | Sidebar card on `DebugPage`. Displays the current session's past analyses. Clicking an item reloads it into the editor. Delete button removes it from the database. |
| `ResultDisplay` | Renders the AI's Markdown response using `react-markdown`. Applies `prose-invert` in dark mode. Code blocks get a copy-to-clipboard button on hover. |

### Styling System

The design system lives in `src/client/src/index.css` as Tailwind `@layer components` and `@layer utilities` classes. All component classes are written with paired light/dark variants so the theme toggle works without any JavaScript class manipulation beyond toggling `dark` on `<html>`.

Key utility classes:

| Class | Description |
|---|---|
| `.page-root` | `min-h-screen bg-slate-50 dark:bg-[#0f1117]` — base page wrapper |
| `.card` | Glassmorphism surface — white in light, `#161b27/80` in dark |
| `.btn-primary` | Indigo→violet gradient button |
| `.btn-ghost` | Adaptive ghost button — slate in light, white/5 in dark |
| `.input-field` | Themed text input / select / textarea |
| `.section-alt` | Alternate section background — `slate-100/70` / `#0d1020` |
| `.glass` | Navbar backdrop — `white/80` / `#161b27/80` with blur |
| `.gradient-text` | Indigo→violet→cyan gradient text |
| `.tag` | Small pill badge — indigo tones |
| `.text-heading` | `text-gray-900 dark:text-white` |
| `.text-body` | `text-gray-600 dark:text-gray-400` |
| `.text-muted` | `text-gray-500 dark:text-gray-400` |
| `.text-subtle` | `text-gray-400 dark:text-gray-600` |

Tailwind config (`tailwind.config.js`) extends the default theme with:
- Custom color scales: `primary`, `secondary`, `accent`
- Font families: `Inter` (sans), `JetBrains Mono` (mono)
- Custom animations: `float`, `pulse-slow`, `slide-up`, `fade-in`
- `darkMode: ['class', '[class~="dark"]']`

---

## Backend

The entire backend is a single file: `src/server/server.js`. It is an ES Module (`"type": "module"` in `package.json`).

### API Endpoints

#### `POST /api/explain`

Sends an error message to the Groq API and returns a structured Markdown explanation.

**Request body:**
```json
{
  "errorText": "TypeError: Cannot read properties of undefined",
  "language": "JavaScript",
  "sessionId": "session_1234567890_abc123"
}
```

**Response `200`:**
```json
{
  "explanation": "## What the error means\n...",
  "sessionId": "session_1234567890_abc123",
  "id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Behaviour:**
1. Validates `errorText` is present and `GROQ_API_KEY` is configured
2. Checks the in-memory cache — returns cached response if hit (5-minute TTL)
3. Builds a structured prompt and calls `https://api.groq.com/openai/v1/chat/completions` with model `llama-3.3-70b-versatile`, `temperature: 0.3`, timeout `25s`
4. Saves the result to MongoDB (skipped gracefully if DB is unavailable)
5. Stores result in cache and returns it

---

#### `GET /api/history/:sessionId`

Returns paginated history for a session.

**Query params:** `limit` (default `20`), `page` (default `1`)

**Response `200`:**
```json
{
  "history": [
    {
      "_id": "64f1a2b3...",
      "errorText": "TypeError: ...",
      "language": "JavaScript",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 5, "pages": 1 }
}
```

Returns `{ history: [], pagination: {...} }` if the database is unavailable.

---

#### `DELETE /api/history/:id`

Deletes a single history entry by its MongoDB `_id`.

**Response `200`:** `{ "message": "History item deleted successfully" }`

**Response `404`:** `{ "error": "History item not found" }`

---

#### `GET /api/health`

Health check endpoint used by Render.com.

**Response `200`:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production",
  "hasApiKey": true,
  "hasDatabase": true,
  "cacheSize": 3,
  "uptime": 3600.5,
  "memory": { "used": 45.2, "total": 67.1 }
}
```

---

#### `GET /api/public-explanations`

Returns publicly marked explanations sorted by `helpfulCount`. Reserved for a future community feed feature.

**Query params:** `language`, `limit`, `page`

---

#### `POST /api/explanations/:id/helpful`

Increments the `helpfulCount` on an explanation. Reserved for future use.

---

### Database Models

#### `ErrorExplanation`

| Field | Type | Notes |
|---|---|---|
| `errorText` | String | Required. The raw error pasted by the user |
| `language` | String | Required. Enum of 11 supported languages |
| `explanation` | String | Required. Full Markdown response from the AI |
| `sessionId` | String | Browser session UUID from `localStorage` |
| `userId` | ObjectId | Ref to `User` — null until auth is implemented |
| `isPublic` | Boolean | Default `false`. For future community feed |
| `tags` | [String] | Reserved for future tagging feature |
| `helpfulCount` | Number | Default `0`. Incremented via `/helpful` endpoint |
| `createdAt` | Date | Auto-set on creation |
| `updatedAt` | Date | Auto-updated on save via `pre('save')` hook |

**Indexes:**
- Full-text on `errorText`, compound on `language`
- `userId + createdAt` (descending)
- `sessionId + createdAt` (descending) — used by the history endpoint

#### `User`

Reserved model for a future authentication system. Not currently used by any route.

---

### Caching

The server maintains a `Map` called `responseCache` keyed by `"${language}:${errorText.substring(0, 100)}"`.

- TTL: **5 minutes**
- Max size: **100 entries** — a sweep runs when the limit is exceeded, removing all expired entries
- Cache is **in-memory only** — it resets on server restart and is not shared across instances

---

## Data Flow

```
Browser
  │
  ├─ GET /                    → HomePage (static, no API)
  │
  ├─ POST /api/explain
  │     │
  │     ├─ Check responseCache
  │     │     └─ HIT  → return cached explanation
  │     │
  │     ├─ MISS → POST https://api.groq.com/openai/v1/chat/completions
  │     │               model: llama-3.3-70b-versatile
  │     │               temperature: 0.3
  │     │
  │     ├─ Save to MongoDB (ErrorExplanation)
  │     ├─ Store in responseCache
  │     └─ Return { explanation, sessionId, id }
  │
  ├─ GET /api/history/:sessionId
  │     └─ MongoDB.find({ sessionId }).sort({ createdAt: -1 })
  │
  └─ DELETE /api/history/:id
        └─ MongoDB.findByIdAndDelete(id)
```

---

## Deployment (Render.com)

The repository includes a `render.yaml` for one-click Blueprint deployment.

### Manual deploy

1. Push to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Web Service**
3. Connect your repository and set:

| Setting | Value |
|---|---|
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Environment** | Node |

4. Add environment variables:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `GROQ_API_KEY` | Your Groq API key |
| `MONGODB_URI` | Your MongoDB Atlas connection string |

5. Click **Create Web Service**

In production, Express serves the Vite build from `/dist` and handles all `*` routes by returning `dist/index.html` (SPA fallback). The health check at `/api/health` is polled by Render to confirm the service is alive.

### Blueprint deploy (render.yaml)

1. Fork this repository
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Blueprint**
3. Connect your fork
4. Set `GROQ_API_KEY` when prompted
5. Deploy

---

## License

MIT — see [LICENSE](./LICENSE)
