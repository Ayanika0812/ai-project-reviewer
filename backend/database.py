import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "usage.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    conn.close()
