import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitReview } from "../api/reviewApi";
import UrlInput from "../components/form/UrlInput";
import ModeToggle from "../components/form/ModeToggle";
import Button from "../components/ui/Button";
import LoadingSteps from "../components/ui/LoadingSteps";
import RecentReviews from "../components/ui/RecentReviews";

export default function Home() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function isValidGithubUrl(url) {
    return /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(url);
  }

  async function handleSubmit() {
    if (!isValidGithubUrl(url)) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await submitReview(url, mode);
      navigate("/results", { state: { result, mode } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-8 animate-fade-in">

        {loading ? (
          <LoadingSteps />
        ) : (
          <>
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                AI-powered code analysis
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">🔍</span>
                <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
                  AI Project Reviewer
                </h1>
              </div>
              <p className="text-gray-400 text-lg">
                Paste a GitHub repo and get instant feedback
                <span className="text-brand-400"> like a senior engineer would.</span>
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <UrlInput value={url} onChange={setUrl} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
              <ModeToggle value={mode} onChange={setMode} />

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleSubmit}
                disabled={loading || !url.trim()}
                className="w-full"
              >
                Analyze Project
              </Button>
            </div>

            <p className="text-center text-xs text-gray-600">
              Works with public GitHub repositories
            </p>

            <p className="text-center text-xs text-gray-700">
              Built by{" "}
              <a
                href="https://github.com/Ayanika0812"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:underline"
              >
                Ayanika Paul
              </a>
            </p>

            <RecentReviews onSelect={(name) => setUrl(`https://github.com/${name}`)} />
          </>
        )}

      </div>
    </div>
  );
}
