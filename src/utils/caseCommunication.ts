import type { ActionLogEntry } from '../data/mockData';

export function splitCaseCommunication(entries: ActionLogEntry[]) {
  return {
    comments: entries.filter(entry => entry.actionType === 'comment_added'),
    activity: entries.filter(entry => entry.actionType !== 'comment_added'),
  };
}

export function createCaseComment(text: string, actor: string): ActionLogEntry | null {
  const description = text.trim();
  if (!description) return null;
  return {
    id: `comment-${crypto.randomUUID()}`,
    actionType: 'comment_added',
    actor,
    actorType: 'workshop',
    description,
    timestamp: new Date().toISOString(),
  };
}

export function hasUnreadEntries(entries: ActionLogEntry[], lastViewedAt?: string) {
  return entries.some(entry => entry.actorType !== 'workshop'
    && (!lastViewedAt || new Date(entry.timestamp).getTime() > new Date(lastViewedAt).getTime()));
}
