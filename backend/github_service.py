import httpx
from config import GITHUB_TOKEN

GITHUB_API = "https://api.github.com"

# Key files to try fetching for AI context
KEY_FILES = [
    "README.md", "readme.md",
    "package.json", "requirements.txt",
    "main.py", "app.py", "index.js", "index.ts",
    "src/main.jsx", "src/main.tsx", "src/App.jsx", "src/App.tsx",
]


def _headers() -> dict:
    headers = {"Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return headers


def _parse_owner_repo(github_url: str) -> tuple[str, str]:
    """Extract owner and repo name from a GitHub URL."""
    parts = github_url.rstrip("/").replace("https://github.com/", "").split("/")
    if len(parts) < 2:
        raise ValueError("Invalid GitHub URL")
    return parts[0], parts[1]


async def fetch_repo_data(github_url: str) -> dict:
    """Fetch repo metadata, file tree, and key file contents."""
    owner, repo = _parse_owner_repo(github_url)
    headers = _headers()

    async with httpx.AsyncClient(timeout=15) as client:
        # Repo metadata
        meta_res = await client.get(f"{GITHUB_API}/repos/{owner}/{repo}", headers=headers)
        meta_res.raise_for_status()
        meta = meta_res.json()

        # Top-level file tree
        tree_res = await client.get(
            f"{GITHUB_API}/repos/{owner}/{repo}/git/trees/HEAD",
            headers=headers,
            params={"recursive": "1"}
        )
        tree_res.raise_for_status()
        tree = tree_res.json()

        # Collect file paths (top 60 for structure overview)
        file_paths = [item["path"] for item in tree.get("tree", []) if item["type"] == "blob"][:60]

        # Fetch key file contents
        file_contents = {}
        for filepath in KEY_FILES:
            if filepath in file_paths or filepath.lower() in [f.lower() for f in file_paths]:
                content_res = await client.get(
                    f"{GITHUB_API}/repos/{owner}/{repo}/contents/{filepath}",
                    headers=headers
                )
                if content_res.status_code == 200:
                    data = content_res.json()
                    if data.get("encoding") == "base64":
                        import base64
                        decoded = base64.b64decode(data["content"]).decode("utf-8", errors="ignore")
                        # Cap each file at 3000 chars to control token usage
                        file_contents[filepath] = decoded[:3000]

    return {
        "name": meta.get("name"),
        "description": meta.get("description"),
        "language": meta.get("language"),
        "stars": meta.get("stargazers_count"),
        "forks": meta.get("forks_count"),
        "watchers": meta.get("watchers_count"),
        "file_count": len(file_paths),
        "topics": meta.get("topics", []),
        "file_tree": file_paths,
        "file_contents": file_contents,
    }
