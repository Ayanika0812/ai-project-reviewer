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

  async function handleSubmit() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await submitReview(url, mode);
      navigate("/results", { state: { result, mode } });
    } catch (err) {
      setError("Repository not found or inaccessible. Please check the URL and make sure it's a public GitHub repo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-8">

        {loading ? (
          <LoadingSteps />
        ) : (
          <>
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">🔍</span>
                <h1 className="text-4xl font-bold text-white">AI Project Reviewer</h1>
              </div>
              <p className="text-gray-400">
                Paste a GitHub repo link and get instant AI-powered feedback on your code.
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

            <RecentReviews onSelect={(name) => setUrl(`https://github.com/${name}`)} />
          </>
        )}

      </div>
    </div>
  );
}
