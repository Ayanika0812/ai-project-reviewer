from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from enum import Enum


class ReviewMode(str, Enum):
    standard = "standard"
    recruiter = "recruiter"


class ReviewRequest(BaseModel):
    github_url: str
    mode: ReviewMode = ReviewMode.standard


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
