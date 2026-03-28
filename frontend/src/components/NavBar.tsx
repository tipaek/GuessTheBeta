import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', label: 'Gyms', icon: '🏠' },
  { path: '/feed', label: 'Feed', icon: '🧗' },
  { path: '/climbs', label: 'Climbs', icon: '📋' },
];

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-around bg-dark-card border-t border-white/10 px-2 py-2 safe-bottom">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
              active ? 'text-brand' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
