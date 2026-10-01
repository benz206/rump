# Rump

A deterministic 90-second hackathon pitch: three slides, a financial assistant demo, and Rump Wrapped. Fictional data, no credentials or backend.

```sh
bun install
bun run dev
```

Open `/present` for stage mode or `/player` to rehearse. `/deck?autoplay=1` plays the complete pitch. Right/Space advances to the next beat; A toggles autoplay; U shows architecture; C shows captions; P shows presenter notes.

```sh
bun run check:content
bun run lint
bun run typecheck
bun run build
bun run verify:browser # with dev server running
bun run render:pitch
bun run render:demo
bun run render:slides
```

Videos and slide backups are written to `out/`. See [architecture and controls](docs/ARCHITECTURE.md) and the [pitch specification and spoken script](docs/GOAL.md).

Presentation notes: the spoken script is preserved verbatim. The content checker flags the problem line at 0:05 (198 wpm), solution at 0:15 (230 wpm), and doorway at 0:27 (240 wpm). The three research figures marked “verify” on slide one remain team-supplied claims pending source confirmation. Videos are silent for live narration.
