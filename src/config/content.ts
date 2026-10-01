export type StepId = string;
export type Step = {
  id: StepId;
  title: string;
  nav: string;
  loadingMs: number;
  beats?: number;
  underTheHood: { layer: string; body: string };
  data?: Record<string, unknown>;
};
export type Slide = {
  id: string;
  headline: string;
  subhead?: string;
  stats?: { value: string; caption: string; source?: string }[];
  bullets?: { title: string; body: string }[];
  isDoorway?: boolean;
};
export type ScriptLine = {
  beat?: boolean;
  at: number;
  screen: string;
  action?: string;
  line: string;
  autoClick?: string;
  clickDelay?: number;
};
export const brand = {
  name: "Rump",
  tagline: "Time is money. Save both.",
  team: ["Julian", "Ben", "Elrich", "Amar"],
};
export const sources: { label: string; url: string }[] = [];
export const pipeline = [
  "Connectors",
  "Ingest & Normalize",
  "Entity Resolution",
  "Classifier",
  "Specialist Agents",
  "Action Layer",
  "Savings Ledger",
];
export const opportunities = [
  {
    "id": "rogers",
    "merchant": "Rogers",
    "title": "Rogers retention offer",
    "type": "Recurring",
    "avatarColor": "var(--negative)",
    "agent": "NegotiatorAgent",
    "annualSavings": 360,
    "status": "found"
  },
  {
    "id": "notion",
    "merchant": "Notion",
    "title": "Notion Business \u2192 Plus",
    "type": "Recurring",
    "avatarColor": "var(--ink)",
    "agent": "DowngradeAgent",
    "annualSavings": 576,
    "status": "found"
  },
  {
    "id": "flight",
    "merchant": "Air Canada",
    "title": "AC 857 delay compensation",
    "type": "One-time",
    "avatarColor": "var(--negative)",
    "agent": "ClaimsAgent",
    "annualSavings": 700,
    "status": "found"
  },
  {
    "id": "doordash",
    "merchant": "DoorDash",
    "title": "Delivery breakeven",
    "type": "Recurring",
    "avatarColor": "var(--negative)",
    "agent": "PriceWatchAgent",
    "annualSavings": 220,
    "status": "found"
  },
  {
    "id": "netflix",
    "merchant": "Netflix",
    "title": "Price hike radar",
    "type": "Recurring",
    "avatarColor": "var(--negative)",
    "agent": "PriceWatchAgent",
    "annualSavings": 96,
    "status": "found"
  },
  {
    "id": "balances",
    "merchant": "Best Buy",
    "title": "Gift card + expiring points",
    "type": "One-time",
    "avatarColor": "var(--negative)",
    "agent": "BalanceHunter",
    "annualSavings": 251,
    "status": "found"
  },
  {
    "id": "student",
    "merchant": "Student offers",
    "title": "Student offers",
    "type": "Recurring",
    "avatarColor": "var(--negative)",
    "agent": "PerksAgent",
    "annualSavings": 142,
    "status": "found"
  },
  {
    "id": "storage",
    "merchant": "Cloud storage",
    "title": "Duplicate cloud storage",
    "type": "Recurring",
    "avatarColor": "var(--ink)",
    "agent": "DowngradeAgent",
    "annualSavings": 168,
    "status": "found"
  },
  {
    "id": "tuition",
    "merchant": "Tuition credit",
    "title": "Tuition credit carryforward",
    "type": "One-time",
    "avatarColor": "var(--negative)",
    "agent": "GrantsAgent",
    "annualSavings": 640,
    "status": "found"
  }
] as const;
export const sidebarNav = [
  "Home",
  "Savings",
  "Subscriptions",
  "Bills",
  "Claims",
  "Perks",
  "Library",
  "Wrapped",
];
export const slides: Slide[] = [
  {
    id: "intro",
    headline: "opening headline",
    subhead: "problem statement",
    stats: [
      { value: "$0,000", caption: "metric", source: "source" },
    ],
  },
  {
    id: "overview",
    headline: "solution headline",
    subhead: "supporting copy",
    bullets: [
      { title: "first point", body: "supporting detail" },
      { title: "second point", body: "supporting detail" },
    ],
  },
  {
    id: "doorway",
    headline: "introduce the product",
    subhead: "demo transition",
    isDoorway: true,
  },
];
export const steps: Step[] = [
  {
    "id": "step-connect",
    "title": "Connect your money.",
    "nav": "Home",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Connectors",
      "body": "Connectors layer & Security Boundary. Ramp API (cards, transactions, receipts). Canadian bank aggregation via Flinks/Plaid (Scotiabank, Wealthsimple). Gmail API (bills, receipts, flight itineraries). Slack + Notion admin APIs (seat usage). iMessage via Mac bridge. Instagram saved items via data export. All connections use read-only OAuth scopes with client-side token vaulting and zero-trust API boundaries."
    }
  },
  {
    "id": "step-scan",
    "title": "Your money, understood.",
    "nav": "Home",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Ingest & Normalize",
      "body": "Pipeline Architecture: Ingest & Normalization → Entity Resolution → Cash Flow Classifier → Specialist Dispatch. Every source is normalized into one unified cash flow ledger (Transaction, Document, Subscription, UsageSignal). Merchant names and billers are canonicalized. PII is scrubbed before LLM processing. An LLM classifier evaluates total monthly inflows/outflows, segmenting into fixed overhead vs. discretionary spend. Then 8 specialist agents run in parallel, each with sandboxed toolsets."
    }
  },
  {
    "id": "step-dashboard",
    "title": "Savings found.",
    "nav": "Savings",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Classifier",
      "body": "Core vs optional classifier: rent, groceries, phone, transit = core. Delivery, streaming, duplicate SaaS = optional. Savings are annualized and ranked by dollars × confidence."
    }
  },
  {
    "id": "step-rogers",
    "title": "Close the loop.",
    "nav": "Bills",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Specialist Agents",
      "body": "NegotiatorAgent. Tools: price benchmark DB (new-customer and competitor plans), account tenure from bills, script policy. Runs over carrier chat or a voice agent. Never accepts a term without your approval."
    }
  },
  {
    "id": "step-notion",
    "title": "Pay for what you use.",
    "nav": "Subscriptions",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Specialist Agents",
      "body": "DowngradeAgent. Pulls seat and feature usage from admin APIs, compares to plan feature matrix, messages you where you already are (iMessage, Slack) instead of another app."
    }
  },
  {
    "id": "step-flight",
    "title": "Find what you’re owed.",
    "nav": "Claims",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Specialist Agents",
      "body": "ClaimsAgent. Parses itineraries and delay notices from email, checks APPR rules engine (carrier size, cause, delay length), drafts the claim. You approve, it sends."
    }
  },
  {
    "id": "step-rapidfire",
    "title": "Every dollar, accounted for.",
    "nav": "Savings",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Specialist Agents",
      "body": "PriceWatchAgent, BalanceHunter, PerksAgent, GrantsAgent, AlternativesAgent, and ImpactAgent. Each runs on the same ledger and emits typed Opportunity objects. AlternativesAgent searches for financially better substitutes, while ImpactAgent ranks optional alternatives using user-selected priorities such as sustainability, local businesses, or charitable impact. Recommendations remain separate from actions and always require approval."
    }
  },
  {
    "id": "step-library",
    "title": "Everything you saved, in one place.",
    "nav": "Library",
    "loadingMs": 600,
    "underTheHood": {
      "layer": "Entity Resolution",
      "body": "Embeddings + clustering over saved items from every app, tagged and searchable."
    }
  }
];
export const exampleStep: Step = {
  id: "example",
  title: "reference step",
  nav: "Library",
  loadingMs: 400,
  beats: 4,
  underTheHood: {
    layer: "Specialist Agents",
    body: "example architecture explanation",
  },
};
export const script: ScriptLine[] = [
  {
    "at": 0,
    "screen": "slide-problem",
    "action": "Tiles count up. Ticker scrolls.",
    "line": "Quick question. How much do you spend every month?",
    "beat": true
  },
  {
    "at": 5,
    "screen": "slide-problem",
    "action": "Highlight lands on $86, then $219, then $18M, then 43%.",
    "line": "Most people guess eighty-six dollars. The real number is two nineteen. Companies waste eighteen million a year on software nobody opens. And almost half of us have a gift card we forgot about.",
    "beat": false
  },
  {
    "at": 15,
    "screen": "slide-solution",
    "action": "`→`. Headline in. Bullets 1 to 5 fade in on each phrase.",
    "line": "Meet Rump. Rump connects to your cards, your bank, your phone bill, your inbox, analyzes your entire monthly cash flow to spot hidden leaks across fixed bills and optional spend, and then actually goes and gets it back. Secure, private, and you stay in total control.",
    "beat": true
  },
  {
    "at": 27,
    "screen": "slide-doorway",
    "action": "`→`. Product frame zooms to full screen.",
    "line": "Let's find your money.",
    "beat": true
  },
  {
    "at": 28,
    "screen": "step-connect",
    "action": "Cursor clicks Connect all. Cards check off one by one.",
    "line": "One click. Ramp, Scotiabank, Wealthsimple, Rogers, Gmail, Slack. Connected.",
    "beat": true
  },
  {
    "at": 33,
    "screen": "step-scan",
    "action": "Pipeline lights up, agent log streams.",
    "line": "Under the hood, everything lands in one ledger, and specialist agents each hunt for a different kind of waste.",
    "beat": true
  },
  {
    "at": 40,
    "screen": "step-dashboard",
    "action": "Hero counts to $3,153. Chart draws. Rows stagger in.",
    "line": "Three thousand, one hundred fifty-three dollars a year. Found. Split into core and optional spend.",
    "beat": true
  },
  {
    "at": 46,
    "screen": "step-rogers",
    "action": "Cursor clicks Rogers row → drawer. Cursor clicks Ask for retention offer. Chat plays. Success card.",
    "line": "Rogers charges you ninety-five a month. New customers pay sixty. So Rump asks for the retention offer... and that's thirty dollars a month, saved.",
    "beat": true
  },
  {
    "at": 58,
    "screen": "step-notion",
    "action": "`→`. Heatmap, then iMessage slides in, \"YES\" reply.",
    "line": "You haven't touched Notion Business in two months. Rump texts you. Reply yes. Downgraded.",
    "beat": true
  },
  {
    "at": 65,
    "screen": "step-flight",
    "action": "`→`. Email card → APPR rules → claim types out.",
    "line": "Your Air Canada flight landed seven hours late. Under Canadian law, that's seven hundred dollars. Claim drafted.",
    "beat": true
  },
  {
    "at": 73,
    "screen": "step-rapidfire",
    "action": "`→`. Cards flip in fast.",
    "line": "DoorDash fees. Netflix price hikes. Expiring points. Student deals. Tax credits. All caught.",
    "beat": true
  },
  {
    "at": 80,
    "screen": "wrapped",
    "action": "`→`. Wrapped cards auto-advance.",
    "line": "And at the end of the year, Rump Wrapped shows you exactly what you kept.",
    "beat": true
  },
  {
    "at": 87,
    "screen": "wrapped",
    "action": "Hold on end card.",
    "line": "Rump. Time is money. Save both.",
    "beat": false
  }
];
export const wrappedCards = [
  {
    title: "wrapped headline",
    value: "$0,000",
    body: "wrapped description",
  },
  {
    title: "closing headline",
    value: "0%",
    body: "closing description",
  },
];
export const ticker = [
  "statement one",
  "statement two",
  "statement three",
];
export const timing = {
  fade: 0.3,
  stagger: 0.04,
  shellDelay: 0.15,
  zoom: 0.6,
  countMs: 900,
  typingMs: 600,
  messageMs: 900,
  logMs: 500,
  typewriterMs: 1000,
  clockMs: 50,
  behindSeconds: 3,
  reduced: 0.001,
};
export const ui = {
  template: "TEMPLATE / PLACEHOLDER CONTENT",
  next: "Next",
  prev: "Previous",
  reset: "Reset",
  autoplay: "Autoplay",
  hood: "Under the hood",
  presenter: "Presenter",
  close: "Close",
  search: "Search your money",
  connected: "Connected:",
  sources: "sources",
  footer: "Demo data. Not real accounts.",
  privacy: "Read-only OAuth scopes. Client-side key storage; no persistent raw financial credentials. Local/Enclave PII Redaction removes account numbers and full names prior to model inference. Agents produce proposals and drafts; zero monetary transfers or contract changes execute without explicit user approval.",
  build: "build",
  current: "Current",
  upcoming: "Next line",
  finished: "Time is money. Save both.",
  controls: "ARROWS / SPACE TO ADVANCE",
  reference: "component reference",
  styleguide: "styleguide",
  tokens: "Design tokens",
  primitives: "UI primitives",
  open: "open details",
  exampleAction: "advance example",
  drawer: "detail drawer",
  table: {
    merchant: "merchant",
    amount: "amount",
    status: "status",
  },
  status: {
    found: "Found",
    drafted: "Drafted",
    saved: "Saved",
    approval: "Approval",
    running: "Running",
  },
  chart: "distribution",
  phone: "phone conversation",
  loading: "Loading",
  progress: "Demo progress",
  preview: "product preview",
  tooltip: "tooltip",
  dialog: "dialog",
  dialogBody: "dialog body",
  showDialog: "open dialog",
  beat: "beat",
  empty: "no rows",
  sanity: "Rump config sanity check:",
  nav: "Demo navigation",
};
export const example = {
  counter: 0,
  percent: 0,
  avatar: "T",
  rows: [
    {
      id: "example-row",
      merchant: "merchant",
      amount: 0,
      status: "found" as const,
    },
  ],
  messages: [
    { id: "one", text: "first message", side: "left" as const },
    { id: "two", text: "second message", side: "right" as const },
    { id: "three", text: "third message", side: "left" as const },
  ],
  logs: [
    "first agent event",
    "second agent event",
    "third agent event",
  ],
  chart: [
    { name: "segment one", value: 1 },
    { name: "segment two", value: 1 },
  ],
  typewriter: "streaming response",
  statLabel: "metric",
  statCaption: "caption",
  statValue: "$0,000",
};
export const totalSavings = () =>
  opportunities.reduce((sum, item) => sum + item.annualSavings, 0);
export const scriptForScreen = (id: string) =>
  script.filter((line) => line.screen === id);
export const nextLine = (atSeconds: number) =>
  script.find((line) => line.at > atSeconds);

// Single source of truth for the deterministic pitch and exports.
export const video = { fps: 30, width: 1920, height: 1080, seconds: 90, demoStart: 27 };
export const cashFlow = { monthly: 4860, fixed: 3410, subscriptions: 412, fees: 186, optional: 852, year: 2026, coreShare: 70 };
export const pitch = {
  label: 'PERSONAL FINANCE, ON YOUR SIDE',
  problem: "You're leaking money. You just can't see it.",
  solution: 'Meet Rump.',
  subhead: 'Total cash flow spend intelligence for your whole life.',
  doorway: "Let's find your money.",
  sourceNote: 'Research references supplied by the team. Verify figures before presenting.',
  mobileNote: 'Canada pays some of the highest mobile prices in the G7.',
  mobileSource: 'ISED price comparison, 2025',
  stats: [
    {value:219,prefix:'$',suffix:'',caption:'actually spent on subscriptions each month',source:'C+R Research, 2022'},
    {value:86,prefix:'$',suffix:'',caption:'what people think they spend',source:'C+R Research, 2022'},
    {value:89,prefix:'',suffix:'%',caption:'underestimate their subscription spend',source:'West Monroe'},
    {value:18,prefix:'$',suffix:'M',caption:'yearly SaaS license waste per company',source:'Zylo SaaS Management Index, 2024'},
    {value:43,prefix:'',suffix:'%',caption:'have at least one unused gift card',source:'Bankrate, 2024'},
    {value:1000,prefix:'$',suffix:'',caption:'per passenger for an eligible 9h+ delay',source:'Canadian Transportation Agency'},
    {value:38,prefix:'',suffix:'%',caption:'of startups fail after running out of cash',source:'CB Insights, 2024 · verify'},
    {value:30,prefix:'',suffix:'%',caption:'of software license spend is wasted',source:'Zylo, 2024 · verify'},
    {value:50,prefix:'',suffix:'%',caption:'unmanaged tail spend leakage',source:'Gartner Research · verify'},
  ],
  bullets: [
    {at:1.5,title:'Connects everything.',body:'Ramp, banks, Rogers, Gmail, iMessage, Slack, Instagram.'},
    {at:3.5,title:'Finds every financial leak.',body:'Fixed bills, subscriptions, price hikes, hidden fees, unused plans, forgotten balances.'},
    {at:6,title:'Acts for you.',body:'Negotiates bills, downgrades plans, drafts compensation claims.'},
    {at:8,title:"Finds money you’re owed.",body:'Student deals, grants, tax credits, cheaper vendors.'},
    {at:10,title:'You stay in control.',body:'Nothing happens without one tap: Approve.'},
  ],
  ticker: ['ADOBE *CREATIVE CLD 29.99','DOORDASH SERVICE FEE 6.49','NETFLIX.COM 26.99','RGRS WRLSS 95.00','NOTION LABS 96.00','GOOGLE *ONE 13.99','APPLE.COM/BILL 13.99','UBER *EATS 7.99','SPOTIFY 12.99','AUDIBLE 16.95','LINKEDIN PREMIUM 39.99','CLAUDE.AI 28.00'],
  sources: [
    {name:'Ramp',stat:'1,284 transactions'}, {name:'Scotiabank',stat:'2,016 transactions'}, {name:'Wealthsimple',stat:'1,512 transactions'},
    {name:'Rogers',stat:'24 bills'}, {name:'Gmail',stat:'3,902 emails'}, {name:'iMessage',stat:'61 threads'},
    {name:'Slack',stat:'38 saved messages'}, {name:'Instagram',stat:'212 saved posts'}, {name:'Notion',stat:'4 seats'},
  ],
  scanPipeline: ['Connectors','Ingest & Normalize','Entity Resolution','Classifier','Specialist Agents','Action Layer','You approve'],
  scanHeadlines:['Reading 4,812 transactions…','Parsing 3,902 emails…','Matching 61 recurring charges…','Benchmarking prices…'],
  logs:['[ingest] normalized 4,812 txns → unified ledger','[redact] 312 PII fields scrubbed before inference','[resolve] "RGRS WRLSS 8841" → Rogers Wireless','[recurring] 23 subscriptions detected','[classify] outflow $4,860/mo: fixed $3,410 · discretionary $1,450','[agent:negotiator] Rogers plan above new-customer price','[agent:downgrade] Notion Business: 0 business features used in 61d','[agent:claims] AC 857 delayed 7h12m, APPR eligible','[agent:balances] Best Buy gift card $187 unused','[dispatch] 8 opportunities ready for approval'],
  rogers:{headline:'Rogers is charging you $95/mo. New customers pay $60.',cta:'Ask for retention offer',current:95,offer:65,benchmark:60,competitor:55,planLabels:['Your plan','New customer','Competitor (Fido)'],messages:[
    {at:3.8,who:'Rump Negotiator',text:"Hi, I'm calling on behalf of my client, account ending 4471. They've been with Rogers for 4 years and are reviewing a switch to Fido at $55/mo."},
    {at:5,who:'Rogers Support',text:"I'm sorry to hear that. Let me see what I can do."},
    {at:6,who:'Rogers Support',text:'I can offer the same plan with 100GB for $65/mo on a 24-month term.'},
    {at:7.3,who:'Rump Negotiator',text:'New customers are getting this plan at $60. Can you match that, with no term?'},
    {at:8.6,who:'Rogers Support',text:'Done. $65/mo, no term, effective next billing cycle.'},
  ]},
  notion:{title:'Notion Business',subtitle:'4 seats. Zero Business features used.',days:60,unusedDays:61,features:['SAML SSO','Private teamspaces','Bulk PDF export'],messages:["Hey, you haven't used any Notion Business features in 2 months. Downgrade to Plus and save $576/yr? Reply YES.",'YES','Done. Downgraded at end of cycle. $48/mo back in your pocket.'],similar:['Claude Max → Pro (usage under 20%)','Google One 2TB + iCloud 2TB: duplicate storage']},
  flight:{title:'Your delay has a silver lining.',email:'Air Canada AC 857, Toronto → London, arrived 7h 12m late.',rules:'Air Passenger Protection Regulations: large carrier, delay within carrier control, 6 to 9 hours → $700.',cta:'Draft claim',status:'Drafted, ready to send',letter:'To Air Canada Customer Relations,\n\nRe: booking ZK4T9Q, flight AC 857, September 18, 2026.\n\nMy arrival in London was delayed by 7 hours and 12 minutes. The delay was within the carrier’s control and was not required for safety. Under section 19 of the Air Passenger Protection Regulations, I request $700 in compensation.\n\nPlease confirm receipt and respond within 30 days.',booking:'ZK4T9Q',emailLabel:'GMAIL · DELAY NOTICE',ruleLabel:'ELIGIBILITY CHECK',claimLabel:'COMPENSATION CLAIM'},
  rapid:{title:'Small leaks. Real money.',label:'Optimize my spending for:',values:['Save money','Sustainability','Support local','Give back'],cards:[
    {title:'Delivery breakeven',body:'You paid $340 in DoorDash fees this year. DashPass would have cost $120. Pickup costs $0.',opportunity:'doordash'},
    {title:'Price hike radar',body:'Netflix raised your price 3 months ago. Standard has everything you actually watch.',opportunity:'netflix'},
    {title:'Forgotten balances',body:'$187 Best Buy gift card + Aeroplan points expiring in 21 days.',opportunity:'balances'},
    {title:'Student offers',body:'Spotify Student, Amazon Prime Student, Apple Music Student, GitHub Student Pack.',opportunity:'student'},
    {title:'Grants & tax credits',body:'Unclaimed tuition credit carryforward.',opportunity:'tuition'},
    {title:'Give back',body:'You saved $30/mo on Rogers. Redirect $5/mo to Daily Bread Food Bank?',note:'Suggested from causes you choose. Nothing is donated without approval.'},
    {title:'Greener alternatives',body:'There may be a lower-cost, lower-impact alternative.',note:'Potential. Not counted until approved.'},
    {title:'Better alternatives',body:'Zoom Business → Google Meet (already paid via Workspace).',note:'Display only until you approve.'},
  ],greener:['Refurbished laptop instead of new','Transit instead of frequent rideshare','Local pickup instead of delivery'],priorities:['Cheapest','Greener','Local','Give back']},
  wrapped:{labels:['You spent','Rump found you','Biggest win: Flight AC 857.','Most forgotten subscription: Notion Business.',"You're a Core Spender."],unused:'days unused',share:'core / optional',eyebrow:'YOUR YEAR, WITH RUMP',found:'Money you get to keep.'},
  library:{categories:['NYC restaurants (14)','Recipes (22)','Deals (9)','Career (11)'],sources:['Instagram saves','Slack saved messages','Starred emails']},
  labels:{connect:'Connect all',connectSingle:'Connect',connected:'Connected',connecting:'Connecting…',secure:'Read-only access. You stay in control.',savings:'Savings found',annual:'/ yr',monthly:'/ mo',opportunities:'Opportunities',merchant:'Opportunity',agent:'Specialist',amount:'Annual value',status:'Status',outflow:'Total Cash Outflow',fixed:'Fixed Overhead',discretionary:'Discretionary / Leakage',breakdown:['Fixed bills','Subscriptions','Fees','Optional spend'],overview:'YOUR MONEY, AT A GLANCE',saved:'saved',approved:'Approved by you',found:'Found',ready:'Ready for approval',activity:'LIVE AGENT ACTIVITY',pipeline:'ONE LEDGER. SPECIALIST AGENTS.',privacy:'Security & Privacy Architecture',hood:'Under the hood',phone:'Rump',usage:'BUSINESS FEATURE USAGE · LAST 60 DAYS',similar:'ALSO WORTH A LOOK',zero:'No activity',off:'Off',team:'BUILT BY',frame:'Frame',presenter:'Presenter',current:'Current',next:'Next',end:'End of pitch',loading:'Preparing your pitch…',player:'Rehearsal studio',controls:'→ / Space: next beat · ←: previous · A: autoplay · R: reset · U: architecture · C: captions · P: presenter · F: fullscreen'},
};
export const beats = {
  enter:0.3,typing:0.5,
  problem:{headline:0.4,tileStart:0.3,stagger:0.15,count:0.8,footer:2,highlights:[5,7,9.5,12]},
  solution:{morph:0.6},doorway:{headline:0.2,start:0.3,end:0.8},
  connect:{click:0.9,start:1,stagger:0.25,spinner:0.4},
  scan:{headline:1.5,logStart:0.2,logEvery:0.55,nodeStart:0.5,nodeEvery:0.8},
  dashboard:{loading:0.6,countEnd:2.4,statsStart:0.8,statsEnd:1.4,chartStart:1.2,chartEnd:2.4,rows:2,rowStagger:0.12},
  rogers:{row:1,drawerEnd:1.6,bars:1.8,barsEnd:3,ask:3.4,success:10,countEnd:10.8},
  notion:{drawer:0.5,heatmap:0.3,heatmapEnd:1.8,phone:2,messages:[2.5,4,5],chips:5.8},
  flight:{email:0.8,lift:1,rules:1.8,rulesEnd:2.6,click:3,type:3.2,typeEnd:5.6,status:5.8,countEnd:6.6},
  rapid:{chips:0.5,click:0.8,start:0.9,stagger:0.55,flip:0.4},
  wrapped:{cards:[0,1.4,2.8,4.2,5.6,7]},library:3,
};
