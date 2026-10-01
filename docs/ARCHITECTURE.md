# Rump: one composition, three outputs

`docs/GOAL.md` is the pitch specification. All accounts and actions are fictional demo data.

## Content and timing

`src/config/content.ts` owns the spoken script, product copy, master numbers, and beat sheets.
`src/lib/timeline.ts` derives segment starts, durations, and presenter beats from script lines marked `beat: true`.
Savings are computed from the nine opportunities. Recommendations and donation suggestions are excluded.

## Rendering

`src/remotion/Root.tsx` registers `RumpPitch` (90 seconds), `RumpDemo` (63 seconds), and `Segment`.
Each segment is registered in `src/remotion/segments/registry.ts`. Steps wrap `shell/AppShell` and use the frame-driven primitives in `ui/index.tsx`.
Animations use Remotion frames, interpolation, and springs. There are no timers, network APIs, or CSS animations in compositions.
The original browser-driven examples and `/styleguide` remain available as component references, outside the pitch.

## Presentation

`/present` embeds the composition in a client-only Remotion Player. `/deck`, `/demo`, and `/wrapped` redirect with query parameters preserved.
`/player` adds controls, a frame counter, and segment navigation. `?from=step-library` previews the optional library segment.

- Right / Space: play to the next segment beat and pause.
- Left: previous beat. R: reset and pause. A: toggle continuous autoplay.
- U: architecture overlay. C: verbatim captions. P: presenter notes. F: fullscreen.
- `?autoplay=1&hood=1&captions=1` enables those options on load.

The presenter overlay lives outside the composition and never appears in video exports.
The product cursor is animated; its apparent clicks drive no real account actions.

## Verify and export

Run `bun run check:content`, `bun run typecheck`, `bun run lint`, and `bun run build`.
`check:content` verifies the script against GOAL.md word for word and reports pace warnings without changing it.
Start `bun run dev`, then `bun run verify:browser` for full autoplay and keyboard/overlay checks.

- `bun run render:pitch`: `out/rump-pitch.mp4`
- `bun run render:demo`: `out/rump-demo.mp4`
- `bun run render:draft`: half-resolution rehearsal video
- `bun run render:slides`: three backup PNGs in `out/slides/`
- `bun run studio`: Remotion Studio

If the headless browser download is unavailable, append `--browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` to render commands.
The exports are silent by design: presenters deliver the exact script live.
