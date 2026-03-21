const iconMap = {
  strengths: { icon: "✓", color: "text-green-400", bg: "bg-green-900/30" },
  weaknesses: { icon: "✗", color: "text-red-400", bg: "bg-red-900/30" },
  suggestions: { icon: "→", color: "text-blue-400", bg: "bg-blue-900/30" },
};

export default function FeedbackList({ type, items }) {
  const { icon, color, bg } = iconMap[type] || iconMap.suggestions;

  if (!items || items.length === 0) return null;

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`flex gap-3 items-start p-3 rounded-lg ${bg}`}>
          <span className={`font-bold mt-0.5 ${color}`}>{icon}</span>
          <span className="text-gray-200 text-sm">{item}</span>
        </li>
      ))}
    </ul>
  );
}
