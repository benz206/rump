import { spawnSync } from 'node:child_process';
import { narration, video } from '../src/config/content';

// Pitch-preserving tempo adjustment only where a phrase exceeds its scene.
const filters = narration.cues.map((cue, i) => {
  const rate = Math.max(1, (cue.end - cue.start) / (cue.until - cue.at));
  return `[0:a]atrim=start=${cue.start}:end=${cue.end},asetpts=PTS-STARTPTS,atempo=${rate},apad,atrim=duration=${cue.until - cue.at},adelay=${Math.round(cue.at * 1000)}:all=1[a${i}]`;
});
filters.push(`${narration.cues.map((_, i) => `[a${i}]`).join('')}amix=inputs=${narration.cues.length}:normalize=0,apad,atrim=duration=${video.seconds}[out]`);
const result = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', `public/${narration.source}`, '-filter_complex', filters.join(';'), '-map', '[out]', '-ar', '44100', '-c:a', 'pcm_s16le', `public/${narration.file}`], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
