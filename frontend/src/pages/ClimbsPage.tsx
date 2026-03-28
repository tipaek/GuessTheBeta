import { useEffect, useState } from 'react';
import { userApi } from '../api/client';
import { useAppStore } from '../store/useAppStore';
import TopBar from '../components/TopBar';
import type { ClimbHistory } from '../types';

export default function ClimbsPage() {
  const [history, setHistory] = useState<ClimbHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAppStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    userApi.getHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="h-full flex flex-col">
      <TopBar title="My Climbs" />
      <div className="flex-1 overflow-y-auto p-4">
        {!token ? (
          <div className="flex items-center justify-center h-full text-white/50">
            <div className="text-center">
              <p className="text-lg mb-2">Sign in to track climbs</p>
              <p className="text-sm">Your climb history will appear here</p>
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
          </div>
        ) : history.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/50">
            <div className="text-center">
              <p className="text-lg mb-2">No climbs yet</p>
              <p className="text-sm">Start swiping to build your history</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-dark-card rounded-xl"
              >
                <img
                  src={item.route.photoUrl}
                  alt={item.route.name || item.route.grade}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-brand rounded text-xs font-bold">
                      {item.route.grade}
                    </span>
                    {item.route.name && (
                      <span className="text-sm font-medium truncate">{item.route.name}</span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-1">{item.route.gymName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/40">
                      {new Date(item.viewedAt).toLocaleDateString()}
                    </span>
                    {item.watchedBeta && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-green-900/50 text-green-400 rounded">
                        Watched beta
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
