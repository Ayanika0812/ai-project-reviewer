export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b border-gray-800 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
            active === tab.id
              ? "border-brand-500 text-brand-500"
              : "border-transparent text-gray-400 hover:text-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
