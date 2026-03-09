# OHC Management System (starter)

This repository contains a single-file frontend (public/index.html) for an Occupational Health Centre (OHC), plus starter PWA support and a small Express server scaffold.

Quick start (frontend only)
1. Serve the `public` directory (static) using any static server or open `index.html` in your browser.
2. The app uses `localStorage` for patients and medicines by default.

Add PWA support
- The `public/manifest.json` and `public/service-worker.js` files enable basic installability and offline caching.
- Add icons to `public/icons/` as referenced in the manifest.

Start the server (optional)
1. cd server
2. npm install
3. npm run dev
- The server provides simple endpoints:
  - GET /api/patients
  - POST /api/patients
  - GET /api/medicines
  - POST /api/medicines

Next steps
- Replace in-memory server storage with SQLite/Postgres.
- Add authentication and RBAC for production.
- Implement background sync to queue patient saves offline and sync when online.
- Add validation & unit tests.

Contributions welcome.
``` ````

A few implementation notes and recommendations
- When you move to a server-backed model, change the frontend savePatient() to POST /api/patients and update medicines via /api/medicines endpoints. Keep a local queue for offline writes and sync later.
- Replace alert(...) with inline toast messages for better UX.
- For CSV export: include medications as separate columns or a quoted cell; ensure proper UTF-8 BOM (you already add \uFEFF — good).
- For low-stock notifications: consider thresholds per-medicine and push notifications (if PWA permits).
- Accessibility: ensure each input has explicit for= label and add role attributes to interactive elements; test with Lighthouse.

Kya main ab karoon?
- Agar aap chahte hain, main in files ko aapke repo shrishyamadvertising3-web/ohc.sgipl ke ek branch mein commit karke PR bana sakta/ti hoon. (Iske liye mujhe confirm karein ke main repository owner/name use kar sakta/hoon — aapne repo diya hua hai, mujhe ab bas aapka go-ahead chahiye.)
- Ya agar aap chahein to main sirf frontend changes (validation, UI toasts, service worker registration) aapko bhej doon, ya server ko extend kar doon (DB, auth).

Batayein aap kya prefer karenge — main aage kaam shuru kar doon.