# 🔍 AI Project Reviewer

An AI-powered web application that analyzes GitHub repositories and provides structured feedback on code quality, architecture, and best practices — the way a senior engineer or recruiter would.

![AI Project Reviewer](https://img.shields.io/badge/Built%20with-Gemini%20AI-8b5cf6?style=flat-square)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=flat-square)

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

## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- A [Gemini API key](https://aistudio.google.com)
- A [GitHub personal access token](https://github.com/settings/tokens) (optional but recommended)

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

cp .env.example .env
# Fill in your keys in .env

uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install

cp .env.example .env
# Set VITE_API_URL=http://localhost:8000

npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Environment Variables

### Backend (`backend/.env`)
```
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:8000
VITE_APP_URL=https://your-app.vercel.app
```

---

## API

### `POST /review`

**Request:**
```json
{
  "github_url": "https://github.com/user/repo",
  "mode": "standard"
}
```

**Response (standard):**
```json
{
  "repo_info": { "name": "...", "stars": 120, "forks": 35, ... },
  "score": 82,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."],
  "summary": "..."
}
```

**Response (recruiter — extends standard):**
```json
{
  "readme_quality": "strong",
  "seniority_signal": "mid",
  "deployment_ready": true,
  "portfolio_verdict": "Would stand out",
  "recruiter_summary": "...",
  "code_quality_score": 78,
  "code_quality_breakdown": {
    "readability": 8,
    "modularity": 7,
    "naming": 9,
    "structure": 6
  },
  "code_quality_notes": ["..."]
}
```

---

## Deployment

**Frontend → Vercel**
- Connect your GitHub repo
- Set root directory to `frontend`
- Add `VITE_API_URL` environment variable pointing to your Render backend

**Backend → Render**
- Connect your GitHub repo
- Set root directory to `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add `GEMINI_API_KEY` and `GITHUB_TOKEN` environment variables

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
