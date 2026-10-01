import type { ComponentType } from "react";
import { PlaceholderStep, type StepProps } from "./PlaceholderStep";
import { ExampleStep } from "./_examples/ExampleStep";
export const registry: Record<string, ComponentType<StepProps>> = {
  connect: PlaceholderStep,
  scan: PlaceholderStep,
  dashboard: PlaceholderStep,
  example: ExampleStep,
};
export const getStepComponent = (id: string) => registry[id] ?? PlaceholderStep;
