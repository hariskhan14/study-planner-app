import { Clock } from 'lucide-react';
import type { PrayerTime } from '../../types/prayer';
import { useCountdown } from '../../hooks/useCountdown';
import { formatTime12h } from '../../utils/dateUtils';

interface NextPrayerBannerProps {
  prayer: PrayerTime;
}

export function NextPrayerBanner({ prayer }: NextPrayerBannerProps) {
  const countdown = useCountdown(new Date(prayer.timestamp));

  return (
    <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center gap-2 text-primary-200 text-sm mb-1">
        <Clock size={14} />
        <span>Next Prayer</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">{prayer.name}</h2>
          <p className="text-primary-200 text-sm mt-0.5">{formatTime12h(prayer.time)}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold tabular-nums">{countdown.formatted}</p>
          <p className="text-primary-300 text-xs">remaining</p>
        </div>
      </div>
    </div>
  );
}
