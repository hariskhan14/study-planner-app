import { useState } from 'react';
import { MapPin, Locate, X } from 'lucide-react';
import type { UserLocation } from '../../types/prayer';
import { CALCULATION_METHODS } from '../../utils/constants';

interface LocationSelectorProps {
  currentLocation: UserLocation | null;
  loading: boolean;
  error: string | null;
  onDetect: () => void;
  onUpdate: (location: UserLocation) => void;
  onClose: () => void;
}

export function LocationSelector({
  currentLocation,
  loading,
  error,
  onDetect,
  onUpdate,
  onClose,
}: LocationSelectorProps) {
  const [city, setCity] = useState(currentLocation?.city || '');
  const [lat, setLat] = useState(currentLocation?.coords.latitude?.toString() || '');
  const [lng, setLng] = useState(currentLocation?.coords.longitude?.toString() || '');
  const [method, setMethod] = useState(currentLocation?.method || 2);

  const handleManualSave = () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (isNaN(latitude) || isNaN(longitude)) return;

    onUpdate({
      coords: { latitude, longitude },
      city: city || 'Custom',
      method,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin size={20} className="text-primary-600" />
            Location Settings
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <button
          onClick={onDetect}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2.5 rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          <Locate size={18} />
          {loading ? 'Detecting...' : 'Auto-detect Location'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="border-t pt-4 space-y-3">
          <p className="text-sm text-gray-500 font-medium">Or enter manually:</p>
          <input
            type="text"
            placeholder="City name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={method}
            onChange={(e) => setMethod(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {Object.entries(CALCULATION_METHODS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <button
            onClick={handleManualSave}
            className="w-full bg-gray-800 text-white py-2.5 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
}
