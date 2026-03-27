from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class ReviewMode(str, Enum):
    standard = "standard"
    recruiter = "recruiter"


class ReviewRequest(BaseModel):
    github_url: str
    mode: ReviewMode = ReviewMode.standard
    local_date: Optional[str] = None
    device_id: Optional[str] = None


class StandardReview(BaseModel):
    score: int
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[str]
    summary: str


class RecruiterReview(StandardReview):
    readme_quality: str
    seniority_signal: str
    deployment_ready: bool
    portfolio_verdict: str
    recruiter_summary: str
