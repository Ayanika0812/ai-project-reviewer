import { getScoreMeta } from "../../utils/score";
import { useCountUp } from "../../hooks/useCountUp";

export default function ScoreCard({ score, summary }) {
  const safeScore = score ?? 0;
  const animatedScore = useCountUp(safeScore);
  const meta = getScoreMeta(safeScore);

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center gap-3">
      <div className={`text-7xl font-bold tabular-nums ${meta.color}`}>{animatedScore}</div>
      <div className="text-muted text-sm">out of 100</div>
      <div className={`text-lg font-semibold ${meta.color}`}>{meta.label}</div>
      {summary && <p className="text-muted text-sm max-w-md">{summary}</p>}
    </div>
  );
}
