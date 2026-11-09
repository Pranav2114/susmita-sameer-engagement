# Susmita & Sameer — Engagement Invitation

A responsive, animated invitation built with React, TypeScript, Vite, Framer Motion, Lucide icons, and a real QR code generated from the supplied Google Maps URL.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create and check the production build with:

```bash
npm run build
npm run preview
```

## Features

- Animated envelope opening and invitation reveal.
- Responsive couple, event, location, and gallery sections.
- Live countdown to 15 November 2026, 6:30 PM India Standard Time.
- Scannable QR code and Google Maps link for the exact supplied location URL.
- Keyboard-accessible gallery lightbox with Escape and arrow-key navigation.
- Calendar download (`.ics`), WhatsApp sharing, and copy-event-details controls.
- Optional, user-initiated synthesized instrumental tones; no audio is autoplayed or downloaded.
- Photo spaces are abstract placeholders; no personal photos have been fabricated.
- Reduced-motion support and mobile-friendly layouts.

## Deploy

### Vercel

Import the project into Vercel, or use the Vercel CLI. Vite's defaults are suitable:

- Build command: `npm run build`
- Output directory: `dist`

### Netlify

Import the project into Netlify, or use the Netlify CLI. Configure:

- Build command: `npm run build`
- Publish directory: `dist`

No server-side environment variables are required.

## Project layout

```text
src/
  App.tsx       Invitation sections and interactive components
  main.tsx      React entry point
  styles.css    Responsive styling, animations, and design tokens
index.html      App shell and typography
vite.config.ts  Vite configuration
```
