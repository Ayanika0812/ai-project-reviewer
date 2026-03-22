const stats = [
  { icon: "⭐", label: "Stars", key: "stars" },
  { icon: "🍴", label: "Forks", key: "forks" },
  { icon: "👁️", label: "Watchers", key: "watchers" },
  { icon: "📁", label: "Files", key: "file_count" },
  { icon: "🧠", label: "Language", key: "language" },
];

export default function RepoMeta({ repo }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
      {repo.description && (
        <p className="text-gray-400 text-sm">{repo.description}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map(({ icon, label, key }) => (
          repo[key] != null && (
            <div key={key} className="flex items-center gap-2 text-sm text-gray-300">
              <span>{icon}</span>
              <span className="text-gray-500">{label}:</span>
              <span className="font-medium text-white">{repo[key]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
