import type { PrayerName } from '../types/prayer';
import type { TodoCategory, TodoPriority } from '../types/todo';

export const PRAYER_NAMES: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const CATEGORY_CONFIG: Record<TodoCategory, { label: string; color: string; bg: string }> = {
  'uni-work': { label: 'Uni Work', color: 'text-blue-700', bg: 'bg-blue-100' },
  'personal': { label: 'Personal', color: 'text-purple-700', bg: 'bg-purple-100' },
  'home': { label: 'Home', color: 'text-orange-700', bg: 'bg-orange-100' },
  'islamic': { label: 'Islamic', color: 'text-primary-700', bg: 'bg-primary-100' },
};

export const PRIORITY_CONFIG: Record<TodoPriority, { label: string; color: string; bg: string }> = {
  'urgent': { label: 'Urgent', color: 'text-red-700', bg: 'bg-red-100' },
  'normal': { label: 'Normal', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'low': { label: 'Low', color: 'text-gray-600', bg: 'bg-gray-100' },
};

export const STORAGE_KEYS = {
  LOCATION: 'sp_location',
  PRAYER_PREFIX: 'sp_prayer_',
  PRAYER_COMPLETED_PREFIX: 'sp_prayer_completed_',
  TODOS: 'sp_todos',
  NOTIFICATION_PREF: 'sp_notification_pref',
} as const;

export const CALCULATION_METHODS: Record<number, string> = {
  1: 'University of Islamic Sciences, Karachi',
  2: 'Islamic Society of North America (ISNA)',
  3: 'Muslim World League (MWL)',
  4: 'Umm Al-Qura University, Makkah',
  5: 'Egyptian General Authority of Survey',
};
