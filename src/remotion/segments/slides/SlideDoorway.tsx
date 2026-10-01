import { AbsoluteFill, Easing, Freeze, interpolate, useCurrentFrame } from 'remotion';
import { beats, pitch, video } from '@/config/content';
import { sec } from '@/lib/timeline';
import { clamp } from '../../ui';
import { Connect } from '../steps/Connect';

export function SlideDoorway({ showCursor = true }: { showCursor?: boolean }) {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [sec(beats.doorway.start), sec(beats.doorway.end)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const headline = clamp(frame, 0, sec(beats.doorway.headline)) * (1 - zoom);
  return <AbsoluteFill style={{ background: 'var(--bg)', overflow: 'hidden' }}>
    <h1 style={{ position: 'absolute', top: 64, left: 0, width: '100%', textAlign: 'center', fontSize: 78, fontWeight: 500, letterSpacing: '-0.05em', opacity: headline }}>{pitch.doorway}</h1>
    <div style={{ position: 'absolute', width: video.width, height: video.height, left: 0, top: (1 - zoom) * 140, transform: `scale(${0.66 + 0.34 * zoom})`, transformOrigin: 'center center', borderRadius: 18 * (1 - zoom), overflow: 'hidden', outline: zoom < 1 ? '1px solid var(--line)' : undefined }}>
      <Freeze frame={0}><Connect showCursor={showCursor}/></Freeze>
    </div>
  </AbsoluteFill>;
}
