"use client";
import { useEffect, useState } from "react";
import { timing, ui } from "@/config/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function AgentLog({
  lines,
  ms = timing.logMs,
}: {
  lines: string[];
  ms?: number;
}) {
  const [count, setCount] = useState(1);
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = setInterval(
      () => setCount((n) => Math.min(n + 1, lines.length)),
      ms,
    );
    return () => clearInterval(timer);
  }, [lines.length, ms]);
  return (
    <div
      className="min-h-24 rounded-lg border bg-bg p-4 font-mono text-xs leading-7"
      role="log"
      aria-label={ui.reference}
    >
      {lines.slice(0, reduced ? lines.length : count).map((line, index) => (
        <p key={index}>
          <span className="mr-3 text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          {line}
        </p>
      ))}
    </div>
  );
}
