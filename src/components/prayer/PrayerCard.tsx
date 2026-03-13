import { Check, Circle } from 'lucide-react';
import type { PrayerName, PrayerTime } from '../../types/prayer';
import { formatTime12h } from '../../utils/dateUtils';
import { isPrayerPassed } from '../../utils/prayerUtils';

interface PrayerCardProps {
  prayer: PrayerTime;
  isCompleted: boolean;
  isNext: boolean;
  onToggle: (name: PrayerName) => void;
}

export function PrayerCard({ prayer, isCompleted, isNext, onToggle }: PrayerCardProps) {
  const passed = isPrayerPassed(prayer);

  return (
    <button
      onClick={() => onToggle(prayer.name)}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
        isNext
          ? 'bg-primary-50 border-2 border-primary-300 shadow-sm'
          : 'bg-white border border-gray-100'
      } ${isCompleted ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isCompleted
              ? 'bg-primary-500 text-white'
              : passed
              ? 'bg-red-100 text-red-400'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {isCompleted ? <Check size={18} /> : <Circle size={18} />}
        </div>
        <div className="text-left">
          <p className={`font-semibold ${isNext ? 'text-primary-800' : 'text-gray-800'}`}>
            {prayer.name}
          </p>
          {isNext && (
            <p className="text-xs text-primary-600 font-medium">Next prayer</p>
          )}
          {passed && !isCompleted && !isNext && (
            <p className="text-xs text-red-500">Missed</p>
          )}
        </div>
      </div>
      <span className={`text-sm font-medium ${isNext ? 'text-primary-700' : 'text-gray-500'}`}>
        {formatTime12h(prayer.time)}
      </span>
    </button>
  );
}
