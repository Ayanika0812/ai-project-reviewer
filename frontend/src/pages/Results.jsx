import { useLocation, useNavigate } from "react-router-dom";
import ScoreCard from "../components/results/ScoreCard";
import ResultsTabs from "../components/results/ResultsTabs";
import Button from "../components/ui/Button";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Guard: if someone lands here directly with no data
  if (!state?.result) {
    navigate("/");
    return null;
  }

  const { result, mode } = state;

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back */}
        <Button variant="ghost" onClick={() => navigate("/")}>
          ← Back
        </Button>

        {/* Score */}
        <ScoreCard score={result.score} summary={result.summary} />

        {/* Tabs */}
        <ResultsTabs data={result} mode={mode} />
      </div>
    </div>
  );
}
