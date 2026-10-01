import { pipeline, ui, type Step } from "@/config/content";
import { PipelineDiagram } from "@/components/ui/PipelineDiagram";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
export function UnderTheHood({
  step,
  open,
  onClose,
}: {
  step: Step;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
      modal={false}
    >
      <SheetContent className="p-8 sm:max-w-md">
        <SheetTitle>{ui.hood}</SheetTitle>
        <SheetDescription>{step.underTheHood.body}</SheetDescription>
        <PipelineDiagram nodes={pipeline} active={step.underTheHood.layer} />
        <p className="mt-auto border-t pt-5 text-xs text-muted">{ui.privacy}</p>
      </SheetContent>
    </Sheet>
  );
}
