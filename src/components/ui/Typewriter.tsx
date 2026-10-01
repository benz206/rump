"use client";
import { useEffect, useState } from "react";
import { timing } from "@/config/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Typewriter({
  text,
  ms = timing.typewriterMs,
}: {
  text: string;
  ms?: number;
}) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / Math.max(1, ms));
      setCount(Math.ceil(text.length * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, ms]);
  return (
    <span aria-label={text}>
      <span aria-hidden="true">{reduced ? text : text.slice(0, count)}</span>
    </span>
  );
}
