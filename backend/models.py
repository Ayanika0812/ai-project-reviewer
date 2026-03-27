from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class ReviewMode(str, Enum):
    standard = "standard"
    recruiter = "recruiter"


class ReviewRequest(BaseModel):
    github_url: str
    mode: ReviewMode = ReviewMode.standard
    local_date: Optional[str] = None  # browser's local date e.g. "2026-03-27"
    device_id: Optional[str] = None
    device_id: Optional[str] = None


class StandardReview(BaseModel):
    score: int
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[str]
    summary: str


class RecruiterReview(StandardReview):
    readme_quality: str          # "strong" | "weak" | "missing"
    seniority_signal: str        # "junior" | "mid" | "senior"
    deployment_ready: bool
    portfolio_verdict: str       # "Would stand out" | "Average" | "Would skip"
    recruiter_summary: str
