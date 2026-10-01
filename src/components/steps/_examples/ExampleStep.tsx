"use client";
import { useState } from "react";
import { example, ui } from "@/config/content";
import { LoadingGate } from "@/components/ui/LoadingGate";
import { StaggerList } from "@/components/ui/StaggerList";
import { DataTable, type DataRow } from "@/components/ui/DataTable";
import { DetailDrawer } from "@/components/ui/DetailDrawer";
import { ChatTranscript } from "@/components/ui/ChatTranscript";
import { Counter } from "@/components/ui/Counter";
import { IMessageMock } from "@/components/ui/IMessageMock";
import { AgentLog } from "@/components/ui/AgentLog";
import { Typewriter } from "@/components/ui/Typewriter";
import { StatCard } from "@/components/ui/StatCard";
import type { StepProps } from "../PlaceholderStep";
export function ExampleStep({ step, subPhase, advanceSub }: StepProps) {
  const [selected, setSelected] = useState<DataRow | null>(null);
  return (
    <section>
      <p className="label">{ui.reference}</p>
      <h1 className="mb-6 mt-3 text-3xl">{step.title}</h1>
      <LoadingGate ms={step.loadingMs}>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <StatCard
              label={example.statLabel}
              value={<Counter value={example.counter} format="currency" />}
              caption={example.statCaption}
            />
            <StaggerList>
              {example.rows.map((row) => (
                <DataTable key={row.id} rows={[row]} onSelect={setSelected} />
              ))}
            </StaggerList>
            <div className="panel">
              <ChatTranscript messages={example.messages} />
            </div>
            <AgentLog lines={example.logs} />
            <p className="text-sm">
              <Typewriter text={example.typewriter} />
            </p>
            <button
              className="control control-primary"
              data-demo-action="example-click"
              onClick={advanceSub}
            >
              {ui.exampleAction}
            </button>
            <span className="ml-4 text-xs text-muted">
              {ui.beat} {subPhase}
            </span>
          </div>
          <IMessageMock messages={example.messages} />
        </div>
      </LoadingGate>
      <DetailDrawer
        id={selected?.id ?? example.rows[0].id}
        title={ui.drawer}
        description={step.underTheHood.body}
        open={selected !== null || subPhase === 1}
        onClose={() => {
          setSelected(null);
          if (subPhase === 1) advanceSub();
        }}
      >
        <ChatTranscript messages={example.messages} />
        <AgentLog lines={example.logs} />
      </DetailDrawer>
    </section>
  );
}
