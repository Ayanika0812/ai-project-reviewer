export const SCORE_RANGES = [
  { min: 75, label: "Strong",     color: "text-green-400",  badge: "success", tier: "high"   },
  { min: 50, label: "Decent",     color: "text-yellow-400", badge: "warning", tier: "medium" },
  { min: 0,  label: "Needs Work", color: "text-red-400",    badge: "danger",  tier: "low"    },
];

export function getScoreMeta(score) {
  const safeScore = Number(score) || 0;
  return SCORE_RANGES.find(range => safeScore >= range.min);
}

export function getScoreLabel(score) {
  return getScoreMeta(score).label;
}
