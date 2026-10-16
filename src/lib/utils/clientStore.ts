import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/** True on the client after hydration, false during SSR. No effect needed. */
export function useMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

const SIDEBAR_KEY = 'devSidebarCollapsed';
const listeners = new Set<() => void>();

function subscribeSidebar(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === SIDEBAR_KEY) cb();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

function readSidebar(): boolean {
  try {
    const saved = localStorage.getItem(SIDEBAR_KEY);
    return saved !== null ? saved === 'true' : true;
  } catch {
    return true;
  }
}

export function setSidebarCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(SIDEBAR_KEY, String(collapsed));
  } catch {
    // storage unavailable; fall through and notify anyway
  }
  listeners.forEach((l) => l());
}

/** Dev sidebar collapsed flag, persisted in localStorage (defaults to collapsed). */
export function useSidebarCollapsed(): boolean {
  return useSyncExternalStore(subscribeSidebar, readSidebar, () => true);
}
