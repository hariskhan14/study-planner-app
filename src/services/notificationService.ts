const scheduledTimeouts = new Map<string, number>();

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return Promise.resolve('denied');
  }
  return Notification.requestPermission();
}

export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) return 'denied';
  return Notification.permission;
}

export function scheduleNotification(
  id: string,
  title: string,
  body: string,
  triggerAt: Date
): void {
  cancelNotification(id);

  const delay = triggerAt.getTime() - Date.now();
  if (delay <= 0) return;

  const timeoutId = window.setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/icons/icon-192.png',
      });
    }
    scheduledTimeouts.delete(id);
  }, delay);

  scheduledTimeouts.set(id, timeoutId);
}

export function cancelNotification(id: string): void {
  const existing = scheduledTimeouts.get(id);
  if (existing !== undefined) {
    window.clearTimeout(existing);
    scheduledTimeouts.delete(id);
  }
}

export function cancelAllNotifications(): void {
  scheduledTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  scheduledTimeouts.clear();
}
