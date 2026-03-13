import { useOutletContext } from 'react-router-dom';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import type { UserLocation } from '../types/prayer';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { getNextPrayer } from '../utils/prayerUtils';
import { NextPrayerBanner } from '../components/prayer/NextPrayerBanner';
import { PrayerList } from '../components/prayer/PrayerList';
import { useEffect } from 'react';
import { scheduleNotification, cancelAllNotifications } from '../services/notificationService';

interface OutletContext {
  location: UserLocation | null;
}

export function PrayerPage() {
  const { location } = useOutletContext<OutletContext>();
  const { prayers, completed, loading, error, toggleCompleted, refetch } = usePrayerTimes(location);

  const nextPrayer = prayers ? getNextPrayer(prayers) : null;

  // Schedule prayer notifications
  useEffect(() => {
    if (!prayers) return;

    prayers.forEach((prayer) => {
      const reminderTime = new Date(prayer.timestamp - 5 * 60 * 1000); // 5 min before
      scheduleNotification(
        `prayer-${prayer.name}`,
        `${prayer.name} Prayer`,
        `${prayer.name} prayer is in 5 minutes`,
        reminderTime
      );
    });

    return () => cancelAllNotifications();
  }, [prayers]);

  if (!location) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="font-medium">Waiting for location...</p>
        <p className="text-sm mt-1">Please allow location access or set it manually</p>
      </div>
    );
  }

  if (loading && !prayers) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={28} className="animate-spin text-primary-600" />
      </div>
    );
  }

  if (error && !prayers) {
    return (
      <div className="text-center py-16">
        <AlertCircle size={32} className="mx-auto text-red-400 mb-3" />
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={refetch}
          className="mt-3 flex items-center gap-2 mx-auto px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  if (!prayers) return null;

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {nextPrayer && <NextPrayerBanner prayer={nextPrayer} />}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Today's Prayers</h2>
        <span className="text-sm text-primary-600 font-medium">
          {completedCount}/5 completed
        </span>
      </div>

      <PrayerList prayers={prayers} completed={completed} onToggle={toggleCompleted} />
    </div>
  );
}
