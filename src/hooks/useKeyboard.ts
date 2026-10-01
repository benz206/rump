"use client";
import { useEffect } from "react";
import { steps } from "@/config/content";
import type { Demo } from "./useDemo";
export function useKeyboard(demo: Demo) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || (event.target instanceof HTMLElement && event.target.closest("input,textarea,select,[contenteditable=true],[role=dialog]"))) return;
      if (event.key === " " && event.target instanceof HTMLElement && event.target.closest("button,a")) return;
      const actions: Record<string, () => void> = { ArrowRight: demo.next, " ": demo.next, ArrowLeft: demo.prev, r: demo.reset, a: demo.toggleAutoplay, u: demo.toggleHood, p: demo.togglePresenter };
      const action = actions[event.key.length === 1 ? event.key.toLowerCase() : event.key];
      if (action) { event.preventDefault(); action(); }
      else if (/^[1-9]$/.test(event.key) && steps[Number(event.key) - 1]) demo.goTo(steps[Number(event.key) - 1].id);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [demo]);
}
