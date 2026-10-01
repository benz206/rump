# Rump template

This is a static placeholder demo. No backend, credentials, real APIs, or accounts.

## Content and design

`src/config/content.ts` owns copy, data, slide and step definitions, and demo timing.
Edit config, not components. Layout dimensions and motion geometry are implementation details.
`src/config/theme.ts` mirrors CSS tokens for charts. `globals.css` maps them into Tailwind.
`/styleguide` renders all primitives, status variants, and token swatches.

## Engine

`useDemo` is a reducer with deck, demo, and wrapped modes.
`DemoPlayer` owns it across the entire run. URL changes use `history.replaceState`.
`next()` reveals deck bullets, advances internal step beats, then advances screens.
`subPhase` starts at zero. Optional `Step.beats` includes the initial beat.
Steps receive `advanceSub()` and should derive internal beat UI from `subPhase`.
The global previous key backs through beats before returning to previous screens.
A shared `product-frame` Motion layout animates the doorway preview into the demo.
Reduced-motion preferences disable spatial animation and reveal animated text immediately.

## Add a step

1. Add a typed entry to `steps` in content.ts.
2. Create `src/components/steps/<Name>.tsx` using `_examples/ExampleStep.tsx`.
3. Register it in `registry.ts`. Unregistered steps render `PlaceholderStep`.
4. Add strictly increasing script lines for its screen ID.

Every autoplay action button needs `data-demo-action="unique-id"`.
A script line may specify `autoClick` plus `clickDelay` in seconds.
The reference action is `example-click`; add a script line for `example` to rehearse it.
The example is excluded from normal navigation and opens at `/demo?step=example`.
`wrapped` is the reserved terminal screen ID accepted by the config sanity checker.
Savings totals are derived through `totalSavings()`, never hand-entered.

## Playback

`?autoplay=1` runs the script against a single master clock.
`?step=<id>` jumps to a step on load. Reset returns to slide one and stops autoplay.
Toggling autoplay restarts the current screen's script cue; pending clicks are cancelled.
Arrow right or Space: next. Arrow left: previous. R: reset. A: autoplay.
U: architecture sheet. P: presenter. Keys 1 through 9 jump to configured steps.
Keyboard shortcuts ignore text inputs. Escape closes dialogs and sheets.
The presenter displays the current cue, next clock cue, elapsed time, and lateness.

## Verification and recording

Run `npm run lint`, `npm run typecheck`, and `npm run build`.
Start `npm run dev`; inspect `/styleguide` and `/demo?step=example`.
Run `npm run verify:browser` with the dev server running for browser checks and screenshots.
For the backup video, open `/deck?autoplay=1` at 1920x1080 and screen record.
The placeholder script finishes at 26 seconds. Replace its timings with the final spec.
Screenshots are written to `screenshots/`; do not confuse placeholder QA with final content.
