# 🔍 AI Project Reviewer

> Built by [Ayanika Paul](https://github.com/AyanikaPaul)

An AI-powered web application that analyzes GitHub repositories and provides structured feedback on code quality, architecture, and best practices — the way a senior engineer or recruiter would.

![AI Project Reviewer](https://img.shields.io/badge/Built%20with-Gemini%20AI-8b5cf6?style=flat-square)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## What It Does

Paste any public GitHub repository URL and get:

- **Overall score** (0–100) with animated counter
- **Strengths** — what the project does well
- **Weaknesses** — what's holding it back
- **Suggestions** — actionable improvements
- **Repo metadata** — stars, forks, watchers, file count, language

### Recruiter Mode (unique feature)
Evaluates the project from a hiring manager's perspective:

- Seniority signal (junior / mid / senior)
- Portfolio verdict (Would stand out / Average / Would skip)
- README quality assessment
- Deployment readiness
- Recruiter's written take
- **Code Quality tab** — breakdown of readability, modularity, naming, and structure

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + Tailwind CSS + Axios |
| Backend | FastAPI (Python) |
| AI | Google Gemini API (gemini-2.0-flash with fallback chain) |
| GitHub Data | GitHub REST API |
| Rate Limiting | slowapi |
| Deploy FE | Vercel |
| Deploy BE | Render |

---

## Project Structure

```
ai-project-reviewer/
├── backend/
│   ├── main.py               # FastAPI app, /review endpoint, rate limiting
│   ├── github_service.py     # GitHub API — fetch repo metadata, files, tree
│   ├── gemini_service.py     # Gemini AI — model fallback chain, JSON parsing
│   ├── prompts.py            # System prompts for standard + recruiter mode
│   ├── models.py             # Pydantic request/response models
│   └── requirements.txt
│
└── frontend/
    └── src/
        ├── api/
        │   └── reviewApi.js          # Axios API calls with timeout + error handling
        ├── components/
        │   ├── form/
        │   │   ├── UrlInput.jsx       # GitHub URL input with icon + glow focus
        │   │   └── ModeToggle.jsx     # Standard / Recruiter mode selector
        │   ├── results/
        │   │   ├── ScoreCard.jsx      # Animated score counter
        │   │   ├── FeedbackList.jsx   # Strengths / weaknesses / suggestions
        │   │   ├── RecruiterPanel.jsx # Recruiter mode output
        │   │   ├── CodeQualityPanel.jsx # Code quality breakdown bars
        │   │   ├── ResultsTabs.jsx    # Tab navigation for results
        │   │   └── RepoMeta.jsx       # Repo stats display
        │   └── ui/
        │       ├── Button.jsx
        │       ├── Badge.jsx
        │       ├── Tabs.jsx
        │       ├── LoadingSteps.jsx   # Animated step-by-step loading
        │       └── ShareButton.jsx    # Copy results to clipboard
        ├── hooks/
        │   └── useCountUp.js         # Animated number counter with easeOutCubic
        ├── utils/
        │   └── score.js              # Shared score thresholds + metadata
        └── pages/
            ├── Home.jsx
            └── Results.jsx
```

---

## Features at a Glance

- Animated score counter (0 → final score with easeOutCubic)
- Step-by-step loading animation during analysis
- Repo metadata panel (stars, forks, watchers, file count)
- Share results — copies formatted summary to clipboard
- Rate limiting — 10 requests/hour per IP
- Gemini model fallback chain — tries multiple models if one fails
- GitHub URL validation before API call
- 30s request timeout with normalized error messages

---

## My Thinking

I built this because I wanted a tool that gives real, structured feedback on GitHub projects — not just "looks good" but the kind of critique a senior engineer or recruiter would actually give.

The core challenge was prompt engineering: getting Gemini to return consistent, structured JSON across different repo types and sizes. I solved this with a strict system prompt, a JSON extraction fallback, and a model fallback chain so the app stays resilient even when one model is overloaded.

Recruiter mode came from a real insight — hiring managers don't read code, they read signals. So I built a separate prompt that evaluates seniority signal, README quality, and deployment readiness as a hiring manager would.

The frontend was designed to feel fast and polished: animated score counter, step-by-step loading, and a share button so results are easy to send to others.

---

## License

MIT © Ayanika Paul 
