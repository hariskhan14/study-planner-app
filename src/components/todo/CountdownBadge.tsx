import { useCountdown } from '../../hooks/useCountdown';

interface CountdownBadgeProps {
  dueDate: string;
}

export function CountdownBadge({ dueDate }: CountdownBadgeProps) {
  const { formatted, isOverdue } = useCountdown(dueDate);

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full tabular-nums ${
        isOverdue
          ? 'bg-red-100 text-red-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {formatted}
    </span>
  );
}
