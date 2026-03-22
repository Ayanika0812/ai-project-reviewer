import { useEffect, useState } from "react";

export function useCountUp(target, duration = 1500) {
  const safeTarget = target ?? 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (safeTarget === 0) {
      setCount(0);
      return;
    }

    const steps = Math.max(30, Math.min(120, safeTarget));
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + safeTarget / steps, safeTarget);

      // easeOutCubic — fast start, smooth finish
      const progress = current / safeTarget;
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * safeTarget));

      if (current >= safeTarget) {
        setCount(safeTarget);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [safeTarget, duration]);

  return count;
}
