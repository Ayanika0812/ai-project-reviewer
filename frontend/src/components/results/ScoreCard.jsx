import { getScoreMeta } from "../../utils/score";
import { useCountUp } from "../../hooks/useCountUp";

export default function ScoreCard({ score, summary }) {
  const safeScore = score ?? 0;
  const animatedScore = useCountUp(safeScore);
  const meta = getScoreMeta(safeScore); // stable — based on final score, not animated

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center gap-3">
      <div className={`text-7xl font-bold tabular-nums ${meta.color}`}>
        {animatedScore}
      </div>
      <div className="text-gray-400 text-sm">out of 100</div>
      <div className={`text-lg font-semibold ${meta.color}`}>
        {meta.label}
      </div>
      {summary && <p className="text-gray-400 text-sm max-w-md">{summary}</p>}
    </div>
  );
}
