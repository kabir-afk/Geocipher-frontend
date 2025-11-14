# Geogcipher — Frontend

Backend repo @ [Geocipher-backend](https://github.com/kabir-afk/Geocipher-backend)

![React](https://img.shields.io/badge/React-19.x-61DAFB)
![Vite](https://img.shields.io/badge/Vite-7.x-646cff)

A React + Vite frontend that recreates the GeoGuessr-style experience using Google Street View. This repository contains the client-side application for single-player rounds, timed challenges, and a multiplayer mode (WebSocket-based). It includes Google OAuth for authentication and a token-refresh flow handled by an Axios instance.

Key features:

- Interactive Street View gameplay (pan/zoom) via Google Maps/Street View components
- Single-player rounds with scoring and timer
- Multiplayer support via WebSocket (`VITE_WS_BASEURL`)
- Google OAuth sign-in and JWT handling (access token stored in cookie)
- Responsive UI styled with Tailwind CSS

**Note:** This repository is the frontend only. A backend server (API + WebSocket endpoints) is required for authentication, token refresh, score persistence, and multiplayer matchmaking.

**Table of contents**

- [Why this project is useful](#why-this-project-is-useful)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Running the app](#running-the-app)
- [Project structure](#project-structure)

## Why this project is useful

- Learning project for modern React with Vite and Tailwind CSS.
- Demonstrates integration with Google OAuth and the Street View API.
- Shows a practical token-refresh pattern and axios interceptors for authenticated APIs.
- Includes a lightweight multiplayer example using WebSockets.

## Tech stack

- React 19 (functional components)
- Vite (dev server, build)
- Tailwind CSS for utility-first styling
- Axios for HTTP requests
- react-router for client routing
- @react-oauth/google for Google sign-in
- @vis.gl/react-google-maps for Street View / maps integration

## Getting started

Prerequisites:

- Node.js 18+ and npm (or use your preferred package manager)

Clone and install dependencies:

```bash
git clone https://github.com/kabir-afk/Geoguesser-clone-frontend.git
cd Geoguesser-clone-frontend
npm install
```

Create a `.env` file (do NOT commit secrets). Example `.env`:

```env
# Set to "development" or "production"
VITE_ENVIRONMENT=development

# Google APIs (replace with your keys)
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

# Backend endpoints
VITE_SERVER_BASEURL=http://localhost:8000/
VITE_WS_BASEURL=ws://localhost:8000/ws/
```

Important: keep credentials and API keys out of source control. The repository contains an example `.env` for local development only.

## Running the app

Development server (hot reload):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment variables

The frontend expects the following environment variables (set these in a local `.env`):

- `VITE_ENVIRONMENT` — `development` or `production`. When `development`, `axios` defaults to `http://localhost:8000/`.
- `VITE_SERVER_BASEURL` — Backend base URL used in production builds.
- `VITE_WS_BASEURL` — WebSocket URL for multiplayer.
- `VITE_GOOGLE_MAPS_API_KEY` — Google Maps / Street View API key.
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID.

The client uses `src/axiosinstance.js` to attach `Authorization` headers (reads `accessToken` from cookies) and runs a transparent refresh flow on 401 responses.

## Project structure

Top-level files & folders you will use most often:

- `src/` — application source
  - `App.jsx` — route definitions and top-level UI
  - `main.jsx` — app entry
  - `axiosinstance.js` — axios instance + token refresh logic
  - `components/` — UI components (e.g., `StreetView.jsx`, `Timer.jsx`, `Navbar.jsx`, `GoogleAuth.jsx`)
  - `pages/` — route pages (`Login`, `Register`, `Multiplayer`, `Profile`)
- `index.html` — Vite HTML entry
- `package.json` — scripts and dependencies

## Backend expectations

This frontend expects a backend that provides:

- Authentication endpoints (login, logout, `api/token/refresh/`)
- HTTP API endpoints for game state and scores
- A WebSocket endpoint for multiplayer at the `VITE_WS_BASEURL` address

For local development the axios instance falls back to `http://localhost:8000/` when `VITE_ENVIRONMENT` is `development`.

---

**Built with ❤️**
