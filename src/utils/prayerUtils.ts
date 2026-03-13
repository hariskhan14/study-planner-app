import type { PrayerName, PrayerTime } from '../types/prayer';

export function getNextPrayer(prayers: PrayerTime[]): PrayerTime | null {
  const now = Date.now();
  return prayers.find(p => p.timestamp > now) ?? null;
}

export function isPrayerPassed(prayer: PrayerTime): boolean {
  return Date.now() > prayer.timestamp;
}

export function getDefaultCompleted(): Record<PrayerName, boolean> {
  return {
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  };
}
