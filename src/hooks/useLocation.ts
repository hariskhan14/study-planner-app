import { useState, useEffect, useCallback } from 'react';
import type { Coords, UserLocation } from '../types/prayer';
import { STORAGE_KEYS } from '../utils/constants';

interface UseLocationReturn {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
  detectLocation: () => void;
  updateLocation: (location: UserLocation) => void;
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCATION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = useCallback((loc: UserLocation) => {
    setLocation(loc);
    localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(loc));
    setError(null);
  }, []);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: Coords = {
          latitude: parseFloat(position.coords.latitude.toFixed(4)),
          longitude: parseFloat(position.coords.longitude.toFixed(4)),
        };

        let city = 'Unknown';
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const data = await res.json();
          city = data.address?.city || data.address?.town || data.address?.village || 'Unknown';
        } catch {
          // Reverse geocoding failed, use coordinates
        }

        updateLocation({ coords, city, method: 2 });
        setLoading(false);
      },
      (err) => {
        setError(err.message || 'Failed to get location');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, [updateLocation]);

  useEffect(() => {
    if (!location) {
      detectLocation();
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return { location, loading, error, detectLocation, updateLocation };
}
