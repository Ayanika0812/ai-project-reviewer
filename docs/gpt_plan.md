# 🧠 AI Project Reviewer — Project Document

## 📌 Overview

An AI-powered web application that analyzes GitHub repositories and provides structured feedback on code quality, project structure, and overall impact—similar to how a senior developer or recruiter would review a project.

---

## 🎯 Objective

To help developers understand:

* How good their project is
* What improvements are needed
* Whether it is industry-ready

---

## 👤 Target Users

* Students building projects
* Job seekers preparing portfolios
* Developers wanting feedback on their work

---

## ⚙️ Core Features (MVP)

### 1. Input

* User enters GitHub repository URL

### 2. Analysis

* Fetch repository data:

  * README
  * Basic metadata
* Send data to AI (Gemini)

### 3. Output

* Score (0–100)
* Strengths
* Weaknesses
* Suggestions
* Summary

---

## 🔥 Advanced Feature (Phase 2)

* Recruiter Mode:

  * Seniority level detection
  * Portfolio verdict
  * Hiring perspective feedback

---

## 🏗️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios

### Backend

* FastAPI (Python)

### AI

* Google Gemini API

### Integration

* GitHub REST API

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 🔄 System Flow

User Input (GitHub URL)
→ Backend (FastAPI)
→ Fetch Repo Data (GitHub API)
→ Send to Gemini AI
→ Receive Structured Feedback
→ Display in Frontend Dashboard

---

## 📦 API Design

### POST /review

**Request:**
{
"github_url": "string"
}

**Response:**
{
"score": number,
"strengths": [],
"weaknesses": [],
"suggestions": [],
"summary": "string"
}

---

## 🧠 AI Prompt Strategy

The AI will be instructed to:

* Act as a senior software engineer
* Evaluate code quality, structure, and completeness
* Provide actionable feedback
* Return output in strict JSON format

---

## 🚀 Development Plan

### Phase 1

* Setup frontend & backend
* Test Gemini API

### Phase 2

* Build backend endpoint
* Integrate GitHub API

### Phase 3

* Connect frontend to backend
* Display results

### Phase 4

* Add Recruiter Mode
* Improve UI/UX

---

## ⚠️ Constraints

* Do not send full repository (limit data)
* Maintain structured JSON output
* Handle API errors gracefully

---

## 🎯 Success Criteria

* User can input a GitHub repo
* System returns meaningful AI feedback
* Clean UI with readable insights
* Deployed and usable online

---

## 💡 Future Enhancements

* Compare with top GitHub projects
* Auto code improvement suggestions
* Project history tracking
* ML-based scoring system

---
