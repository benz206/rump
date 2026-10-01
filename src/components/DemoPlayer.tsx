"use client";
import { useEffect } from "react";
import { LayoutGroup, MotionConfig, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Play,
  RotateCcw,
  Presentation,
} from "lucide-react";
import * as content from "@/config/content";
import { exampleStep, slides, steps, ui, wrappedCards } from "@/config/content";
import { useDemo, screenId, type Mode } from "@/hooks/useDemo";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useAutoplay } from "@/hooks/useAutoplay";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registry } from "./steps/registry";
import { AppShell } from "./shell/AppShell";
import { DeckPlayer } from "./deck/DeckPlayer";
import { ProgressBar } from "./shell/ProgressBar";
import { PresenterOverlay } from "./shell/PresenterOverlay";
import { UnderTheHood } from "./shell/UnderTheHood";
import { DemoFooter } from "./shell/DemoFooter";
import { WrappedCard } from "./ui/WrappedCard";
import { zoom } from "@/lib/motion";
export function DemoPlayer({ initialMode }: { initialMode: Mode }) {
  const demo = useDemo(initialMode);
  const { state } = demo;
  useKeyboard(demo);
  const elapsed = useAutoplay(demo);
  const reduced = useReducedMotion();
  const step = state.example ? exampleStep : steps[state.stepIndex];
  const screen = screenId(state);
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const issues: string[] = [];
    const screens = new Set(
      [...steps, ...slides, exampleStep]
        .map((item) => item.id)
        .concat("wrapped"),
    );
    content.script.forEach((line, index) => {
      if (!screens.has(line.screen))
        issues.push(`Unknown screen: ${line.screen}`);
      if (index > 0 && line.at <= content.script[index - 1].at)
        issues.push(`Non-increasing script time: ${line.at}`);
    });
    steps.forEach((item) => {
      if (!registry[item.id]) issues.push(`Missing component: ${item.id}`);
    });
    if (JSON.stringify(content).includes(String.fromCharCode(8212)))
      issues.push("Em dash in content");
    if (issues.length)
      console.warn(`%c${ui.sanity} ${issues.join("; ")}`, "color: red");
  }, []);
  const progress =
    state.mode === "wrapped"
      ? 1
      : ((state.mode === "deck"
          ? state.slideIndex
          : slides.length + state.stepIndex) +
          1) /
        (slides.length + steps.length + 1);
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <div data-screen={screen}>
          <ProgressBar value={progress} />
          {state.mode === "deck" ? (
            <DeckPlayer index={state.slideIndex} subPhase={state.subPhase} />
          ) : state.mode === "demo" ? (
            <motion.div
              layoutId="product-frame"
              transition={reduced ? { duration: 0 } : zoom}
            >
              <AppShell
                step={step}
                subPhase={state.subPhase}
                advanceSub={demo.advanceSub}
                goTo={demo.goTo}
              />
            </motion.div>
          ) : (
            <main className="min-h-screen p-12 pb-28">
              <p className="label mb-8">{ui.template}</p>
              <div className="grid gap-6 md:grid-cols-2">
                {wrappedCards.map((card, i) => (
                  <WrappedCard key={i} {...card} />
                ))}
              </div>
            </main>
          )}
          <footer className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t bg-bg/95 px-6 py-4 backdrop-blur-sm">
            <div className="hidden space-y-2 md:block">
              <DemoFooter />
              <p className="label">{ui.controls}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="control"
                aria-label={ui.reset}
                onClick={demo.reset}
              >
                <RotateCcw size={16} />
              </button>
              <button
                className="control"
                aria-label={ui.autoplay}
                aria-pressed={state.autoplay}
                onClick={demo.toggleAutoplay}
              >
                <Play size={16} />
              </button>
              <button
                className="control"
                aria-label={ui.hood}
                aria-pressed={state.showHood}
                onClick={demo.toggleHood}
              >
                <Code2 size={16} />
              </button>
              <button
                className="control"
                aria-label={ui.presenter}
                aria-pressed={state.showPresenter}
                onClick={demo.togglePresenter}
              >
                <Presentation size={16} />
              </button>
              <span className="mx-2 h-6 border-l" />
              <button
                className="control"
                aria-label={ui.prev}
                onClick={demo.prev}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                className="control control-primary"
                data-demo-action="next"
                onClick={demo.next}
                disabled={state.mode === "wrapped"}
              >
                {ui.next}
                <ArrowRight size={16} />
              </button>
            </div>
          </footer>
          <UnderTheHood
            step={step}
            open={state.showHood}
            onClose={demo.toggleHood}
          />
          {state.showPresenter && (
            <PresenterOverlay screen={screen} elapsed={elapsed} />
          )}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
