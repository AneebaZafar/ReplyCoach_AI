import { SavedSessionRecord } from '../types.js';

const STORAGE_KEY = 'replycoach_session_history';

/**
 * Loads saved sessions from localStorage with defensive error handling.
 */
export function getSavedSessions(): SavedSessionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('[ReplyCoach] Could not read session history from localStorage:', err);
    return [];
  }
}

/**
 * Saves a new completed session to localStorage.
 */
export function saveSessionToHistory(session: Omit<SavedSessionRecord, 'id' | 'timestamp' | 'dateStr'>): SavedSessionRecord {
  const existing = getSavedSessions();
  const now = new Date();
  
  const record: SavedSessionRecord = {
    ...session,
    id: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: now.getTime(),
    dateStr: now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };

  try {
    // Keep up to 50 most recent sessions
    const updated = [record, ...existing].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[ReplyCoach] Could not persist session history to localStorage:', err);
  }

  return record;
}

/**
 * Clears historical sessions from localStorage.
 */
export function clearSessionHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('[ReplyCoach] Could not clear session history:', err);
  }
}
