# AI Project Reviewer — Project Plan

## Overview

An AI-powered web application that analyzes GitHub repositories and provides structured feedback on code quality, architecture, and best practices. Includes a unique "Recruiter Mode" that evaluates projects from a hiring perspective.

---

## Goal

Help developers understand how good their projects are and how to improve them using AI-driven insights. Recruiter Mode helps job seekers understand how their portfolio projects appear to hiring managers and recruiters.

---

## Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React + Vite + Tailwind + Axios |
| Backend     | FastAPI (Python)              |
| AI          | Google Gemini API (gemini-1.5-flash) |
| GitHub Data | GitHub REST API               |
| Database    | None (MVP is stateless)       |
| Deploy FE   | Vercel                        |
| Deploy BE   | Render                        |

---

## Project Structure

```
ai-project-reviewer/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Home, Results
│   │   ├── api/               # Axios API calls
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                   # FastAPI app
│   ├── main.py                # Entry point, routes
│   ├── github_service.py      # GitHub API integration
│   ├── gemini_service.py      # Gemini AI integration
│   ├── prompts.py             # System prompts for standard + recruiter mode
│   ├── models.py              # Pydantic request/response models
│   └── requirements.txt
│
└── docs/
    └── project-plan.md        # This file
```

---

## Core Features

### 1. GitHub Repo Analysis
- Accept a GitHub repository URL as input
- Fetch via GitHub REST API:
  - Repo metadata (name, description, language, stars)
  - README.md content
  - Top-level file/folder structure
  - Key files: `package.json`, `requirements.txt`, main entry file

### 2. Standard Review Mode
AI generates structured feedback:
- Overall score (0–100)
- Strengths
- Weaknesses
- Improvement suggestions
- Summary

Score rubric (baked into prompt):
- Code structure & organization — 25pts
- README & documentation — 20pts
- Best practices & patterns — 20pts
- Project completeness — 20pts
- Originality / complexity — 15pts

### 3. Recruiter Mode
AI evaluates the project from a recruiter/hiring manager perspective:
- README quality (compelling, weak, or missing)
- Seniority signal (junior / mid / senior)
- Deployment readiness
- Portfolio verdict (Would stand out / Average / Would skip)
- Recruiter summary

Recruiter prompt focuses on:
- Is the README compelling to a non-technical hiring manager?
- Does the project demonstrate range or depth?
- Is it deployment-ready / production-quality?
- What seniority level does this signal?
- Would a recruiter click through or scroll past?

---

## API Design

### POST /review

Request:
```json
{
  "github_url": "https://github.com/user/repo",
  "mode": "standard" | "recruiter"
}
```

Response (Standard):
```json
{
  "score": 74,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."],
  "summary": "..."
}
```

Response (Recruiter — extends standard):
```json
{
  "score": 74,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."],
  "summary": "...",
  "readme_quality": "strong | weak | missing",
  "seniority_signal": "junior | mid | senior",
  "deployment_ready": true,
  "portfolio_verdict": "Would stand out | Average | Would skip",
  "recruiter_summary": "..."
}
```

---

## Frontend Pages

### Home (`/`)
- GitHub URL input field
- Mode toggle: Standard | Recruiter
- Submit button
- Brief description of what the tool does

### Results (`/results`)
- Score display (large, prominent)
- Tabs: Overview | Strengths | Improvements | Recruiter Take (if recruiter mode)
- Copy / Share button

---

## Environment Variables

### Backend
```
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token   # optional but recommended
```

### Frontend
```
VITE_API_URL=http://localhost:8000   # dev
VITE_API_URL=https://your-backend.onrender.com   # prod
```

---

## Build Phases

### Phase 1 — Setup (Day 1)
- Initialize frontend (Vite + React + Tailwind)
- Initialize backend (FastAPI)
- Set up folder structure
- Configure environment variables

### Phase 2 — Backend Core (Days 2–3)
- GitHub service: fetch repo metadata, README, file tree, key files
- Gemini service: send structured prompt, parse JSON response
- Prompts: write standard and recruiter mode system prompts
- POST /review endpoint wired up end-to-end

### Phase 3 — Frontend Core (Days 3–4)
- Home page with URL input and mode toggle
- Axios call to backend
- Results page with score and structured output
- Recruiter tab (conditional)

### Phase 4 — Polish (Day 5)
- Error handling (invalid URL, private repo, API failures)
- Loading states
- Basic rate limiting on backend
- Responsive design

### Phase 5 — Deploy (Day 6)
- Frontend → Vercel
- Backend → Render
- Set production env vars
- End-to-end test on live URLs

---

## Key Decisions & Notes

- Cap content sent to Gemini at ~6000 tokens to control costs
- No auth or database in MVP — fully stateless
- Two completely separate system prompts for standard vs recruiter mode
- GitHub token is optional but prevents hitting the 60 req/hr unauthenticated rate limit
- Use `gemini-1.5-flash` for speed and cost efficiency
