import { useState } from "react";
import Tabs from "../ui/Tabs";
import FeedbackList from "./FeedbackList";
import RecruiterPanel from "./RecruiterPanel";
import CodeQualityPanel from "./CodeQualityPanel";

export default function ResultsTabs({ data, mode }) {
  const tabs = [
    { id: "strengths", label: "Strengths" },
    { id: "weaknesses", label: "Weaknesses" },
    { id: "suggestions", label: "Suggestions" },
    ...(mode === "recruiter" ? [
      { id: "recruiter", label: "Recruiter Take" },
      { id: "code_quality", label: "Code Quality" },
    ] : []),
  ];

  const defaultTab = mode === "recruiter" ? "recruiter" : "strengths";
  const [active, setActive] = useState(defaultTab);

  return (
    <div>
      <Tabs tabs={tabs} active={active} onChange={setActive} />
      {active === "strengths" && <FeedbackList type="strengths" items={data.strengths} />}
      {active === "weaknesses" && <FeedbackList type="weaknesses" items={data.weaknesses} />}
      {active === "suggestions" && <FeedbackList type="suggestions" items={data.suggestions} />}
      {active === "recruiter" && <RecruiterPanel data={data} />}
      {active === "code_quality" && <CodeQualityPanel data={data} />}
    </div>
  );
}
