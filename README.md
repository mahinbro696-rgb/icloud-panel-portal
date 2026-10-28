# iCloud Panel Portal

Responsive green hacker-style dashboard with animated grid, cloud emblem, accessible demo switches, notifications, Free Fire player lookup, and an iPhone 14 Pro Max device-profile label (a display label, not device detection).

## Run
Requires Node.js 20 or later. Run `npm start`, then open http://localhost:3000. No dependencies to install. Run `npm test` for backend tests. Opening index.html directly supports the interface only; lookup requires the server.

## Live player lookup
GET /api/player?uid=9578818632&region=BD

The server uses the documented NF Token public API by default. Availability is not guaranteed; the provider previously returned 503. For Free Fire Community API, configure FF_API_KEY as a server environment variable. Do not put keys in HTML or commit them. `.env.example` documents variables; the server does not automatically load .env files.

Provider references: https://github.com/ravi252/Freefireapi and https://developers.freefirecommunity.com/en/docs

Names are returned only from provider responses, preserving Unicode. Choose the account's region. Not every UID or region is guaranteed to resolve. Errors, invalid UIDs, and unavailable upstreams are displayed honestly.

## Hosting
Run server.js on a Node-compatible host with PORT configured. api/player.js also provides a Vercel Node function. Static-only hosting cannot run UID lookup. Publishing source to GitHub does not deploy a server.

The Aimbot and Location switches are interface preferences only; they do not alter games or track devices. Independent of Apple and Garena.
