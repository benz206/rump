"use client";
import { useEffect, useState } from "react";
import { script, timing } from "@/config/content";
import type { Demo } from "./useDemo";
export function useAutoplay({ state, goTo }: Demo) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (state.startedAt === null) return;
    const startedAt = state.startedAt;
    const timer = window.setInterval(() => setElapsed(Math.max(0, (Date.now() - startedAt) / 1000)), timing.clockMs);
    return () => window.clearInterval(timer);
  }, [state.startedAt]);
  useEffect(() => {
    if (!state.autoplay || state.startedAt === null) return;
    const offset = Math.max(0, (Date.now() - state.startedAt) / 1000);
    const currentIndex = Math.max(0, script.findLastIndex((line) => line.at <= offset));
    const timers: ReturnType<typeof setTimeout>[] = [];
    script.slice(currentIndex).forEach((line) => {
      timers.push(setTimeout(() => {
        goTo(line.screen);
        if (line.autoClick) timers.push(setTimeout(() => {
          const button = Array.from(document.querySelectorAll<HTMLElement>("[data-demo-action]")).find((element) => element.dataset.demoAction === line.autoClick);
          button?.click();
        }, (line.clickDelay ?? 0) * 1000));
      }, Math.max(0, line.at - offset) * 1000));
    });
    return () => timers.forEach(clearTimeout);
  }, [state.autoplay, state.startedAt, goTo]);
  return elapsed;
}
