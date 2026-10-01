# /goal: Build Rump (Remotion edition) in 45 minutes

> Paste everything below the line into `/goal`. Also save it as `docs/GOAL.md` in the repo.

---

## 0. Mission and ground rules

You are building **Rump**, a hackathon demo for a **90-second pitch**. Team: Julian, Ben, Elrich, Amar. **Hard time budget: 45 minutes, wall clock.** Section 1 tells you how to spend it.

Rump connects to every financial and communication account you have (Ramp, banks, telecom, email, messages, Slack, Instagram), analyzes your total monthly cash flow across fixed bills, subscriptions, fees, and optional spend, finds every dollar you are leaking, and then acts on it: negotiates bills, downgrades unused plans, files compensation claims, surfaces forgotten balances, and finds cheaper alternatives.

**Architecture of the build: one composition, three outputs.** The entire pitch (3 slides + product demo + Wrapped) is one [Remotion](https://www.remotion.dev/) composition, `RumpPitch` (1920×1080, 30 fps, 90 s).

- **Live on stage:** `/present` plays it full screen with `@remotion/player`. `→` plays to the next beat and pauses. An animated fake cursor performs every click. Nothing is really clickable, so nothing can break.
- **Video:** the same composition renders to MP4 (`npm run render:pitch`). The demo-only cut `RumpDemo` is the slide-3 video.
- **Stills:** slides render to PNG as a backup deck.

**Non-negotiable rules:**

1. **Nothing has to work in real life.** All data is hardcoded. No real APIs, no auth, no backend, no database, no env vars. Every "connection", "scan" and "agent" is a frame-timed animation over static data.
2. **It must look real and feel fast.** Every state has a loading state (skeleton, shimmer, progress, typing indicator), then resolves with a smooth transition. No blank frames, no layout jumps.
3. **The architecture must be believable.** Every demo step can show an "Under the hood" panel detailing the end-to-end data pipeline (ingestion, normalization, entity resolution, parallel agent dispatch) and zero-trust security architecture (read-only OAuth, local/enclave PII redaction, human-in-the-loop controls). The theory has to hold up to a judge's question.
4. **Remotion animation rules.** Inside compositions, every animation is driven by `useCurrentFrame()` with `interpolate()`, `spring()`, `<Sequence>`, `<Series>`. **Banned inside compositions:** Framer Motion, CSS transitions/keyframes, `setTimeout`/`setInterval`, Recharts animation, any `next/*` import. Charts are hand-built SVG driven by frame.
5. **Deterministic.** Same frame, same pixels. Timing lives only in `src/config/content.ts`.
6. **Numbers match everywhere.** App, slides and script use exactly the master numbers in A.6. Totals are computed, never typed by hand.
7. **Never edit the spoken script words** in Section C. If `check:content` warns a line is too fast, leave it and mention it in the final report.
8. **No em dashes** in any user-facing copy.
9. **Speed over code polish.** One file per segment. Copy patterns, don't abstract.

**Deliverables:** Section A (the product as Remotion segments), Section B (the 3 slides), Section C (the script, wired into the timeline), then renders.

---

## 1. The 45-minute build plan (follow this exactly)

### 1.1 Timeboxes

| Clock | Phase | Output |
|---|---|---|
| 0 to 4 min | **Phase 0: Bootstrap** | Template running (see 1.3) |
| 4 to 9 min | **Phase 1: Content** | `content.ts` fully filled from A.5, A.6, B and C. `npm run check:content` passes. Every segment exists, unbuilt ones fall back to `PlaceholderStep`, so the full 90 s plays from minute 9 onward. |
| 9 to 31 min | **Phase 2: Segments** | Build segments in the priority order in 1.2 |
| 31 to 37 min | **Phase 3: Wire and check** | `/present` beats, Under the hood, captions, `npm run typecheck`, stills check, `npm run render:draft` |
| 37 to 45 min | **Phase 4: Ship** | `npm run build`, start `npm run render:pitch` and `render:slides` (start by minute 38, renders take minutes), commit, final report |

**Hard rule:** if any single segment runs 3 minutes past its slot, ship a simpler version of it and move on. A simpler finished segment beats a perfect missing one. Never leave the timeline broken.

### 1.2 Segment priority (build in this order)

| Priority | Segment | Slot |
|---|---|---|
| P0 | `step-dashboard` (hero number, opportunities table) | 3 min |
| P0 | `step-rogers` (hero moment: drawer + negotiation chat) | 4 min |
| P0 | `slide-problem`, `slide-solution`, `slide-doorway` (incl. zoom) | 4 min |
| P0 | `step-connect`, `step-scan` | 3 min |
| P1 | `step-flight`, `step-notion` | 4 min |
| P1 | `step-rapidfire` | 2 min |
| P1 | `wrapped` | 2 min |
| P2 | Under the hood copy for every step, captions | in Phase 3 |
| P3 | `step-library` (not in the 90 s cut) | only if time remains |

### 1.3 Phase 0: bootstrap

- **If the repo already has `AGENTS.md` and `src/remotion/`** (the template was set up): read `AGENTS.md` and `docs/ARCHITECTURE.md`, run `npm i`, `npm run check:content`, and go straight to Phase 1. Do not rebuild anything that exists.
- **If not**, scaffold the minimum in under 4 minutes:

```bash
npx create-next-app@latest rump --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --use-npm --yes
cd rump
V=$(npm view remotion version)
npm i --save-exact remotion@$V @remotion/cli@$V @remotion/player@$V @remotion/google-fonts@$V
npm i -D --save-exact @remotion/tailwind-v4@$V
npm i lucide-react clsx tailwind-merge && npm i -D tsx
npx skills add remotion-dev/skills || true
```

  Then create only: `remotion.config.ts` (Tailwind v4 override + `@` alias to `src`), `src/remotion/{index.ts,Root.tsx,remotion.css,fonts.ts}`, `src/config/content.ts`, `src/lib/timeline.ts`, `src/lib/anim.ts`, `src/app/present/page.tsx`, and the primitives listed in A.8 as you need them. Skip `/styleguide`, the content check script and the skills install if they cost more than 1 minute.

### 1.4 Efficiency rules

- **Parallelize if your harness supports subagents.** After Phase 1 (content, shell and primitives exist), split Phase 2 across up to 3 parallel workers: (a) slides + doorway, (b) connect + scan + dashboard + rogers, (c) notion + flight + rapidfire + wrapped. Each worker owns only its own segment files. Only the lead edits `content.ts` and `registry.ts`. Workers verify with stills, not full renders.
- **Verify cheaply.** During Phase 2, check visuals with single stills (`npx remotion still src/remotion/index.ts Segment out/check/<id>.png --props='{"segmentId":"<id>"}' --frame=<n>`) and `npm run typecheck`. Do not run `next build` or full renders until Phase 3/4.
- **Copy, don't design.** Every step follows the `_examples/ExampleStep.tsx` pattern (or, without the template: `<AppShell>` + `<Sequence>` blocks + primitives). Use the beat sheets in A.5 verbatim as frame timings; don't re-plan timing.
- **No new dependencies** beyond the ones listed. No refactors. Fix lint errors, ignore lint warnings.
- **Fallbacks are fine:** if a fancy effect (row-to-drawer morph, $219-to-$3,153 fly) fights you for more than 2 minutes, replace it with a crossfade.
- **Browser for rendering:** if Remotion can't download its headless shell, pass `--browser-executable` pointing at an installed Chromium (e.g. under `/opt/pw-browsers`).

---

## SECTION A: The product (Remotion segments)

### A.1 Stack

- Latest Next.js (App Router), TypeScript, Tailwind v4, Remotion 4.x (`remotion`, `@remotion/cli`, `@remotion/player`, `@remotion/google-fonts`, `@remotion/tailwind-v4`, optionally `@remotion/transitions`), `lucide-react`, `clsx`, `tailwind-merge`. All `@remotion/*` packages pinned to the exact same version.
- Fonts via `@remotion/google-fonts`: **Inter** (stand-in for Ramp's grotesk) and **JetBrains Mono** (numbers, agent logs). No `next/font` inside compositions.
- All content, numbers and timing in `src/config/content.ts`. `src/lib/timeline.ts` derives segment frames and beats from script times.

### A.2 Design system: Ramp-inspired

First read and follow: https://mcpmarket.com/tools/skills/ramp-ui-design-system . If you cannot fetch it within 30 seconds, use this:

- **Palette** (CSS variables in `src/styles/tokens.css`, mapped into Tailwind `@theme`, shared by Next and Remotion):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F4F2EE` | warm off-white background |
| `--surface` | `#FFFFFF` | cards, drawers |
| `--ink` | `#111111` | primary text |
| `--muted` | `#6B6B6B` | secondary text |
| `--line` | `#E6E3DD` | 1px hairlines |
| `--accent` | `#E4F222` | Ramp lime: savings numbers, primary CTA, highlight marks only |
| `--positive` | `#1F8A4C` | success |
| `--negative` | `#C2412D` | overspend, errors |

- **Type:** big, tight headlines (tracking `-0.02em`, weight 500 to 600). Numbers `tabular-nums`. Small uppercase labels (11px, `0.08em` tracking, muted) for section headers.
- **Layout:** left sidebar nav (Home, Savings, Subscriptions, Bills, Claims, Perks, Library, Wrapped), top bar with search and a "Connected: 9 sources" pill. Generous whitespace, 1px hairline borders, 12px radius, almost no shadows. The composition is always 1920×1080; the Player scales it.
- **Components:** dense data tables with merchant avatars, status pills ("Found", "Drafted", "Saved", "Needs approval"), stat cards with big numbers and a small delta, a right-side detail drawer per opportunity.
- **Merchant avatars:** letter-mark circles in brand-ish colors (Rogers red, Notion black, Netflix red, DoorDash red-orange, Air Canada red, Scotiabank red, Wealthsimple black, Spotify green). **No real logo files.**
- **Motion (frame-based):** entries are 9 frames (~300 ms) ease-out with a 12px rise; list stagger 1 to 2 frames (40 to 60 ms); numbers count up; shimmer skeletons on every async-looking state; drawers spring in.
- **Voice / copy:** Ramp lingo throughout. "Spend less." "Time is money. Save both." "Controls." "Spend intelligence." "Out-of-policy." "Close the loop." "Savings found." "Approve." "Auto-pilot." Short, declarative, no exclamation marks.

### A.3 Routes, compositions and controls

**Compositions** (registered in `src/remotion/Root.tsx`, 1920×1080, 30 fps):

| Id | Contents | Length |
|---|---|---|
| `RumpPitch` | all segments in A.4 order | 90 s (2700 frames) |
| `RumpDemo` | `slide-doorway` through `wrapped` | 63 s |
| `Segment` | one segment via `inputProps.segmentId` (for fast iteration) | that segment |

Input props on all: `{ showHood: boolean; showCaptions: boolean; showCursor: boolean }` (defaults false, false, true).

**Routes:**

| Route | Purpose |
|---|---|
| `/present` | Full-screen `<Player>` of `RumpPitch`, no visible controls, black letterbox. The stage view. |
| `/present?from=<segmentId>&autoplay=1&hood=1&captions=1` | Jump to a segment, autoplay, overlays |
| `/deck` | Redirect to `/present` |
| `/demo` | Redirect to `/present?from=step-connect` |
| `/wrapped` | Redirect to `/present?from=wrapped` |
| `/player` | Dev view: Player with controls, segment list that seeks on click, frame counter |

Load the Player client-side only (`"use client"`, dynamic import with `ssr: false` if needed).

**Keyboard on `/present`:**

| Key | Action |
|---|---|
| `→` / `Space` | play until the next beat, then pause |
| `←` | seek to previous beat, pause |
| `R` | seek to frame 0, pause |
| `A` | toggle autoplay (play straight through, ignore beats) |
| `U` | toggle Under the hood (`showHood`) |
| `C` | toggle captions (`showCaptions`, shows the current spoken line) |
| `P` | toggle presenter overlay |
| `F` | toggle fullscreen |

- Beats: one at the first frame of every segment (from `beat: true` script lines). Implemented via the Player `frameupdate` event: when the next beat is crossed, `pause()` and `seekTo(beat)`.
- **Presenter overlay** is plain HTML outside the Player (never in renders): current segment, current line, next line, elapsed vs script time, red tint when behind.
- A thin lime progress bar at the top of the composition shows overall progress during demo segments.
- Footer inside demo segments: "Demo data. Not real accounts."

### A.4 Segment timeline (master clock, derived from Section C)

| Segment id | Kind | Starts | Duration | Sidebar `nav` |
|---|---|---|---|---|
| `slide-problem` | slide | 0:00 | 15 s | |
| `slide-solution` | slide | 0:15 | 12 s | |
| `slide-doorway` | slide | 0:27 | 1 s | |
| `step-connect` | step | 0:28 | 5 s | Home |
| `step-scan` | step | 0:33 | 7 s | Home |
| `step-dashboard` | step | 0:40 | 6 s | Savings |
| `step-rogers` | step | 0:46 | 12 s | Bills |
| `step-notion` | step | 0:58 | 7 s | Subscriptions |
| `step-flight` | step | 1:05 | 8 s | Claims |
| `step-rapidfire` | step | 1:13 | 7 s | Savings |
| `wrapped` | wrapped | 1:20 | 10 s | Wrapped |
| `step-library` | step | not in 90 s cut | 3 s | Library |

### A.5 Demo steps with beat sheets

Beat sheet times are **seconds from the segment's start**. Convert with `sec(s) = Math.round(s * 30)`. "Cursor → X @t" means the fake cursor arrives at X at time t and clicks (lime ripple) on the same frame the state changes.

**Step 1: Connect accounts (`step-connect`, 5 s)**

- Screen: "Connect your money." A grid of 9 source cards: Ramp, Scotiabank, Wealthsimple, Rogers, Gmail, iMessage, Slack, Instagram, Notion. One big lime button: **Connect all**.
- Each card flips from "Connect" to a spinner, then a green check, staggered. Under each check a micro stat: Ramp "1,284 transactions", Scotiabank "2,016 transactions", Wealthsimple "1,512 transactions", Rogers "24 bills", Gmail "3,902 emails", iMessage "61 threads", Slack "38 saved messages", Instagram "212 saved posts", Notion "4 seats".
- Top bar pill counts "Connected: 0 → 9 sources".
- Beat sheet: 0.0 grid visible · Cursor → Connect all @0.9 · cards spinner→check at 1.0 + i×0.25 (spinner 0.4 s each) · pill counts 1.0 to 3.4 · hold.
- Under the hood: "Connectors layer & Security Boundary. Ramp API (cards, transactions, receipts). Canadian bank aggregation via Flinks/Plaid (Scotiabank, Wealthsimple). Gmail API (bills, receipts, flight itineraries). Slack + Notion admin APIs (seat usage). iMessage via Mac bridge. Instagram saved items via data export. All connections use read-only OAuth scopes with client-side token vaulting and zero-trust API boundaries."

**Step 2: Scanning (`step-scan`, 7 s)**

- Full-screen scan view. Big headline cycles: "Reading 4,812 transactions…" → "Parsing 3,902 emails…" → "Matching 61 recurring charges…" → "Benchmarking prices…"
- Left: live agent log in monospace, lines stream in:
  - `[ingest] normalized 4,812 txns → unified ledger`
  - `[redact] 312 PII fields scrubbed before inference`
  - `[resolve] "RGRS WRLSS 8841" → Rogers Wireless`
  - `[recurring] 23 subscriptions detected`
  - `[classify] outflow $4,860/mo: fixed $3,410 · discretionary $1,450`
  - `[agent:negotiator] Rogers plan above new-customer price`
  - `[agent:downgrade] Notion Business: 0 business features used in 61d`
  - `[agent:claims] AC 857 delayed 7h12m, APPR eligible`
  - `[agent:balances] Best Buy gift card $187 unused`
  - `[dispatch] 8 opportunities ready for approval`
- Right: pipeline diagram (Connectors → Ingest & Normalize → Entity Resolution → Classifier → Specialist Agents → Action Layer → You approve), nodes light up lime in sequence.
- Beat sheet: headline phrase changes at 0, 1.5, 3.0, 4.5 · log line every 0.55 s from 0.2 · pipeline node lights every 0.8 s from 0.5 · hold.
- Under the hood: "Pipeline Architecture: Ingest & Normalization → Entity Resolution → Cash Flow Classifier → Specialist Dispatch. Every source is normalized into one unified cash flow ledger (Transaction, Document, Subscription, UsageSignal). Merchant names and billers are canonicalized. PII is scrubbed before LLM processing. An LLM classifier evaluates total monthly inflows/outflows, segmenting into fixed overhead vs. discretionary spend. Then 8 specialist agents run in parallel, each with sandboxed toolsets."

**Step 3: Dashboard / Savings found (`step-dashboard`, 6 s)**

- Hero number counts up from $0 to **$3,153 / yr savings found**, with lime underline.
- Row of 3 stat cards: "Total Cash Outflow $4,860", "Fixed Overhead $3,410", "Discretionary / Leakage $1,450".
- Breakdown chart (hand-built SVG stacked bar or donut, drawn by frame) of monthly outflow: Fixed bills $3,410 · Subscriptions $412 · Fees $186 · Optional spend $852 (sums to $4,860).
- Below: "Opportunities" table, rows stagger in (avatar, title, type pill, agent, annual savings, status "Found"). Rows exactly as in A.6.
- Beat sheet: skeletons 0 to 0.6 · hero counter 0.6 to 2.4 · stat cards 0.8 to 1.4 · chart draws 1.2 to 2.4 · table rows at 2.0 + i×0.12 · hold.
- Under the hood: "Core vs optional classifier: rent, groceries, phone, transit = core. Delivery, streaming, duplicate SaaS = optional. Savings are annualized and ranked by dollars × confidence."

**Step 4: Bill negotiator, Rogers (`step-rogers`, 12 s), the hero moment**

- Starts on the dashboard table. Cursor clicks the Rogers row; it morphs into a right drawer (drawer header starts at the row's rect and springs to the drawer position). Headline: "Rogers is charging you $95/mo. New customers pay $60."
- Comparison bars: Your plan $95 · New customer $60 · Competitor (Fido) $55.
- Button **Ask for retention offer**. On click the drawer swaps to a chat between "Rump Negotiator" and "Rogers Support", each message preceded by typing dots:
  1. Rump: "Hi, I'm calling on behalf of my client, account ending 4471. They've been with Rogers for 4 years and are reviewing a switch to Fido at $55/mo."
  2. Rogers: "I'm sorry to hear that. Let me see what I can do."
  3. Rogers: "I can offer the same plan with 100GB for $65/mo on a 24-month term."
  4. Rump: "New customers are getting this plan at $60. Can you match that, with no term?"
  5. Rogers: "Done. $65/mo, no term, effective next billing cycle." (Exactly $65, so savings = $30/mo.)
- Then a big lime success card: **$30/mo saved. $360/yr.** Row status pill flips to "Saved". Dashboard total stays $3,153.
- Beat sheet: Cursor → Rogers row @1.0 · drawer springs 1.0 to 1.6 · bars grow 1.8 to 3.0 · Cursor → Ask for retention offer @3.4 · chat messages at 3.8, 5.0, 6.0, 7.3, 8.6 (typing dots 0.5 s before each) · success card + counter 10.0 to 10.8 · hold.
- Under the hood: "NegotiatorAgent. Tools: price benchmark DB (new-customer and competitor plans), account tenure from bills, script policy. Runs over carrier chat or a voice agent. Never accepts a term without your approval."

**Step 5: Downgrade finder, Notion Business + iMessage (`step-notion`, 7 s)**

- Drawer: Notion Business, 4 seats. Usage heatmap (last 60 days) shows zero usage of Business-only features (SAML SSO, private teamspaces, bulk PDF export).
- iPhone-style iMessage mock slides in from the right:
  - Rump: "Hey, you haven't used any Notion Business features in 2 months. Downgrade to Plus and save $576/yr? Reply YES."
  - User: "YES"
  - Rump: "Done. Downgraded at end of cycle. $48/mo back in your pocket."
- Two small "similar" chips below: "Claude Max → Pro (usage under 20%)", "Google One 2TB + iCloud 2TB: duplicate storage".
- Beat sheet: drawer in 0 to 0.5 · heatmap fills 0.3 to 1.8 · phone slides in 2.0 · msg 1 at 2.5 · "YES" at 4.0 · reply at 5.0 · chips at 5.8 · hold.
- Under the hood: "DowngradeAgent. Pulls seat and feature usage from admin APIs, compares to plan feature matrix, messages you where you already are (iMessage, Slack) instead of another app."

**Step 6: Flight delay compensation (`step-flight`, 8 s)**

- Gmail-style email preview: "Air Canada AC 857, Toronto → London, arrived 7h 12m late." A card lifts out of it.
- Rules panel: "Air Passenger Protection Regulations: large carrier, delay within carrier control, 6 to 9 hours → $700."
- Button **Draft claim**: a pre-filled claim letter types itself out with booking reference (ZK4T9Q), flight, date, regulation citation, amount $700. Status: "Drafted, ready to send".
- Beat sheet: email 0 to 0.8 · card lifts 1.0 · rules panel 1.8 to 2.6 · Cursor → Draft claim @3.0 · typewriter 3.2 to 5.6 · status pill + $700 counter 5.8 to 6.6 · hold.
- Under the hood: "ClaimsAgent. Parses itineraries and delay notices from email, checks APPR rules engine (carrier size, cause, delay length), drafts the claim. You approve, it sends."

**Step 7: Rapid-fire opportunities (`step-rapidfire`, 7 s)**

One screen. Top: values control "Optimize my spending for:" with chips **Save money** (selected), **Sustainability**, **Support local**, **Give back**. Below, a grid of cards flipping in fast:

1. **Delivery breakeven:** "You paid $340 in DoorDash fees this year. DashPass would have cost $120. Pickup costs $0." **$220/yr**
2. **Price hike radar:** "Netflix raised your price 3 months ago. Standard has everything you actually watch." **$96/yr**
3. **Forgotten balances:** "$187 Best Buy gift card + Aeroplan points expiring in 21 days." **$251**
4. **Student offers:** "Spotify Student, Amazon Prime Student, Apple Music Student, GitHub Student Pack." **$142/yr**
5. **Grants & tax credits:** "Unclaimed tuition credit carryforward." **$640**
6. **Give back:** "You saved $30/mo on Rogers. Redirect $5/mo to Daily Bread Food Bank?" Optional toggle (off). Caption: "Suggested from causes you choose. Nothing is donated without approval."
7. **Greener alternatives:** "There may be a lower-cost, lower-impact alternative." Three mini rows: Refurbished laptop instead of new · Transit instead of frequent rideshare · Local pickup instead of delivery. Each with a 3-dot impact indicator. Label: "Potential. Not counted until approved."
8. **Better alternatives:** small table, current vs alternatives by priority (Cheapest · Greener · Local · Give back). Example row: "Zoom Business → Google Meet (already paid via Workspace)." Label: "Display only until you approve."

Cards 6 to 8 are **excluded from the $3,153 total.**

- Beat sheet: chips row 0 to 0.5 · Cursor → Sustainability chip @0.8 (it toggles on; Save money stays on) · cards flip in at 0.9 + i×0.55 (0.4 s flip) · running "+$" counter in the corner sums cards 1 to 5 · hold.
- Under the hood: "PriceWatchAgent, BalanceHunter, PerksAgent, GrantsAgent, AlternativesAgent, and ImpactAgent. Each runs on the same ledger and emits typed Opportunity objects. AlternativesAgent searches for financially better substitutes, while ImpactAgent ranks optional alternatives using user-selected priorities such as sustainability, local businesses, or charitable impact. Recommendations remain separate from actions and always require approval."

**Step 8: Library (`step-library`, P3, not in the 90 s cut)**

- "Everything you saved, in one place." Masonry grid grouped by auto-categories: "NYC restaurants (14)", "Recipes (22)", "Deals (9)", "Career (11)", sourced from Instagram saves, Slack saved messages, starred emails. Each tile shows a tiny source icon.
- Under the hood: "Embeddings + clustering over saved items from every app, tagged and searchable."
- Build only if time remains. Register it but leave it out of `RumpPitch`.

**Step 9: Rump Wrapped (`wrapped`, 10 s)**

Spotify-Wrapped style full-bleed cards, lime and black:

1. "2026. You spent $58,320." @0.0
2. "Rump found you $3,153." @1.4
3. "Biggest win: Flight AC 857. $700." @2.8
4. "Most forgotten subscription: Notion Business. 61 days unused." @4.2
5. "You're a Core Spender: 70% core, 30% optional." @5.6
6. End card @7.0 to 10.0: **Rump. Time is money. Save both.** Team names small at the bottom: Julian · Ben · Elrich · Amar.

### A.6 Master numbers (must match script and slides)

| Opportunity | Agent | Annual savings |
|---|---|---|
| Rogers retention offer ($95 → $65/mo) | NegotiatorAgent | $360 |
| Notion Business → Plus (4 seats, $48/mo) | DowngradeAgent | $576 |
| AC 857 delay compensation (APPR, 6 to 9h) | ClaimsAgent | $700 |
| DoorDash fees vs DashPass ($340 vs $120) | PriceWatchAgent | $220 |
| Netflix price hike → cheaper plan | PriceWatchAgent | $96 |
| Gift card + expiring points | BalanceHunter | $251 |
| Student offers | PerksAgent | $142 |
| Duplicate cloud storage (Google One + iCloud) | DowngradeAgent | $168 |
| Tuition credit carryforward | GrantsAgent | $640 |
| **Total (computed)** | | **$3,153** |

- Monthly cash outflow $4,860 = Fixed overhead $3,410 + Discretionary $1,450.
- Discretionary breakdown: Subscriptions $412 + Fees $186 + Optional spend $852 = $1,450.
- Year spend $58,320 ($4,860 × 12). Core share 70%.
- All fictional demo data.

### A.7 "Under the hood" panel (architecture theory)

Shown when `showHood` is true (key `U`), on every demo step. Slides in from the right with a spring and highlights the active layer for the current step:

```
Connectors (read-only OAuth)
  Ramp · Banks via Flinks/Plaid · Rogers (bill PDFs) · Gmail · Slack · Notion · iMessage bridge · Instagram export
        ↓
Ingest & Normalize  →  unified ledger: Transaction | Document | Subscription | UsageSignal
        ↓
Entity Resolution   →  "RGRS WRLSS 8841" → Rogers Wireless
        ↓
Classifier          →  fixed vs discretionary, recurring detection (periodicity), category
        ↓
Specialist Agents (parallel)
  Negotiator · Downgrade · Claims · PriceWatch · BalanceHunter · Perks · Grants · Alternatives · Impact
        ↓
Action Layer        →  drafts, messages, negotiations, all behind "Approve"
        ↓
Savings Ledger      →  Wrapped, monthly reports
```

Active layer per step: connect → Connectors · scan → Ingest & Normalize → Classifier (animate down) · dashboard → Classifier · rogers/notion/flight/rapidfire → Specialist Agents + Action Layer · wrapped → Savings Ledger.

Below the diagram, always: **Security & Privacy Architecture:** "Read-only OAuth scopes. Client-side key storage; no persistent raw financial credentials. Local/Enclave PII Redaction pipeline removes account numbers and full names prior to model inference. Strict Human-in-the-Loop policy: agents produce proposals/drafts; zero monetary transfers or contract changes execute without explicit user approval."

Under that, the step's own Under the hood text from A.5.

### A.8 Code layout

```
remotion.config.ts            // Tailwind v4 + "@" alias
src/
  config/content.ts           // ALL copy, numbers, segments, script, beat sheets
  config/video.ts             // FPS=30, WIDTH=1920, HEIGHT=1080, sec()
  styles/tokens.css
  lib/timeline.ts             // segments + beats + lineAtFrame() from script
  lib/anim.ts                 // fadeUp, stagger, springIn, ease
  lib/format.ts               // money(), pct()
  app/present/page.tsx        // stage Player + keyboard + presenter overlay
  app/player/page.tsx         // dev Player
  app/{deck,demo,wrapped}/page.tsx  // redirects
  remotion/
    index.ts, Root.tsx, remotion.css, fonts.ts
    compositions/RumpPitch.tsx, RumpDemo.tsx, Segment.tsx
    shell/AppShell.tsx, Sidebar.tsx, TopBar.tsx, UnderTheHood.tsx, Captions.tsx, DemoFooter.tsx
    segments/registry.ts
    segments/slides/SlideProblem.tsx, SlideSolution.tsx, SlideDoorway.tsx
    segments/steps/Connect.tsx, Scan.tsx, Dashboard.tsx, Rogers.tsx, Notion.tsx, Flight.tsx, RapidFire.tsx, Library.tsx
    segments/wrapped/Wrapped.tsx
    ui/ Avatar, Pill, StatCard, BigNumber, Counter, Skeleton, LoadingGate, Stagger, TypingDots,
        ChatTranscript, IMessageMock, AgentLog, PipelineDiagram, Drawer, DataTable, Typewriter,
        BreakdownChart (SVG), Heatmap (SVG), Cursor, Ticker, ZoomFrame, WrappedCard
```

### A.9 Acceptance checklist

- [ ] `npm run typecheck` and `npm run build` pass with zero env vars. `npm run check:content` passes (pace warnings allowed).
- [ ] `/present`: `→` steps through every beat from `slide-problem` to the Wrapped end card; `A` plays straight through in 90 s.
- [ ] `slide-doorway` zooms into `step-connect` with no visible cut.
- [ ] Every step has a loading state, then a resolved state. No blank frames.
- [ ] All dollar figures match A.6; total is computed.
- [ ] `U` shows Under the hood with the right active layer on every demo step; `C` shows captions.
- [ ] `out/rump-pitch.mp4` (90 s) and `out/rump-demo.mp4` rendered; `out/slides/*.png` rendered.
- [ ] No em dashes in user-facing copy.

---

## SECTION B: Slides (segments `slide-problem`, `slide-solution`, `slide-doorway`)

Style: same Ramp-inspired system. Off-white background, huge black numbers, lime highlight marks behind the key figure. One idea per slide. Tiny source footnotes bottom-left in muted gray.

### Slide 1: The problem (`slide-problem`, 15 s)

**Headline:** "You're leaking money. You just can't see it."

**Stat grid: 9 tiles in a 3×3 grid, numbers count up on enter, staggered:**

| Big number | Caption | Source |
|---|---|---|
| **$219** | what people actually spend on subscriptions each month | C+R Research, 2022 |
| **$86** | what they think they spend | C+R Research, 2022 |
| **89%** | of consumers underestimate their subscription spend | West Monroe |
| **$18M** | average yearly SaaS license waste per company | Zylo SaaS Management Index, 2024 |
| **43%** | of adults are sitting on at least one unused gift card | Bankrate, 2024 |
| **$1,000** | owed per passenger for a 9h+ delay under Canada's APPR, most never claim | Canadian Transportation Agency |
| **38%** | of startups fail directly because they run out of cash and burn through capital | CB Insights, 2024 |
| **30%** | of total software license spend is completely wasted due to sprawl and inactivity | Zylo SaaS Management Index, 2024 |
| **50%** | unmanaged tail spend leakage across unmonitored vendor and recurring charges | Gartner Research |

**Background:** faint vertical `Ticker` of card statement lines behind the tiles (low opacity): `ADOBE *CREATIVE CLD 29.99` · `DOORDASH SERVICE FEE 6.49` · `NETFLIX.COM 26.99` · `RGRS WRLSS 95.00` · `NOTION LABS 96.00` · `GOOGLE *ONE 13.99` · `APPLE.COM/BILL 13.99` · `UBER *EATS 7.99` · `SPOTIFY 12.99` · `AUDIBLE 16.95` · `LINKEDIN PREMIUM 39.99` · `CLAUDE.AI 28.00`

**Footer line:** "Canada pays some of the highest mobile prices in the G7." (ISED price comparison, 2025)

**Beat sheet:** headline 0 to 0.4 · tiles at 0.3 + i×0.15, each counting up over 0.8 s · footer at 2.0 · lime highlight mark lands on $86 @5.0, $219 @7.0, $18M @9.5, 43% @12.0.

### Slide 2: The solution (`slide-solution`, 12 s)

**Headline:** "Meet Rump." **Subhead:** "Total cash flow spend intelligence for your whole life."

**5 dot jots**, each fading in on cue:

1. **Connects everything.** Ramp, banks, Rogers, Gmail, iMessage, Slack, Instagram. @1.5
2. **Finds every financial leak.** Analyzes total monthly cash flow across fixed telecom bills, subscriptions, price hikes, hidden fees, unused plans, and forgotten balances. @3.5
3. **Acts for you.** Negotiates bills, downgrades plans, drafts compensation claims. @6.0
4. **Finds money you're owed.** Student deals, grants, tax credits, cheaper vendors. @8.0
5. **You stay in control.** Nothing happens without one tap: Approve. @10.0

Right side: a floating preview card "$3,153/yr savings found" in lime.

### Slide 3: Demo doorway (`slide-doorway`, 1 s)

**Headline:** "Let's find your money." Center: a scaled-down product frame rendering the first frame of `step-connect`. The frame zooms to full screen and the demo begins. This slide is a doorway, not a destination.

**Beat sheet:** headline in 0 to 0.2 · `ZoomFrame` scales the product frame to full viewport 0.3 to 0.8 · sidebar and top bar fade in 0.8 to 1.0. The last frame must equal the first frame of `step-connect`.

---

## SECTION C: The 90-second script, word for word

Pace target ~150 words per minute. **Presenter A** does slides 1 and 2. **Presenter B** drives the demo (or one person does it all). Put every line into `content.ts` `script[]` exactly as written, with `at` = start time in seconds, `beat: true` on the first line of each segment. These drive the segment timeline, the beats, captions and the presenter overlay.

| Time | Segment | Action / transition | Lyrics (spoken) |
|---|---|---|---|
| 0:00 to 0:05 | `slide-problem` | Tiles count up. Ticker scrolls. | "Quick question. How much do you spend every month?" |
| 0:05 to 0:15 | `slide-problem` | Highlight lands on $86, then $219, then $18M, then 43%. | "Most people guess eighty-six dollars. The real number is two nineteen. Companies waste eighteen million a year on software nobody opens. And almost half of us have a gift card we forgot about." |
| 0:15 to 0:27 | `slide-solution` | `→`. Headline in. Bullets 1 to 5 fade in on each phrase. | "Meet Rump. Rump connects to your cards, your bank, your phone bill, your inbox, analyzes your entire monthly cash flow to spot hidden leaks across fixed bills and optional spend, and then actually goes and gets it back. Secure, private, and you stay in total control." |
| 0:27 to 0:28 | `slide-doorway` | `→`. Product frame zooms to full screen. | "Let's find your money." |
| 0:28 to 0:33 | `step-connect` | Cursor clicks Connect all. Cards check off one by one. | "One click. Ramp, Scotiabank, Wealthsimple, Rogers, Gmail, Slack. Connected." |
| 0:33 to 0:40 | `step-scan` | Pipeline lights up, agent log streams. | "Under the hood, everything lands in one ledger, and specialist agents each hunt for a different kind of waste." |
| 0:40 to 0:46 | `step-dashboard` | Hero counts to $3,153. Chart draws. Rows stagger in. | "Three thousand, one hundred fifty-three dollars a year. Found. Split into core and optional spend." |
| 0:46 to 0:58 | `step-rogers` | Cursor clicks Rogers row → drawer. Cursor clicks Ask for retention offer. Chat plays. Success card. | "Rogers charges you ninety-five a month. New customers pay sixty. So Rump asks for the retention offer... and that's thirty dollars a month, saved." |
| 0:58 to 1:05 | `step-notion` | `→`. Heatmap, then iMessage slides in, "YES" reply. | "You haven't touched Notion Business in two months. Rump texts you. Reply yes. Downgraded." |
| 1:05 to 1:13 | `step-flight` | `→`. Email card → APPR rules → claim types out. | "Your Air Canada flight landed seven hours late. Under Canadian law, that's seven hundred dollars. Claim drafted." |
| 1:13 to 1:20 | `step-rapidfire` | `→`. Cards flip in fast. | "DoorDash fees. Netflix price hikes. Expiring points. Student deals. Tax credits. All caught." |
| 1:20 to 1:27 | `wrapped` | `→`. Wrapped cards auto-advance. | "And at the end of the year, Rump Wrapped shows you exactly what you kept." |
| 1:27 to 1:30 | `wrapped` | Hold on end card. | "Rump. Time is money. Save both." |

### Transition rules (all frame-based)

1. **Slide 1 → 2:** 9-frame crossfade. At the start of `slide-solution`, the $219 tile is redrawn at its slide-1 position and springs (~18 frames) to the floating "$3,153/yr savings found" card slot while its number counts 219 → 3,153, turning the problem into the solution.
2. **Slide 2 → 3:** headline slides up and out; the product frame scales up from the floating card's position.
3. **Slide 3 → Demo:** `ZoomFrame` to full viewport, sidebar and top bar fade in after ~5 frames. Seamless into `step-connect`.
4. **Step to step:** content area crossfades with a 12px upward rise over 9 frames. Sidebar highlight slides to the matching `nav` item (A.4).
5. **Row → Drawer:** the clicked row's rect interpolates to the drawer header position (fake shared layout).
6. **Demo → Wrapped:** whole shell fades to black over 9 frames; Wrapped cards take over full-bleed.

### Backup plan

- Primary backup: play `out/rump-pitch.mp4` full screen and read the same lyrics over it. Secondary: `out/slides/*.png` as a static deck.
- If running long on stage: the presenter skips the 43% highlight on slide 1 and shortens the rapid-fire line to "Price hikes, expiring points, student deals. Caught."

---

## Sources for slide statistics (team: verify before presenting)

- C+R Research via CNBC: [Consumers spend an average $133 more each month on subscriptions than they realize](https://www.cnbc.com/2022/06/02/consumers-spend-133-more-monthly-on-subscriptions-than-they-realize.html)
- West Monroe via GCN: [89% of consumers underestimate their monthly total](https://gcn.com/most-americans-guess-spend-month-subscriptions/21150)
- Zylo: [2024 SaaS Management Index, $18M average annual license waste](https://zylo.com/news/2024-saas-management-index)
- Bankrate: [43% of Americans have at least one unused gift card](https://www.bankrate.com/credit-cards/news/gift-cards-survey/)
- Canadian Transportation Agency: [Flight delays and cancellations: refunds and compensation](https://protection-passager-passenger.otc-cta.gc.ca/en/refunds-and-compensation/flight-delays-cancellations-rebooking-refunds-compensation)
- ISED: [Price Comparisons of Wireline, Wireless, and Internet Services in Canada, 2025](https://ised-isde.canada.ca/site/strategic-policy-sector/en/telecommunications-policy/price-comparisons-wireline-wireless-and-internet-services-canada-and-foreign-jurisdictions-2025)
- VERIFY: CB Insights, startup failure reasons (38% ran out of cash)
- VERIFY: 30% of software license spend wasted (confirm the exact Zylo figure and wording)
- VERIFY: 50% tail spend leakage (Gartner)
