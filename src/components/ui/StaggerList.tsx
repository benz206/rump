"use client";
import { Children, type ReactNode } from "react";
import { motion } from "motion/react";
import { timing } from "@/config/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function StaggerList({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <div className="space-y-3">
      {Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : timing.fade,
            delay: reduced ? 0 : i * timing.stagger,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
