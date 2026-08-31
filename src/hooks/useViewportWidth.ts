"use client";

import { useSyncExternalStore } from "react";

const SERVER_VIEWPORT_WIDTH = 1440;

function subscribe(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange, { passive: true });
  return () => window.removeEventListener("resize", onStoreChange);
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return SERVER_VIEWPORT_WIDTH;
}

export function useViewportWidth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
