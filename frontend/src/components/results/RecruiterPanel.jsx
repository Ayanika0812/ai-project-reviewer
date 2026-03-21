import Badge from "../ui/Badge";

function verdictColor(verdict) {
  if (verdict === "Would stand out") return "green";
  if (verdict === "Would skip") return "red";
  return "yellow";
}

function seniorityColor(level) {
  if (level === "senior") return "green";
  if (level === "mid") return "blue";
  return "yellow";
}

export default function RecruiterPanel({ data }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Seniority Signal">
          <Badge label={data.seniority_signal} color={seniorityColor(data.seniority_signal)} />
        </Stat>
        <Stat label="Portfolio Verdict">
          <Badge label={data.portfolio_verdict} color={verdictColor(data.portfolio_verdict)} />
        </Stat>
        <Stat label="README Quality">
          <Badge
            label={data.readme_quality}
            color={data.readme_quality === "strong" ? "green" : data.readme_quality === "missing" ? "red" : "yellow"}
          />
        </Stat>
        <Stat label="Deployment Ready">
          <Badge label={data.deployment_ready ? "Yes" : "No"} color={data.deployment_ready ? "green" : "red"} />
        </Stat>
      </div>

      {data.recruiter_summary && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Recruiter's Take</div>
          <p className="text-gray-200 text-sm leading-relaxed">{data.recruiter_summary}</p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">{label}</div>
      {children}
    </div>
  );
}
