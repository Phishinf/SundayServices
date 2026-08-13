// New bulletins should never start from a blank/hardcoded template — the
// officer's real starting point is always last week's finalized bulletin,
// carried forward one week and ready for edit. See pastbulletins/ for the
// underlying source documents this data model was built from.

import { ChurchService, TextBlock, RosterRow, AttendanceRow, Announcement, ServiceItem } from '../types/bulletin';
import { advanceChineseDate, parseChineseDate } from './chineseDate';

/** Picks the most recent bulletin out of `services`, by the date encoded in its `date` field. */
export function findLastBulletin(services: ChurchService[]): ChurchService {
  return services.reduce((latest, candidate) => {
    const latestDate = parseChineseDate(latest.date);
    const candidateDate = parseChineseDate(candidate.date);
    if (!latestDate) return candidate;
    if (!candidateDate) return latest;
    return candidateDate > latestDate ? candidate : latest;
  }, services[0]);
}

function cloneWithFreshIds<T extends { id: string }>(items: T[], prefix: string): T[] {
  return items.map((item, i) => ({ ...item, id: `${prefix}${Date.now()}-${i}` }));
}

/**
 * Builds a new draft bulletin one week after `source`, carrying its content
 * forward (roster's "next week" becomes "this week", attendance counts
 * reset) so the officer edits an already-populated bulletin instead of
 * starting from scratch.
 */
export function deriveNextBulletin(source: ChurchService): ChurchService {
  const newId = 'service-' + Date.now();

  const serviceRoster: RosterRow[] = cloneWithFreshIds(source.serviceRoster, 'r').map((row) => ({
    ...row,
    thisWeek: row.nextWeek && row.nextWeek !== '--' ? row.nextWeek : row.thisWeek,
    nextWeek: '--',
  }));

  const attendance: AttendanceRow[] = cloneWithFreshIds(source.attendance, 'at').map((row) => ({
    ...row,
    count: '--',
  }));

  return {
    ...source,
    id: newId,
    title: advanceChineseDate(source.title, 7),
    date: advanceChineseDate(source.date, 7),
    status: 'draft',
    items: cloneWithFreshIds<ServiceItem>(source.items, 'i'),
    announcements: cloneWithFreshIds<Announcement>(source.announcements, 'a'),
    hymnLyrics: cloneWithFreshIds<TextBlock>(source.hymnLyrics, 'hl'),
    worshipNotes: cloneWithFreshIds<TextBlock>(source.worshipNotes, 'wn'),
    ministryUpdates: cloneWithFreshIds<TextBlock>(source.ministryUpdates, 'mu'),
    otherNotices: cloneWithFreshIds<TextBlock>(source.otherNotices, 'on'),
    weeklyPrayers: cloneWithFreshIds<TextBlock>(source.weeklyPrayers, 'wp'),
    serviceRoster,
    attendance,
    attendanceNote: undefined,
  };
}
