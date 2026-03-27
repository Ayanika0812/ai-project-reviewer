const colorMap = {
  green:  "bg-green-900/40 text-green-300 border border-green-800/50",
  red:    "bg-red-900/40 text-red-300 border border-red-800/50",
  yellow: "bg-yellow-900/40 text-yellow-300 border border-yellow-800/50",
  blue:   "bg-blue-900/40 text-blue-300 border border-blue-800/50",
  gray:   "bg-card text-muted border border-border",
};

export default function Badge({ label, color = "gray" }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color]}`}>
      {label}
    </span>
  );
}
