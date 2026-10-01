"use client";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./sheet";
import { drawer } from "@/lib/motion";
export function DetailDrawer({
  id,
  title,
  description,
  open,
  onClose,
  children,
}: {
  id: string;
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <SheetContent className="sm:max-w-lg">
        <motion.div
          layoutId={`detail-${id}`}
          transition={drawer}
          className="flex h-full flex-col gap-6 overflow-y-auto bg-surface p-8"
        >
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
          {children}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
