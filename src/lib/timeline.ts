import { script, video, beats as timing } from '@/config/content';
export const sec = (seconds: number) => Math.round(seconds * video.fps);
export const segments = script.filter(line => line.beat).map((line, index, all) => ({
  id: line.screen, from: sec(line.at), duration: sec((all[index + 1]?.at ?? video.seconds) - line.at),
}));
export const beatFrames = segments.map(segment => segment.from);
export const segmentAtFrame = (frame: number) => [...segments].reverse().find(segment => frame >= segment.from) ?? segments[0];
export const lineAtFrame = (frame: number) => [...script].reverse().find(line => frame >= sec(line.at)) ?? script[0];
export const getSegment = (id: string) => segments.find(segment => segment.id === id) ?? {id:'step-library',from:0,duration:sec(timing.library)};
