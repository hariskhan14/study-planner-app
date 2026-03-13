import type { Coords, PrayerTime, PrayerName } from '../types/prayer';
import { PRAYER_NAMES, STORAGE_KEYS } from '../utils/constants';
import { formatDateForApi, formatDateKey, timeStringToTimestamp } from '../utils/dateUtils';

interface AladhanTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface AladhanResponse {
  data: {
    timings: AladhanTimings;
  };
}

export async function fetchPrayerTimes(
  coords: Coords,
  method: number = 2,
  date: Date = new Date()
): Promise<PrayerTime[]> {
  const dateKey = formatDateKey(date);
  const cacheKey = `${STORAGE_KEYS.PRAYER_PREFIX}${dateKey}_${coords.latitude}_${coords.longitude}`;

  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch { /* ignore bad cache */ }
  }

  const dateStr = formatDateForApi(date);
  const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=${method}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Prayer times API error: ${response.status}`);
  }

  const json: AladhanResponse = await response.json();
  const timings = json.data.timings;

  const prayers: PrayerTime[] = PRAYER_NAMES.map((name: PrayerName) => {
    const timeStr = timings[name].replace(/\s*\(.*\)/, '');
    return {
      name,
      time: timeStr,
      timestamp: timeStringToTimestamp(timeStr, date),
    };
  });

  localStorage.setItem(cacheKey, JSON.stringify(prayers));
  return prayers;
}
