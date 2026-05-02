# Deployment presets and instructions

This document describes recommended deployment presets for ERA.

Frontend (Vercel)
- Connect the GitHub repo to Vercel and set the root to /frontend
- Add environment variables in Vercel dashboard: API_BASE_URL (https://your-backend.example.com)
- Configure build: `npm run build` and output directory is default (Next.js)

Backend (Render)
- Create a new Web Service on Render
- Build command: `cd backend && npm ci && npm run build` (if you add a build step)
- Start command: `cd backend && npm start`
- Set environment variables: CRICKET_API_URL, CRICKET_API_KEY, ERA_INFERENCE_BIN

C++ inference service (Docker / Render or AWS ECS)
- Build a Docker image that compiles the C++ binary and exposes it via a small REST wrapper or as a CLI invoked by the Node backend
- Example Dockerfile located in `cpp/Dockerfile` (not yet provided). Push image to Docker Hub or AWS ECR

CI/CD (GitHub Actions)
- Create secrets in the repository settings for Vercel token, Render API key, Docker registry credentials
- Add workflow steps to build and deploy to the target services

Note: I will not add secrets or trigger deployments without your explicit approval. If you want, I can scaffold example GitHub Actions workflows that require secrets to be added before they run.
