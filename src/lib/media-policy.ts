export interface PreviewPreferences {
  reducedMotion: boolean;
  saveData: boolean;
}

export function canAutoplayPreview({ reducedMotion, saveData }: PreviewPreferences) {
  return !reducedMotion && !saveData;
}

export function getPreviewRetryDelay(attempt: number) {
  if (attempt >= 3) return null;
  return 1000 * 2 ** (attempt - 1);
}

export function getPreviewRecovery(
  failure: "media-error" | "play-rejected",
  attempt: number,
) {
  if (failure === "play-rejected") return { kind: "keep-poster" } as const;
  const delay = getPreviewRetryDelay(attempt);
  return delay === null
    ? { kind: "keep-poster" } as const
    : { kind: "retry", delay } as const;
}
