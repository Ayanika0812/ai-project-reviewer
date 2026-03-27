from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from github_service import fetch_repo_data
from gemini_service import analyze_repo
from database import get_db
from datetime import date
import httpx

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


async def get_location(ip: str) -> dict:
    try:
        if ip in ("127.0.0.1", "::1", "localhost"):
            return {"country": "Local", "region": "Local", "city": "Local"}
        async with httpx.AsyncClient(timeout=5) as client:
            res = await client.get(f"http://ip-api.com/json/{ip}?fields=country,regionName,city,status")
            data = res.json()
            if data.get("status") == "success":
                return {
                    "country": data.get("country", "Unknown"),
                    "region":  data.get("regionName", "Unknown"),
                    "city":    data.get("city", "Unknown"),
                }
    except Exception as e:
        print(f"[geo] failed: {e}")
    return {"country": "Unknown", "region": "Unknown", "city": "Unknown"}


async def save_review(request: Request, body: dict, score: int, repo_url: str):
    try:
        ip = request.client.host
        reviewed_at = body.get("local_date") or date.today().isoformat()
        location = await get_location(ip)
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """INSERT INTO reviews (device_id, ip_address, country, region, city, repo_url, mode, score, reviewed_at)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (body.get("device_id") or ip, ip,
             location["country"], location["region"], location["city"],
             repo_url, body.get("mode", "standard"), score, reviewed_at)
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"[db] failed to save review: {e}")


@router.post("/review")
@limiter.limit("10/hour")
async def review(request: Request):
    body = await request.json()
    github_url = body.get("github_url")
    mode = body.get("mode", "standard")

    if not github_url:
        raise HTTPException(status_code=400, detail="github_url is required")

    try:
        repo_data = await fetch_repo_data(github_url)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"GitHub fetch failed: {str(e)}")

    try:
        result = await analyze_repo(repo_data, mode)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI analysis failed: {str(e)}")

    await save_review(request, body, result.get("score"), github_url)

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
