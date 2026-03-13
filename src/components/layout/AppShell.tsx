import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { LocationSelector } from '../prayer/LocationSelector';
import { useState } from 'react';
import { useLocation } from '../../hooks/useLocation';

export function AppShell() {
  const { location, loading, error, detectLocation, updateLocation } = useLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <div className="flex flex-col min-h-svh">
      <Header
        city={location?.city ?? null}
        onLocationClick={() => setShowLocationModal(true)}
      />

      <main className="flex-1 pb-20 px-4 py-4 max-w-lg mx-auto w-full">
        <Outlet context={{ location, loading, error, detectLocation, updateLocation }} />
      </main>

      <BottomNav />

      {showLocationModal && (
        <LocationSelector
          currentLocation={location}
          loading={loading}
          error={error}
          onDetect={detectLocation}
          onUpdate={updateLocation}
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
}
