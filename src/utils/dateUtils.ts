import { format, formatDistanceToNow, differenceInSeconds, isPast } from 'date-fns';

export function formatTime12h(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function timeStringToTimestamp(time24: string, date: Date = new Date()): number {
  const [hours, minutes] = time24.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result.getTime();
}

export function formatDateForApi(date: Date = new Date()): string {
  return format(date, 'dd-MM-yyyy');
}

export function formatDateKey(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}

export function getCountdown(targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
  formatted: string;
} {
  const now = new Date();
  const totalSeconds = differenceInSeconds(targetDate, now);
  const isOverdue = totalSeconds < 0;
  const abs = Math.abs(totalSeconds);

  const days = Math.floor(abs / 86400);
  const hours = Math.floor((abs % 86400) / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const seconds = abs % 60;

  let formatted: string;
  if (days > 0) {
    formatted = `${days}d ${hours}h`;
  } else if (hours > 0) {
    formatted = `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    formatted = `${minutes}m ${seconds}s`;
  } else {
    formatted = `${seconds}s`;
  }

  if (isOverdue) formatted = `Overdue`;

  return { days, hours, minutes, seconds, isOverdue, formatted };
}

export function formatRelativeTime(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function isDatePast(date: Date | string): boolean {
  return isPast(new Date(date));
}
