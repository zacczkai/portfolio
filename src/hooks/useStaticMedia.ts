"use client";

import { useSyncExternalStore } from "react";
import { canAutoplayPreview } from "@/lib/media-policy";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return !canAutoplayPreview({
    reducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
    saveData: Boolean((navigator as NavigatorWithConnection).connection?.saveData),
  });
}

function getServerSnapshot() {
  return false;
}

export function useStaticMedia() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
