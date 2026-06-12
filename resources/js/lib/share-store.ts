// Tiny in-memory + sessionStorage pub/sub for "pending share to chat" prototype flow.
import type { Share } from "./mock-data";

const KEY = "oasis_pending_share";
const listeners = new Set<() => void>();

export function setPendingShare(share: Share) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(share));
  } catch {}
  listeners.forEach((l) => l());
}

export function getPendingShare(): Share | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Share) : null;
  } catch {
    return null;
  }
}

export function clearPendingShare() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
}

export function subscribePendingShare(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
