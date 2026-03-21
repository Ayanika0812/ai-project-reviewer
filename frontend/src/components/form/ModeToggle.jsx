const modes = [
  {
    id: "standard",
    label: "Standard Review",
    icon: "⚙️",
    desc: "Code quality, structure & best practices",
    active: "border-brand-500 bg-brand-500/10 text-white",
    inactive: "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500",
  },
  {
    id: "recruiter",
    label: "Recruiter Mode",
    icon: "💼",
    desc: "How this looks to a hiring manager",
    active: "border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/20",
    inactive: "border-purple-900 bg-purple-950/40 text-purple-300 hover:border-purple-600",
    badge: "Unique",
  },
];

export default function ModeToggle({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`p-4 rounded-lg border text-left transition-all relative ${
            value === mode.id ? mode.active : mode.inactive
          }`}
        >
          {mode.badge && (
            <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {mode.badge}
            </span>
          )}
          <div className="text-lg mb-1">{mode.icon}</div>
          <div className="font-semibold text-sm">{mode.label}</div>
          <div className="text-xs mt-1 opacity-70">{mode.desc}</div>
        </button>
      ))}
    </div>
  );
}
