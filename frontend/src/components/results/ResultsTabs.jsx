import { useState } from "react";
import Tabs from "../ui/Tabs";
import FeedbackList from "./FeedbackList";
import RecruiterPanel from "./RecruiterPanel";

export default function ResultsTabs({ data, mode }) {
  const tabs = [
    { id: "strengths", label: "Strengths" },
    { id: "weaknesses", label: "Weaknesses" },
    { id: "suggestions", label: "Suggestions" },
    ...(mode === "recruiter" ? [{ id: "recruiter", label: "Recruiter Take" }] : []),
  ];

  const [active, setActive] = useState("strengths");

  return (
    <div>
      <Tabs tabs={tabs} active={active} onChange={setActive} />
      {active === "strengths" && <FeedbackList type="strengths" items={data.strengths} />}
      {active === "weaknesses" && <FeedbackList type="weaknesses" items={data.weaknesses} />}
      {active === "suggestions" && <FeedbackList type="suggestions" items={data.suggestions} />}
      {active === "recruiter" && <RecruiterPanel data={data} />}
    </div>
  );
}
