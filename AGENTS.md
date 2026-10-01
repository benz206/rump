# Rump implementation conventions

1. Read `docs/GOAL.md` first. It is the spec. Then read `docs/ARCHITECTURE.md`.
2. Put every number, string and timing from the spec into `src/config/content.ts`. Never hardcode them in components.
3. Build one component per step in `src/components/steps/`, copying `_examples/ExampleStep.tsx`.
4. Every async-looking moment uses `LoadingGate`, `Skeleton`, `TypingDots` or `Typewriter`. No blank states.
5. Every button autoplay clicks gets a `data-demo-action`.
6. Use only design tokens. Lime (`--accent`) only for savings, primary CTA and highlight marks.
7. No real logos, letter-mark `Avatar`s only. No em dashes.
8. Done means: `bun run build`, `bun run lint`, `bun run typecheck` pass, the dev sanity check logs no warnings, and `/deck?autoplay=1` plays slide 1 through the Wrapped end card with no manual input.

## Working practices

State assumptions before implementation. Ask when scope is unclear.
Keep changes minimal, single-purpose, and directly tied to the request.
Do not refactor unrelated code. Define success criteria and verify them.
Always prefix shell commands with `rtk`; use `rtk proxy` for unfiltered commands.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
