import { Clock, ListTodo } from 'lucide-react';
import type { PrayerTime } from '../../types/prayer';
import type { Todo } from '../../types/todo';
import { useCountdown } from '../../hooks/useCountdown';
import { formatTime12h } from '../../utils/dateUtils';
import { CATEGORY_CONFIG } from '../../utils/constants';

type UpNextItem =
  | { type: 'prayer'; prayer: PrayerTime }
  | { type: 'task'; todo: Todo };

interface UpNextBannerProps {
  item: UpNextItem;
}

function BannerContent({ item }: { item: UpNextItem }) {
  const targetTime = item.type === 'prayer'
    ? new Date(item.prayer.timestamp)
    : new Date(item.todo.dueDate);
  const countdown = useCountdown(targetTime);

  if (item.type === 'prayer') {
    return (
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-2 text-primary-200 text-sm mb-1">
          <Clock size={14} />
          <span>Up Next — Prayer</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">{item.prayer.name}</h2>
            <p className="text-primary-200 text-sm mt-0.5">{formatTime12h(item.prayer.time)}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold tabular-nums">{countdown.formatted}</p>
            <p className="text-primary-300 text-xs">remaining</p>
          </div>
        </div>
      </div>
    );
  }

  const cat = CATEGORY_CONFIG[item.todo.category];

  return (
    <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center gap-2 text-amber-200 text-sm mb-1">
        <ListTodo size={14} />
        <span>Up Next — Task</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="min-w-0 flex-1 mr-3">
          <h2 className="text-2xl font-bold truncate">{item.todo.title}</h2>
          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${cat.bg} ${cat.color}`}>
            {cat.label}
          </span>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-3xl font-bold tabular-nums">{countdown.formatted}</p>
          <p className="text-amber-300 text-xs">remaining</p>
        </div>
      </div>
    </div>
  );
}

export function UpNextBanner({ item }: UpNextBannerProps) {
  return <BannerContent item={item} />;
}

export function getUpNextItem(
  nextPrayer: PrayerTime | null,
  nextTodo: Todo | undefined,
): UpNextItem | null {
  const prayerTime = nextPrayer ? nextPrayer.timestamp : Infinity;
  const todoTime = nextTodo ? new Date(nextTodo.dueDate).getTime() : Infinity;

  if (prayerTime === Infinity && todoTime === Infinity) return null;

  if (todoTime < prayerTime && nextTodo) {
    return { type: 'task', todo: nextTodo };
  }
  if (nextPrayer) {
    return { type: 'prayer', prayer: nextPrayer };
  }
  return null;
}
