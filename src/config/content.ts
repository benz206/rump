export type StepId = string;
export type Step = { id: StepId; title: string; nav: string; loadingMs: number; beats?: number; underTheHood: { layer: string; body: string }; data?: Record<string, unknown> };
export type Slide = { id: string; headline: string; subhead?: string; stats?: { value: string; caption: string; source?: string }[]; bullets?: { title: string; body: string }[]; isDoorway?: boolean };
export type ScriptLine = { at: number; screen: string; action?: string; line: string; autoClick?: string; clickDelay?: number };
export const brand = { name: "Rump", tagline: "TODO: tagline", team: ["Julian", "Ben", "Elrich", "Amar"] };
export const sources: { label: string; url: string }[] = [];
export const pipeline = ["Connectors", "Ingest & Normalize", "Entity Resolution", "Classifier", "Specialist Agents", "Action Layer", "Savings Ledger"];
export const opportunities: { id: string; merchant: string; avatarColor: string; type: string; agent: string; annualSavings: number; status: "found" | "drafted" | "saved" | "approval" }[] = [];
export const sidebarNav = ["Home", "Savings", "Subscriptions", "Bills", "Claims", "Perks", "Library", "Wrapped"];
export const slides: Slide[] = [
  { id: "intro", headline: "TODO: opening headline", subhead: "TODO: problem statement", stats: [{ value: "$0,000", caption: "TODO: metric", source: "TODO: source" }] },
  { id: "overview", headline: "TODO: solution headline", subhead: "TODO: supporting copy", bullets: [{ title: "TODO: first point", body: "TODO: supporting detail" }, { title: "TODO: second point", body: "TODO: supporting detail" }] },
  { id: "doorway", headline: "TODO: introduce the product", subhead: "TODO: demo transition", isDoorway: true },
];
export const steps: Step[] = [
  { id: "connect", title: "TODO: connect step", nav: "Home", loadingMs: 600, underTheHood: { layer: "Connectors", body: "TODO: architecture explanation" } },
  { id: "scan", title: "TODO: scan step", nav: "Savings", loadingMs: 800, underTheHood: { layer: "Classifier", body: "TODO: architecture explanation" } },
  { id: "dashboard", title: "TODO: dashboard step", nav: "Savings", loadingMs: 600, underTheHood: { layer: "Savings Ledger", body: "TODO: architecture explanation" } },
];
export const exampleStep: Step = { id: "example", title: "TODO: reference step", nav: "Library", loadingMs: 400, beats: 4, underTheHood: { layer: "Specialist Agents", body: "TODO: example architecture explanation" } };
export const script: ScriptLine[] = [
  { at: 0, screen: "intro", line: "TODO: opening spoken line" },
  { at: 4, screen: "overview", line: "TODO: solution spoken line" },
  { at: 6, screen: "overview", line: "TODO: first point spoken line", autoClick: "next", clickDelay: 0.1 },
  { at: 8, screen: "overview", line: "TODO: second point spoken line", autoClick: "next", clickDelay: 0.1 },
  { at: 10, screen: "doorway", line: "TODO: transition spoken line" },
  { at: 14, screen: "connect", line: "TODO: connect spoken line" },
  { at: 18, screen: "scan", line: "TODO: scan spoken line" },
  { at: 22, screen: "dashboard", line: "TODO: dashboard spoken line" },
  { at: 26, screen: "wrapped", line: "TODO: closing spoken line" },
];
export const wrappedCards = [{ title: "TODO: wrapped headline", value: "$0,000", body: "TODO: wrapped description" }, { title: "TODO: closing headline", value: "0%", body: "TODO: closing description" }];
export const ticker = ["TODO: statement one", "TODO: statement two", "TODO: statement three"];
export const timing = { fade: 0.3, stagger: 0.04, shellDelay: 0.15, zoom: 0.6, countMs: 900, typingMs: 600, messageMs: 900, logMs: 500, typewriterMs: 1000, clockMs: 50, behindSeconds: 3, reduced: 0.001 };
export const ui = {
  template: "TEMPLATE / PLACEHOLDER CONTENT", next: "Next", prev: "Previous", reset: "Reset", autoplay: "Autoplay", hood: "Under the hood", presenter: "Presenter", close: "Close", search: "TODO: search", connected: "Connected:", sources: "sources", footer: "Demo data. Not real accounts.", privacy: "TODO: privacy explanation", build: "TODO: build", current: "Current", upcoming: "Next line", finished: "TODO: end of script", controls: "ARROWS / SPACE TO ADVANCE", reference: "TODO: component reference", styleguide: "TODO: styleguide", tokens: "Design tokens", primitives: "UI primitives", open: "TODO: open details", exampleAction: "TODO: advance example", drawer: "TODO: detail drawer", table: { merchant: "TODO: merchant", amount: "TODO: amount", status: "TODO: status" }, status: { found: "Found", drafted: "Drafted", saved: "Saved", approval: "Approval", running: "Running" }, chart: "TODO: distribution", phone: "TODO: phone conversation", loading: "Loading", progress: "Demo progress", preview: "TODO: product preview", tooltip: "TODO: tooltip", dialog: "TODO: dialog", dialogBody: "TODO: dialog body", showDialog: "TODO: open dialog", beat: "TODO: beat", empty: "TODO: no rows", sanity: "Rump config sanity check:", nav: "Demo navigation",
};
export const example = {
  counter: 0, percent: 0, avatar: "T", rows: [{ id: "example-row", merchant: "TODO: merchant", amount: 0, status: "found" as const }],
  messages: [{ id: "one", text: "TODO: first message", side: "left" as const }, { id: "two", text: "TODO: second message", side: "right" as const }, { id: "three", text: "TODO: third message", side: "left" as const }],
  logs: ["TODO: first agent event", "TODO: second agent event", "TODO: third agent event"],
  chart: [{ name: "TODO: segment one", value: 1 }, { name: "TODO: segment two", value: 1 }],
  typewriter: "TODO: streaming response", statLabel: "TODO: metric", statCaption: "TODO: caption", statValue: "$0,000",
};
export const totalSavings = () => opportunities.reduce((sum, item) => sum + item.annualSavings, 0);
export const scriptForScreen = (id: string) => script.filter((line) => line.screen === id);
export const nextLine = (atSeconds: number) => script.find((line) => line.at > atSeconds);
