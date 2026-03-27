import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
ADMIN_KEY = os.getenv("ADMIN_KEY", "sonai123")  # override in .env


