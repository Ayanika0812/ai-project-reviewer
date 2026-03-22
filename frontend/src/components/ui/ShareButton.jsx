import { useState } from "react";
import { getScoreLabel } from "../../utils/score";
import Button from "./Button";

const APP_URL = import.meta.env.VITE_APP_URL || window.location.origin;

export default function ShareButton({ result, mode }) {
  const [copied, setCopied] = useState(false);

  function buildShareText() {
    const label = getScoreLabel(result.score);
    const strengths = result.strengths?.slice(0, 3).map(s => `• ${s}`).join("\n") || "";
    const verdict = mode === "recruiter" ? `\n🧑‍💼 Recruiter Verdict: ${result.portfolio_verdict}` : "";
    const recruiterSummary = result.recruiter_summary ? `\n\n🧑‍💼 ${result.recruiter_summary}` : "";

    return `🔍 AI Project Reviewer Results\n\n📦 Repo: ${result.repo_info?.name || "Project"}\n⭐ Score: ${result.score}/100 — ${label}${verdict}${recruiterSummary}\n\n💪 Top Strengths:\n${strengths}\n\n🔗 Try it yourself: ${APP_URL}`;
  }

  async function handleCopy() {
    const text = buildShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      try {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert("Failed to copy. Please copy manually.");
      }
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleCopy}
      aria-label="Copy analysis results"
    >
      {copied ? "✅ Copied!" : "📋 Share Results"}
    </Button>
  );
}
