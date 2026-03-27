import { useEffect, useState } from "react";

const STEPS = [
  "Fetching repository...",
  "Reading README and files...",
  "Analyzing with AI...",
  "Building your report...",
];

const STEP_DURATIONS = [2000, 2500, 4000, 2000];

export default function LoadingSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let step = 0;
    function advance() {
      step += 1;
      if (step < STEPS.length) {
        setCurrentStep(step);
        setTimeout(advance, STEP_DURATIONS[step]);
      }
    }
    const timer = setTimeout(advance, STEP_DURATIONS[0]);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="w-12 h-12 rounded-full border-4 border-border border-t-brand-500 animate-spin" />
      <ul className="space-y-3 w-full max-w-xs">
        {STEPS.map((step, i) => {
          const isDone   = i < currentStep;
          const isActive = i === currentStep;

          return (
            <li key={i} className={`flex items-center gap-3 text-sm transition-all duration-500 ${
              isDone ? "text-green-400" : isActive ? "text-white" : "text-muted"
            }`}>
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {isDone && (
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isActive && <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />}
                {!isDone && !isActive && <span className="w-2.5 h-2.5 rounded-full bg-border" />}
              </span>
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
