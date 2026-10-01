"use client";
import { AnimatePresence, motion } from "motion/react";
import { sources, timing, type Step } from "@/config/content";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { registry } from "@/components/steps/registry";
import { PlaceholderStep } from "@/components/steps/PlaceholderStep";
import { fadeUp } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function AppShell({
  step,
  subPhase = 0,
  advanceSub = () => {},
  goTo = () => {},
  preview = false,
}: {
  step: Step;
  subPhase?: number;
  advanceSub?: () => void;
  goTo?: (id: string) => void;
  preview?: boolean;
}) {
  const Component = registry[step.id] ?? PlaceholderStep;
  const reduced = useReducedMotion();
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar active={step.nav} goTo={goTo} />
      <div className="min-w-0 flex-1">
        <motion.div
          initial={{ opacity: preview ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : timing.shellDelay }}
        >
          <TopBar connected={step.id === "connect" ? 0 : sources.length} />
        </motion.div>
        <main className="mx-auto max-w-6xl p-8 pb-28 lg:p-12 lg:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              {...fadeUp}
              transition={{ duration: reduced ? 0 : timing.fade }}
            >
              <Component
                step={step}
                subPhase={subPhase}
                advanceSub={advanceSub}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
