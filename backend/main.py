from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from models import ReviewRequest, StandardReview, RecruiterReview
from github_service import fetch_repo_data
from gemini_service import analyze_repo

load_dotenv()

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="AI Project Reviewer")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this in production
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/review")
@limiter.limit("10/hour")
async def review(request: Request, body: ReviewRequest):
    try:
        repo_data = await fetch_repo_data(body.github_url)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"GitHub fetch failed: {str(e)}")

    try:
        result = await analyze_repo(repo_data, body.mode)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI analysis failed: {str(e)}")

    return result
