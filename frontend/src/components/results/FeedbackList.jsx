const iconMap = {
  strengths:   { icon: "✓", color: "text-green-400",  bg: "bg-green-900/20 border border-green-900/40" },
  weaknesses:  { icon: "✗", color: "text-red-400",    bg: "bg-red-900/20 border border-red-900/40" },
  suggestions: { icon: "→", color: "text-brand-400",  bg: "bg-brand-500/10 border border-brand-500/20" },
};

export default function FeedbackList({ type, items }) {
  const { icon, color, bg } = iconMap[type] || iconMap.suggestions;
  if (!items || items.length === 0) return null;

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`flex gap-3 items-start p-3 rounded-lg ${bg}`}>
          <span className={`font-bold mt-0.5 ${color}`}>{icon}</span>
          <span className="text-sm" style={{ color: "var(--text)" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
