import { useCountUp } from "../../hooks/useCountUp";

const BREAKDOWN_ORDER = ["readability", "modularity", "naming", "structure"];

const BREAKDOWN_LABELS = {
  readability: "Readability",
  modularity:  "Modularity",
  naming:      "Naming",
  structure:   "Structure",
};

function BreakdownBar({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span style={{ color: "var(--text)" }}>{label}</span>
        <span className="text-muted">{value}/10</span>
      </div>
      <div className="w-full bg-border h-2 rounded-full overflow-hidden">
        <div
          className="bg-brand-500 h-2 rounded-full transition-all duration-700"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

export default function CodeQualityPanel({ data }) {
  const animatedScore = useCountUp(data.code_quality_score ?? 0);
  const breakdown = data.code_quality_breakdown || {};
  const notes = data.code_quality_notes || [];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
        <div className="text-5xl font-bold tabular-nums text-brand-500">{animatedScore}</div>
        <div>
          <div className="text-muted text-sm">Code Quality Score</div>
          <div className="font-semibold" style={{ color: "var(--text)" }}>out of 100</div>
        </div>
      </div>

      {Object.keys(breakdown).length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="text-sm text-muted uppercase tracking-wide">Breakdown</div>
          {BREAKDOWN_ORDER.map(key => (
            <BreakdownBar key={key} label={BREAKDOWN_LABELS[key]} value={breakdown[key] ?? 0} />
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <div className="text-sm text-muted uppercase tracking-wide mb-3">Observations</div>
          {notes.map((note, i) => (
            <div key={i} className="flex gap-2 items-start text-sm" style={{ color: "var(--text)" }}>
              <span className="mt-0.5 text-muted">•</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
