import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScoreCard from "../components/results/ScoreCard";
import ResultsTabs from "../components/results/ResultsTabs";
import RepoMeta from "../components/results/RepoMeta";
import Button from "../components/ui/Button";
import ShareButton from "../components/ui/ShareButton";
import { saveToHistory } from "../utils/history";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.result) {
      navigate("/");
      return;
    }
    const { result, mode } = state;
    if (result.repo_info?.name) {
      saveToHistory({ name: result.repo_info.name, score: result.score, mode });
    }
  }, [state, navigate]);

  if (!state?.result) return null;

  const { result, mode } = state;

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back + Share */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back
          </Button>
          <ShareButton result={result} mode={mode} />
        </div>

        {/* Repo Metadata */}
        {result.repo_info && <RepoMeta repo={result.repo_info} />}

        {/* Score */}
        <ScoreCard score={result.score} summary={result.summary} />

        {/* Tabs */}
        <ResultsTabs data={result} mode={mode} />
      </div>
    </div>
  );
}
