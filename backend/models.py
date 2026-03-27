from typing import Optional
from fastapi import Request


class ReviewRequest:
    def __init__(self, github_url: str, mode: str = "standard",
                 local_date: Optional[str] = None, device_id: Optional[str] = None):
        self.github_url = github_url
        self.mode = mode
        self.local_date = local_date
        self.device_id = device_id
