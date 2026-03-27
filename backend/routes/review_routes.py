from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from models import ReviewRequest
from github_service import fetch_repo_data
from gemini_service import analyze_repo

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/review")
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

    return {
        "repo_info": {
            "name": repo_data["name"],
            "description": repo_data["description"],
            "language": repo_data["language"],
            "stars": repo_data["stars"],
            "forks": repo_data["forks"],
            "watchers": repo_data["watchers"],
            "file_count": repo_data["file_count"],
        },
        **result
    }
