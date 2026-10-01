"use client";
import { motion } from "motion/react";
import { ui } from "@/config/content";
import { Avatar } from "./Avatar";
import { Pill, type Status } from "./Pill";
import { money } from "@/lib/format";
export type DataRow = {
  id: string;
  merchant: string;
  amount: number;
  status: Status;
  avatarColor?: string;
};
export function DataTable({
  rows,
  onSelect,
}: {
  rows: DataRow[];
  onSelect?: (row: DataRow) => void;
}) {
  return (
    <div role="table" className="overflow-hidden rounded-lg border">
      <div
        role="row"
        className="grid grid-cols-[1fr_100px_100px] gap-4 border-b bg-bg px-4 py-3 text-xs text-muted"
      >
        <span role="columnheader">{ui.table.merchant}</span>
        <span role="columnheader">{ui.table.amount}</span>
        <span role="columnheader">{ui.table.status}</span>
      </div>
      {rows.map((row) => (
        <motion.div
          layoutId={`detail-${row.id}`}
          key={row.id}
          role="row"
          className="border-b bg-surface last:border-0"
        >
          <button
            type="button"
            disabled={!onSelect}
            onClick={() => onSelect?.(row)}
            data-demo-action={`open-${row.id}`}
            className="grid w-full grid-cols-[1fr_100px_100px] items-center gap-4 px-4 py-3 text-left text-sm disabled:opacity-100"
          >
            <span role="cell" className="flex items-center gap-3">
              <Avatar name={row.merchant} color={row.avatarColor} />
              {row.merchant}
            </span>
            <span role="cell">{money(row.amount)}</span>
            <span role="cell">
              <Pill status={row.status} />
            </span>
          </button>
        </motion.div>
      ))}
      {rows.length === 0 && (
        <p className="p-4 text-sm text-muted">{ui.empty}</p>
      )}
    </div>
  );
}
