/**
 * Dynamic Date Utilities to keep Portal notifications and dates always dynamically aligned with Today's Date.
 */

export function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function getOffsetDateStr(offsetDays: number): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.toISOString().split('T')[0];
}

export function formatFriendlyDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
