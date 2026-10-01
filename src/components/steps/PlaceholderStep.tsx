import type { Step } from "@/config/content";
import { ui } from "@/config/content";
import { LoadingGate } from "@/components/ui/LoadingGate";
export type StepProps = {
  step: Step;
  subPhase: number;
  advanceSub: () => void;
};
export function PlaceholderStep({ step }: StepProps) {
  return (
    <section>
      <p className="label">{ui.template}</p>
      <h1 className="mb-10 mt-4 text-4xl">{step.title}</h1>
      <LoadingGate key={step.id} ms={step.loadingMs}>
        <div className="flex min-h-80 items-center justify-center rounded-xl border border-dashed border-muted/40 bg-surface">
          <p className="font-mono text-sm text-muted">
            {ui.build} {step.id}
          </p>
        </div>
      </LoadingGate>
    </section>
  );
}
