import { TierName, ChecklistState } from './types';

const STORAGE_KEYS = {
  TIER: 'loyalty-tier',
  CHECKLIST: 'loyalty-checklist',
  LAST_RESET: 'loyalty-last-reset',
};

export function loadTier(): TierName {
  const stored = localStorage.getItem(STORAGE_KEYS.TIER);
  return (stored as TierName) || 'emerald';
}

export function saveTier(tier: TierName): void {
  localStorage.setItem(STORAGE_KEYS.TIER, tier);
}

export function loadChecklist(): ChecklistState {
  const stored = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
  return stored ? JSON.parse(stored) : {};
}

export function saveChecklist(state: ChecklistState): void {
  localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(state));
}

export function loadLastReset(): Date | null {
  const stored = localStorage.getItem(STORAGE_KEYS.LAST_RESET);
  return stored ? new Date(stored) : null;
}

export function saveLastReset(date: Date): void {
  localStorage.setItem(STORAGE_KEYS.LAST_RESET, date.toISOString());
}

export function shouldAutoResetDaily(): boolean {
  const lastReset = loadLastReset();
  if (!lastReset) return true;

  const now = new Date();
  const today5AM = new Date(now);
  today5AM.setHours(5, 0, 0, 0);

  if (now < today5AM) {
    const yesterday5AM = new Date(today5AM);
    yesterday5AM.setDate(yesterday5AM.getDate() - 1);
    return lastReset < yesterday5AM;
  }

  return lastReset < today5AM;
}
