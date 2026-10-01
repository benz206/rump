"use client";
import { useState, type ReactNode } from "react";
import { LayoutGroup, MotionConfig } from "motion/react";
import {
  example,
  exampleStep,
  pipeline,
  ui,
  wrappedCards,
} from "@/config/content";
import { theme } from "@/config/theme";
import { Avatar } from "@/components/ui/Avatar";
import { Pill, type Status } from "@/components/ui/Pill";
import { StatCard } from "@/components/ui/StatCard";
import { Counter } from "@/components/ui/Counter";
import { Skeleton } from "@/components/ui/Skeleton";
import { LoadingGate } from "@/components/ui/LoadingGate";
import { StaggerList } from "@/components/ui/StaggerList";
import { TypingDots } from "@/components/ui/TypingDots";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { ChatTranscript } from "@/components/ui/ChatTranscript";
import { IMessageMock } from "@/components/ui/IMessageMock";
import { AgentLog } from "@/components/ui/AgentLog";
import { PipelineDiagram } from "@/components/ui/PipelineDiagram";
import { DetailDrawer } from "@/components/ui/DetailDrawer";
import { DataTable } from "@/components/ui/DataTable";
import { Typewriter } from "@/components/ui/Typewriter";
import { DonutChart } from "@/components/ui/DonutChart";
import { BigNumber } from "@/components/ui/BigNumber";
import { WrappedCard } from "@/components/ui/WrappedCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
function Sample({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="panel min-w-0">
      <h2 className="label mb-6">{name}</h2>
      {children}
    </section>
  );
}
export default function Styleguide() {
  const [open, setOpen] = useState(false);
  const [gate, setGate] = useState(0);
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <TooltipProvider>
          <main className="mx-auto max-w-[1600px] space-y-8 p-10">
            <header>
              <p className="label">{ui.template}</p>
              <h1 className="mt-4 text-5xl">{ui.styleguide}</h1>
            </header>
            <section>
              <h2 className="label mb-4">{ui.tokens}</h2>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-9">
                {Object.entries(theme).map(([name, value]) => (
                  <div
                    className="overflow-hidden rounded-lg border bg-surface"
                    key={name}
                  >
                    <div
                      className="h-16 border-b"
                      style={
                        name === "radius"
                          ? { borderRadius: value, background: theme.line }
                          : { background: value }
                      }
                    />
                    <div className="p-3 font-mono text-xs">
                      <p>{name}</p>
                      <p className="mt-2 text-muted">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <h2 className="label">{ui.primitives}</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Sample name="Avatar">
                <div className="flex gap-3">
                  <Avatar name={example.avatar} />
                  <Avatar name={example.avatar} color={theme.line} />
                </div>
              </Sample>
              <Sample name="Pill">
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(ui.status) as Status[]).map((status) => (
                    <Pill key={status} status={status} />
                  ))}
                </div>
              </Sample>
              <Sample name="Counter">
                <div className="flex flex-wrap gap-6 text-2xl">
                  {(["number", "currency", "percent", "compact"] as const).map(
                    (format) => (
                      <Counter
                        key={format}
                        value={example.counter}
                        format={format}
                      />
                    ),
                  )}
                </div>
              </Sample>
              <Sample name="StatCard">
                <StatCard
                  label={example.statLabel}
                  value={example.statValue}
                  caption={example.statCaption}
                />
              </Sample>
              <Sample name="Skeleton / LoadingGate">
                <Skeleton />
                <div className="my-5">
                  <LoadingGate key={gate} ms={exampleStep.loadingMs}>
                    <p>{ui.reference}</p>
                  </LoadingGate>
                </div>
                <button
                  className="control"
                  onClick={() => setGate((n) => n + 1)}
                >
                  {ui.reset}
                </button>
              </Sample>
              <Sample name="StaggerList">
                <StaggerList>
                  {example.logs.map((line) => (
                    <p className="rounded border p-3 text-sm" key={line}>
                      {line}
                    </p>
                  ))}
                </StaggerList>
              </Sample>
              <Sample name="TypingDots / ChatBubble">
                <div className="space-y-3">
                  <TypingDots />
                  {example.messages.slice(0, 2).map((message) => (
                    <ChatBubble key={message.id} {...message} />
                  ))}
                </div>
              </Sample>
              <Sample name="ChatTranscript">
                <ChatTranscript messages={example.messages} />
              </Sample>
              <Sample name="IMessageMock">
                <IMessageMock messages={example.messages} />
              </Sample>
              <Sample name="AgentLog / Typewriter">
                <AgentLog lines={example.logs} />
                <p className="mt-4 text-sm">
                  <Typewriter text={example.typewriter} />
                </p>
              </Sample>
              <Sample name="PipelineDiagram">
                <PipelineDiagram nodes={pipeline} active={pipeline[2]} />
              </Sample>
              <Sample name="DonutChart">
                <DonutChart data={example.chart} />
              </Sample>
              <div className="lg:col-span-2">
                <Sample name="DataTable / DetailDrawer">
                  <DataTable
                    rows={example.rows}
                    onSelect={() => setOpen(true)}
                  />
                  <div className="mt-4">
                    <DataTable rows={[]} />
                  </div>
                </Sample>
              </div>
              <Sample name="Button / Dialog / Tooltip">
                <div className="flex flex-wrap gap-3">
                  <Button>{ui.next}</Button>
                  <Button disabled>{ui.next}</Button>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" />}>
                      {ui.showDialog}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>{ui.dialog}</DialogTitle>
                      <DialogDescription>{ui.dialogBody}</DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <Tooltip>
                    <TooltipTrigger render={<Button variant="outline" />}>
                      {ui.tooltip}
                    </TooltipTrigger>
                    <TooltipContent>{ui.tooltip}</TooltipContent>
                  </Tooltip>
                </div>
              </Sample>
              <div className="lg:col-span-3">
                <Sample name="BigNumber">
                  <BigNumber
                    value={example.statValue}
                    caption={example.statCaption}
                  />
                </Sample>
              </div>
              {wrappedCards.map((card, i) => (
                <Sample name="WrappedCard" key={i}>
                  <WrappedCard {...card} />
                </Sample>
              ))}
            </div>
            <DetailDrawer
              id={example.rows[0].id}
              title={ui.drawer}
              description={ui.reference}
              open={open}
              onClose={() => setOpen(false)}
            >
              <ChatTranscript messages={example.messages} />
            </DetailDrawer>
          </main>
        </TooltipProvider>
      </LayoutGroup>
    </MotionConfig>
  );
}
