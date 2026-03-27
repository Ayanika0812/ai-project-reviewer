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

    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM reviews")
    total_reviews = cur.fetchone()[0]

    cur.execute("SELECT COUNT(DISTINCT device_id) FROM reviews")
    unique_users = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM reviews WHERE DATE(reviewed_at) = %s", (selected_date,))
    reviews_on_date = cur.fetchone()[0]

    cur.execute("SELECT repo_url, COUNT(*) as count FROM reviews GROUP BY repo_url ORDER BY count DESC LIMIT 5")
    top_repos = [{"repo_url": r[0], "count": r[1]} for r in cur.fetchall()]

    cur.execute("SELECT country, COUNT(*) as count FROM reviews GROUP BY country ORDER BY count DESC LIMIT 5")
    top_countries = [{"country": r[0], "count": r[1]} for r in cur.fetchall()]

    cur.execute("SELECT repo_url, mode, score, country, region, city, reviewed_at FROM reviews ORDER BY reviewed_at DESC LIMIT 10")
    cols = [desc[0] for desc in cur.description]
    recent_reviews = [dict(zip(cols, r)) for r in cur.fetchall()]

    cur.close()
    conn.close()

    return {
        "total_reviews":    total_reviews,
        "unique_users":     unique_users,
        "reviews_on_date":  reviews_on_date,
        "selected_date":    selected_date,
        "top_repos":        top_repos,
        "top_countries":    top_countries,
        "recent_reviews":   recent_reviews,
    }
