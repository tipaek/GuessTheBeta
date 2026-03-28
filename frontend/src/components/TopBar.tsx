import { useAppStore } from '../store/useAppStore';
import AuthButton from './AuthButton';

interface TopBarProps {
  title: string;
  showFilter?: boolean;
  onBack?: () => void;
}

export default function TopBar({ title, showFilter = false, onBack }: TopBarProps) {
  const setFilterOpen = useAppStore((s) => s.setFilterOpen);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-dark-card/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="text-white/70 hover:text-white text-lg">
            ←
          </button>
        )}
        <h1 className="text-lg font-bold truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {showFilter && (
          <button
            onClick={() => setFilterOpen(true)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Filter difficulty"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        )}
        <AuthButton />
      </div>
    </div>
  );
}
