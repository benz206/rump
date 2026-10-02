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
The exports include Jessica narration from ElevenLabs. `public/audio/jessica-source.mp3` is the supplied recording; `bun scripts/align-narration.ts` rebuilds the aligned WAV from the cue windows in `content.ts`, preserving pitch when a line needs to fit a shorter window. Both compositions use the same track, with the demo cut starting at 27 seconds. Browser autoplay starts muted; **Play with narration** restarts the selected segment, enables sound, and plays continuously. The button stays outside video exports.

## One-minute narrated cut

`/demo/60` plays the separate `Rump60` composition. Click **Play 60-second demo with narration** to enable audio; `?autoplay=1` starts muted for browser autoplay compatibility, and `?captions=1` shows the shortened script.

The product starts at 6 seconds. The original scene animations are retimed to the new windows, while `shortDemo` in `src/config/content.ts` owns the scene boundaries, narration edits, and captions. The existing Jessica recording is cut at phrase pauses and adjusted without changing pitch. No additional voice API call is required.

- `bun run audio:60`: regenerate `public/audio/jessica-60.wav` with ffmpeg.
- `bun run render:60`: export `out/rump-60.mp4` with synchronized narration.
- `node scripts/verify-short-demo.mjs`: check full playback, audio, captions, and the final card.
