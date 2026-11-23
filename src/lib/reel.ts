export const REEL_FPS = 24;

const CUT_POINT = 0.05;
const TAKE_HOLD_POINT = 0.45;

export function formatTimecode(seconds: number, fps = REEL_FPS) {
  const safeSeconds = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const totalFrames = Math.floor(safeSeconds * fps + 1e-6);
  const totalSeconds = Math.floor(totalFrames / fps);
  return [
    Math.floor(totalSeconds / 3600),
    Math.floor(totalSeconds / 60) % 60,
    totalSeconds % 60,
    totalFrames % fps,
  ].map((value) => String(value).padStart(2, "0")).join(":");
}

export function getActiveTake(position: number, count: number) {
  return Math.max(0, Math.min(count - 1, Math.floor(position - CUT_POINT)));
}

export function getTakeScrollProgress(index: number, count: number) {
  return (index + TAKE_HOLD_POINT) / count;
}

export function getClipStops(durations: readonly number[]) {
  const total = durations.reduce((sum, duration) => sum + duration, 0);
  let elapsed = 0;
  return [0, ...durations.map((duration) => {
    elapsed += duration;
    return elapsed / total;
  })];
}
