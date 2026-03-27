const stats = [
  { icon: "⭐", label: "Stars",    key: "stars" },
  { icon: "🍴", label: "Forks",    key: "forks" },
  { icon: "👁️", label: "Watchers", key: "watchers" },
  { icon: "📁", label: "Files",    key: "file_count" },
  { icon: "🧠", label: "Language", key: "language" },
];

export default function RepoMeta({ repo }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      {repo.description && (
        <p className="text-muted text-sm">{repo.description}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map(({ icon, label, key }) =>
          repo[key] != null && (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span>{icon}</span>
              <span className="text-muted">{label}:</span>
              <span className="font-medium" style={{ color: "var(--text)" }}>{repo[key]}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
