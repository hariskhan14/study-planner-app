import { Link } from 'react-router-dom';
import { MapPin, RefreshCw } from 'lucide-react';

interface HeaderProps {
  city: string | null;
  onLocationClick: () => void;
}

export function Header({ city, onLocationClick }: HeaderProps) {
  return (
    <header className="bg-primary-800 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      <Link to="/" className="text-lg font-bold tracking-tight hover:text-primary-200 transition-colors">
        Muslim Student Planner
      </Link>
      <button
        onClick={onLocationClick}
        className="flex items-center gap-1.5 text-sm text-primary-200 hover:text-white transition-colors"
      >
        <MapPin size={16} />
        <span>{city || 'Set location'}</span>
        <RefreshCw size={12} />
      </button>
    </header>
  );
}
