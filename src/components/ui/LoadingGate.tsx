"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Skeleton } from "./Skeleton";
export function LoadingGate({
  ms,
  children,
}: {
  ms: number;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(timer);
  }, [ms]);
  return ready ? (
    children
  ) : (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-32" />
      <Skeleton className="w-2/3" />
    </div>
  );
}
