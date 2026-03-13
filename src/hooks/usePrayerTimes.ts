import { useState, useEffect, useCallback } from 'react';
import type { PrayerName, PrayerTime, UserLocation } from '../types/prayer';
import { fetchPrayerTimes } from '../services/prayerApi';
import { formatDateKey } from '../utils/dateUtils';
import { getDefaultCompleted } from '../utils/prayerUtils';
import { STORAGE_KEYS } from '../utils/constants';

interface UsePrayerTimesReturn {
  prayers: PrayerTime[] | null;
  completed: Record<PrayerName, boolean>;
  loading: boolean;
  error: string | null;
  toggleCompleted: (name: PrayerName) => void;
  refetch: () => void;
}

export function usePrayerTimes(location: UserLocation | null): UsePrayerTimesReturn {
  const [prayers, setPrayers] = useState<PrayerTime[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dateKey = formatDateKey();
  const completedKey = `${STORAGE_KEYS.PRAYER_COMPLETED_PREFIX}${dateKey}`;

  const [completed, setCompleted] = useState<Record<PrayerName, boolean>>(() => {
    try {
      const saved = localStorage.getItem(completedKey);
      return saved ? JSON.parse(saved) : getDefaultCompleted();
    } catch {
      return getDefaultCompleted();
    }
  });

  const loadPrayers = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const times = await fetchPrayerTimes(location.coords, location.method);
      setPrayers(times);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prayer times');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    loadPrayers();
  }, [loadPrayers]);

  const toggleCompleted = useCallback((name: PrayerName) => {
    setCompleted(prev => {
      const next = { ...prev, [name]: !prev[name] };
      localStorage.setItem(completedKey, JSON.stringify(next));
      return next;
    });
  }, [completedKey]);

  return { prayers, completed, loading, error, toggleCompleted, refetch: loadPrayers };
}
