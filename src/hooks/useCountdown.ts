import { useState, useEffect } from 'react';
import { getCountdown } from '../utils/dateUtils';

export function useCountdown(targetDate: Date | string) {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;

  const [countdown, setCountdown] = useState(() => getCountdown(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target.getTime()]);

  return countdown;
}
