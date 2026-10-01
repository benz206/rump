"use client";
import { motion } from "motion/react";
import { steps, ui } from "@/config/content";
import { AppShell } from "@/components/shell/AppShell";
import { zoom } from "@/lib/motion";
export function ProductFrame() {
  return (
    <motion.div
      layoutId="product-frame"
      transition={zoom}
      className="relative mx-auto mt-8 h-[360px] w-[576px] max-w-full overflow-hidden rounded-xl border bg-bg"
      aria-label={ui.preview}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 w-[1440px] origin-top-left scale-[0.4]"
        inert
      >
        <AppShell step={steps[0]} preview />
      </div>
    </motion.div>
  );
}
