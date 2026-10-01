"use client";
import { motion } from "motion/react";
import { slides, timing } from "@/config/content";
import { BigNumber } from "@/components/ui/BigNumber";
import { SlideFrame } from "./SlideFrame";
import { ProductFrame } from "./ProductFrame";
import { StatementTicker } from "./StatementTicker";
import { fadeUp } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function DeckPlayer({
  index,
  subPhase,
}: {
  index: number;
  subPhase: number;
}) {
  const slide = slides[index];
  const reduced = useReducedMotion();
  return (
    <SlideFrame index={index} total={slides.length}>
      <StatementTicker key="ticker" />
      <motion.div
        key={slide.id}
        {...fadeUp}
        transition={{ duration: reduced ? 0 : timing.fade }}
        className="relative flex flex-1 flex-col justify-center"
      >
        <div>
        <h1 key="headline" className="max-w-5xl text-5xl leading-[1.08] lg:text-7xl">
          {slide.headline}
        </h1>
        {slide.subhead && (
          <p key="subhead" className="mt-6 text-xl text-muted">{slide.subhead}</p>
        )}
        {slide.stats && (
          <div key="stats" className="mt-20 grid gap-12 md:grid-cols-2">
            {slide.stats.map((stat, i) => (
              <BigNumber key={i} {...stat} />
            ))}
          </div>
        )}
        {slide.bullets && (
          <div key="bullets" className="mt-12 space-y-4">
            {slide.bullets.slice(0, subPhase).map((bullet, i) => (
              <motion.div
                {...fadeUp}
                key={i}
                className="border-t py-6"
              >
                <div className="flex gap-6">
                <span className="font-mono text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-2xl">{bullet.title}</h2>
                  <p className="mt-2 text-muted">{bullet.body}</p>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {slide.isDoorway && <ProductFrame key="product" />}
        </div>
      </motion.div>
    </SlideFrame>
  );
}
