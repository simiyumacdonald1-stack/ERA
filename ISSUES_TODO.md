# ERA Issues & Milestones (Suggested)

This file lists the immediate issues and milestones for the MVP. You can copy these into GitHub issues and milestones or let me open them for you.

Milestone: MVP - Core features (target 4 weeks)
- Live scores & fixtures (backend + frontend)
- Match detail page (scorecard, commentary)
- Real-time events (WebSockets)
- AI prediction & match analyzer (C++ inference skeleton)
- Music embeds and streams directory (link-outs)

Suggested issues (create one GitHub issue per bullet):

- Wire frontend fixtures page to backend /api/fixtures
- Implement match page and connect to /live Socket.IO namespace
- Add room join events on socket server and emit mock ball events per match
- Add /api/predict endpoint that invokes the C++ inference binary (or returns mock when unset)
- Implement C++ inference CLI: read JSON input from stdin and print JSON prediction
- Add Spotify & YouTube embed components and streams directory page
- Add server-side caching for third-party APIs (Redis) and rate-limiter
- Create CI/CD deploy presets for frontend (Vercel) and backend (Render/AWS)
- Add legal checklist for streaming rights and embed policies

If you want, I can create these as GitHub issues and assign them to milestones — tell me to proceed and I will create them automatically.
