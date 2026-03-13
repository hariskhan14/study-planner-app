import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight, Bell, BellOff, Loader2 } from 'lucide-react';
import type { UserLocation } from '../types/prayer';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useTodos } from '../hooks/useTodos';
import { getNextPrayer } from '../utils/prayerUtils';
import { UpNextBanner, getUpNextItem } from '../components/dashboard/UpNextBanner';
import { PrayerList } from '../components/prayer/PrayerList';
import { TodoItem } from '../components/todo/TodoItem';
import {
  getNotificationPermission,
  requestNotificationPermission,
} from '../services/notificationService';
import { useState } from 'react';

interface OutletContext {
  location: UserLocation | null;
}

export function HomePage() {
  const { location } = useOutletContext<OutletContext>();
  const { prayers, completed, loading, toggleCompleted } = usePrayerTimes(location);
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const [notifPermission, setNotifPermission] = useState(getNotificationPermission);

  const nextPrayer = prayers ? getNextPrayer(prayers) : null;
  const incompleteTodos = todos
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const upcomingTodos = incompleteTodos.slice(0, 3);
  const upNextItem = getUpNextItem(nextPrayer, incompleteTodos[0]);

  const handleEnableNotifications = async () => {
    const perm = await requestNotificationPermission();
    setNotifPermission(perm);
  };

  return (
    <div className="space-y-6">
      {/* Notification banner */}
      {notifPermission === 'default' && (
        <button
          onClick={handleEnableNotifications}
          className="w-full flex items-center gap-3 bg-gold-500/10 border border-gold-500/30 rounded-xl p-4 text-left hover:bg-gold-500/20 transition-colors"
        >
          <Bell size={20} className="text-gold-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-800">Enable Notifications</p>
            <p className="text-xs text-gray-500">Get prayer reminders and task deadline alerts</p>
          </div>
        </button>
      )}
      {notifPermission === 'denied' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
          <BellOff size={20} className="text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-600">
            Notifications blocked. Enable them in your browser settings for prayer reminders.
          </p>
        </div>
      )}

      {/* Up Next Banner — whichever is soonest: prayer or task */}
      {loading && !prayers ? (
        <div className="bg-primary-800 rounded-2xl p-8 flex justify-center">
          <Loader2 size={24} className="animate-spin text-white" />
        </div>
      ) : upNextItem ? (
        <UpNextBanner item={upNextItem} />
      ) : prayers ? (
        <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-5 text-white">
          <p className="font-semibold">All prayers completed for today!</p>
          <p className="text-primary-200 text-sm mt-1">MashaAllah, great job!</p>
        </div>
      ) : null}

      {/* Today's Prayers (only uncompleted) */}
      {prayers && (
        <section>
          {(() => {
            const remaining = prayers.filter(p => !completed[p.name]);
            return remaining.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-800">Today's Prayers</h2>
                  <Link to="/prayers" className="text-sm text-primary-600 flex items-center gap-1 hover:underline">
                    View all <ArrowRight size={14} />
                  </Link>
                </div>
                <PrayerList prayers={remaining} completed={completed} onToggle={toggleCompleted} />
              </>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">All prayers marked for today</p>
                <Link to="/prayers" className="text-sm text-primary-600 flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
            );
          })()}
        </section>
      )}

      {/* Upcoming Tasks */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">Upcoming Tasks</h2>
          <Link to="/todos" className="text-sm text-primary-600 flex items-center gap-1 hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {upcomingTodos.length > 0 ? (
          <div className="space-y-2">
            {upcomingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-gray-100">
            <p className="text-sm">No upcoming tasks</p>
            <Link to="/todos" className="text-sm text-primary-600 hover:underline mt-1 inline-block">
              Add a task
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
