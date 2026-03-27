import psycopg2
import psycopg2.extras
import os

DATABASE_URL = os.getenv("DATABASE_URL")


def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    return conn


def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            device_id TEXT,
            ip_address TEXT,
            country TEXT,
            region TEXT,
            city TEXT,
            repo_url TEXT,
            mode TEXT,
            score INTEGER,
            reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    cur.close()
    conn.close()
