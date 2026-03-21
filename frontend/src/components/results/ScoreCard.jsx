function scoreColor(score) {
  if (score >= 75) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function scoreLabel(score) {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Decent";
  return "Needs Work";
}

export default function ScoreCard({ score, summary }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center gap-3">
      <div className={`text-7xl font-bold ${scoreColor(score)}`}>{score}</div>
      <div className="text-gray-400 text-sm">out of 100</div>
      <div className={`text-lg font-semibold ${scoreColor(score)}`}>{scoreLabel(score)}</div>
      {summary && <p className="text-gray-400 text-sm max-w-md">{summary}</p>}
    </div>
  );
}
