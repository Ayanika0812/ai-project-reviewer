from fastapi import APIRouter, HTTPException, Query
from database import get_db, init_db
from config import ADMIN_KEY
from datetime import date

router = APIRouter()
init_db()


@router.get("/admin/stats")
def get_stats(key: str = Query(...), filter_date: str = Query(default=None)):
    if key != ADMIN_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")

    # Use provided date or default to today
    selected_date = filter_date or date.today().isoformat()

    conn = get_db()

    total_reviews = conn.execute("SELECT COUNT(*) FROM reviews").fetchone()[0]
    unique_users  = conn.execute("SELECT COUNT(DISTINCT device_id) FROM reviews").fetchone()[0]
    reviews_on_date = conn.execute(
        "SELECT COUNT(*) FROM reviews WHERE DATE(reviewed_at) = ?",
        (selected_date,)
    ).fetchone()[0]

    top_repos = conn.execute(
        "SELECT repo_url, COUNT(*) as count FROM reviews GROUP BY repo_url ORDER BY count DESC LIMIT 5"
    ).fetchall()

    top_countries = conn.execute(
        "SELECT country, COUNT(*) as count FROM reviews GROUP BY country ORDER BY count DESC LIMIT 5"
    ).fetchall()

    recent_reviews = conn.execute(
        "SELECT repo_url, mode, score, country, region, city, reviewed_at FROM reviews ORDER BY reviewed_at DESC LIMIT 10"
    ).fetchall()

    conn.close()

    return {
        "total_reviews":    total_reviews,
        "unique_users":     unique_users,
        "reviews_on_date":  reviews_on_date,
        "selected_date":    selected_date,
        "top_repos":        [dict(r) for r in top_repos],
        "top_countries":    [dict(r) for r in top_countries],
        "recent_reviews":   [dict(r) for r in recent_reviews],
    }
