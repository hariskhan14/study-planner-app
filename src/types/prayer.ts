export interface Coords {
  latitude: number;
  longitude: number;
}

export interface UserLocation {
  coords: Coords;
  city: string;
  country?: string;
  method: number;
}

export type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export interface PrayerTime {
  name: PrayerName;
  time: string;
  timestamp: number;
}

export interface PrayerDay {
  date: string;
  prayers: PrayerTime[];
  completed: Record<PrayerName, boolean>;
}
