import { NavLink } from 'react-router-dom';
import { Home, Clock, ListTodo } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/prayers', icon: Clock, label: 'Prayers' },
  { to: '/todos', icon: ListTodo, label: 'Tasks' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-primary-700'
                  : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
