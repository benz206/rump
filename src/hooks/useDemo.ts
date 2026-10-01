"use client";
import { useCallback, useEffect, useReducer } from "react";
import { exampleStep, script, slides, steps } from "@/config/content";
export type Mode = "deck" | "demo" | "wrapped";
export type DemoState = { mode: Mode; slideIndex: number; stepIndex: number; subPhase: number; autoplay: boolean; showHood: boolean; showPresenter: boolean; startedAt: number | null; example: boolean };
const initial: DemoState = { mode: "deck", slideIndex: 0, stepIndex: 0, subPhase: 0, autoplay: false, showHood: false, showPresenter: false, startedAt: null, example: false };
type Action = { type: "next" | "prev" | "reset" | "sub" | "autoplay" | "hood" | "presenter" } | { type: "go"; id: string } | { type: "init"; mode: Mode; step: string | null; autoplay: boolean };
export function screenId(state: DemoState) { return state.mode === "deck" ? slides[state.slideIndex].id : state.mode === "wrapped" ? "wrapped" : state.example ? exampleStep.id : steps[state.stepIndex].id; }
function go(state: DemoState, id: string): DemoState {
  if (screenId(state) === id) return state;
  if (id === "wrapped") return { ...state, mode: "wrapped", subPhase: 0, example: false };
  if (id === exampleStep.id) return { ...state, mode: "demo", example: true, subPhase: 0 };
  const slideIndex = slides.findIndex((slide) => slide.id === id);
  if (slideIndex >= 0) return { ...state, mode: "deck", slideIndex, subPhase: 0, example: false };
  const stepIndex = steps.findIndex((step) => step.id === id);
  return stepIndex < 0 ? state : { ...state, mode: "demo", stepIndex, subPhase: 0, example: false };
}
export function demoReducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "init": {
      const ready = { ...initial, mode: action.mode, autoplay: action.autoplay, startedAt: Date.now() };
      const result = action.step ? go(ready, action.step) : ready;
      const offset = script.find((line) => line.screen === screenId(result))?.at ?? 0;
      return { ...result, startedAt: Date.now() - offset * 1000 };
    }
    case "go": return go(state, action.id);
    case "reset": return { ...initial, startedAt: Date.now() };
    case "hood": return { ...state, showHood: !state.showHood };
    case "presenter": return { ...state, showPresenter: !state.showPresenter };
    case "autoplay": return { ...state, autoplay: !state.autoplay, startedAt: Date.now() - (script.find((line) => line.screen === screenId(state))?.at ?? 0) * 1000 };
    case "sub": return { ...state, subPhase: Math.min(state.subPhase + 1, ((state.example ? exampleStep : steps[state.stepIndex]).beats ?? 1) - 1) };
    case "next": {
      if (state.mode === "wrapped") return state;
      if (state.mode === "deck") {
        if (state.subPhase < (slides[state.slideIndex].bullets?.length ?? 0)) return { ...state, subPhase: state.subPhase + 1 };
        return state.slideIndex < slides.length - 1 ? { ...state, slideIndex: state.slideIndex + 1, subPhase: 0 } : { ...state, mode: "demo", stepIndex: 0, subPhase: 0 };
      }
      const step = state.example ? exampleStep : steps[state.stepIndex];
      if (state.subPhase < (step.beats ?? 1) - 1) return { ...state, subPhase: state.subPhase + 1 };
      return state.stepIndex < steps.length - 1 && !state.example ? { ...state, stepIndex: state.stepIndex + 1, subPhase: 0 } : { ...state, mode: "wrapped", subPhase: 0, example: false };
    }
    case "prev": {
      if (state.subPhase > 0) return { ...state, subPhase: state.subPhase - 1 };
      if (state.mode === "wrapped") return { ...state, mode: "demo", stepIndex: steps.length - 1 };
      if (state.mode === "demo") return state.stepIndex > 0 && !state.example ? { ...state, stepIndex: state.stepIndex - 1 } : { ...state, mode: "deck", slideIndex: slides.length - 1, example: false };
      const slideIndex = Math.max(0, state.slideIndex - 1);
      return { ...state, slideIndex, subPhase: slides[slideIndex].bullets?.length ?? 0 };
    }
  }
}
export function useDemo(mode: Mode) {
  const [state, dispatch] = useReducer(demoReducer, { ...initial, mode });
  useEffect(() => { const params = new URLSearchParams(window.location.search); dispatch({ type: "init", mode, step: params.get("step"), autoplay: params.get("autoplay") === "1" }); }, [mode]);
  useEffect(() => {
    if (state.startedAt === null) return;
    const url = new URL(window.location.href);
    url.pathname = `/${state.mode}`;
    if (state.mode === "demo") url.searchParams.set("step", screenId(state)); else url.searchParams.delete("step");
    if (state.autoplay) url.searchParams.set("autoplay", "1"); else url.searchParams.delete("autoplay");
    window.history.replaceState(null, "", url);
  }, [state]);
  const next = useCallback(() => dispatch({ type: "next" }), []);
  const prev = useCallback(() => dispatch({ type: "prev" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);
  const goTo = useCallback((id: string) => dispatch({ type: "go", id }), []);
  const advanceSub = useCallback(() => dispatch({ type: "sub" }), []);
  const toggleAutoplay = useCallback(() => dispatch({ type: "autoplay" }), []);
  const toggleHood = useCallback(() => dispatch({ type: "hood" }), []);
  const togglePresenter = useCallback(() => dispatch({ type: "presenter" }), []);
  return { state, next, prev, reset, goTo, advanceSub, toggleAutoplay, toggleHood, togglePresenter };
}
export type Demo = ReturnType<typeof useDemo>;
