import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const COUNTRY_FLAGS = {
  "India": "🇮🇳", "United States": "🇺🇸", "United Kingdom": "🇬🇧",
  "Germany": "🇩🇪", "Canada": "🇨🇦", "Australia": "🇦🇺",
  "France": "🇫🇷", "Brazil": "🇧🇷", "Japan": "🇯🇵", "Local": "🖥️",
};

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-1">
      <span className="text-2xl">{icon}</span>
      <span className="text-3xl font-bold text-white">{value ?? "—"}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}

export default function Admin() {
  const [key, setKey] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Wake up the backend on mount (Render free tier cold start)
  useEffect(() => {
    fetch(`${API_URL}/`).catch(() => {});
  }, []);

  const [filterDate, setFilterDate] = useState(() => {
    // Use browser's local date, not UTC
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  async function fetchStats(adminKey) {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(
        `${API_URL}/admin/stats?key=${encodeURIComponent(adminKey)}&filter_date=${filterDate}`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);
      if (res.status === 403) throw new Error("Invalid admin key");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
      setSubmitted(true);
    } catch (e) {
      if (e.name === "AbortError") {
        setError("Request timed out. Backend may be starting up — try again in a moment.");
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-white text-center">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchStats(key)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            onClick={() => fetchStats(key)}
            disabled={loading || !key.trim()}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Loading..." : "View Stats"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">📊 Usage Dashboard</h1>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-500"
            />
            <button onClick={() => fetchStats(key)} className="text-sm text-brand-400 hover:underline">
              Refresh
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total Reviews" value={stats.total_reviews} icon="🔍" />
          <StatCard label="Unique Users" value={stats.unique_users} icon="👤" />
          <StatCard label={`Reviews on ${stats.selected_date}`} value={stats.reviews_on_date} icon="📅" />
        </div>

        {/* Top repos + countries */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Top Repos</h2>
            {stats.top_repos.length === 0 && <p className="text-gray-600 text-sm">No data yet</p>}
            {stats.top_repos.map((r, i) => (
              <div key={i} className="flex items-center justify-between">
                <a
                  href={r.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-400 hover:underline truncate max-w-[200px]"
                >
                  {r.repo_url.replace("https://github.com/", "")}
                </a>
                <span className="text-xs text-gray-500 ml-2">{r.count}x</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Top Countries</h2>
            {stats.top_countries.length === 0 && <p className="text-gray-600 text-sm">No data yet</p>}
            {stats.top_countries.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-white">
                  {COUNTRY_FLAGS[c.country] || "🌍"} {c.country}
                </span>
                <span className="text-xs text-gray-500">{c.count} reviews</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reviews */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Reviews</h2>
          {stats.recent_reviews.length === 0 && <p className="text-gray-600 text-sm">No data yet</p>}
          <div className="space-y-2">
            {stats.recent_reviews.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                <a
                  href={r.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:underline truncate max-w-[240px]"
                >
                  {r.repo_url.replace("https://github.com/", "")}
                </a>
                <div className="flex items-center gap-3 text-gray-500 shrink-0 ml-2">
                  <span>{COUNTRY_FLAGS[r.country] || "🌍"} {r.city}{r.region ? `, ${r.region}` : ""}, {r.country}</span>
                  <span className="capitalize">{r.mode}</span>
                  {r.score != null && <span className="text-white font-medium">{r.score}/100</span>}
                  <span className="text-xs">{new Date(r.reviewed_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
