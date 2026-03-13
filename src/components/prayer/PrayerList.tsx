import type { PrayerName, PrayerTime } from '../../types/prayer';
import { getNextPrayer } from '../../utils/prayerUtils';
import { PrayerCard } from './PrayerCard';

interface PrayerListProps {
  prayers: PrayerTime[];
  completed: Record<PrayerName, boolean>;
  onToggle: (name: PrayerName) => void;
}

export function PrayerList({ prayers, completed, onToggle }: PrayerListProps) {
  const nextPrayer = getNextPrayer(prayers);

  return (
    <div className="space-y-2">
      {prayers.map((prayer) => (
        <PrayerCard
          key={prayer.name}
          prayer={prayer}
          isCompleted={completed[prayer.name]}
          isNext={nextPrayer?.name === prayer.name}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
