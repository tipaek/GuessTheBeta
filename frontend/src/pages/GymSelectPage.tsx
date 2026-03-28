import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gymApi } from '../api/client';
import { useAppStore } from '../store/useAppStore';
import TopBar from '../components/TopBar';
import type { Gym } from '../types';

export default function GymSelectPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const setSelectedGym = useAppStore((s) => s.setSelectedGym);
  const navigate = useNavigate();

  useEffect(() => {
    gymApi.getAll()
      .then(setGyms)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const boards = gyms.filter((g) => g.isBoard);
  const regularGyms = gyms.filter((g) => !g.isBoard);

  const handleSelect = (gym: Gym) => {
    setSelectedGym(gym);
    navigate('/feed');
  };

  return (
    <div className="h-full flex flex-col">
      <TopBar title="Guess the Beta" />
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
          </div>
        ) : (
          <>
            {boards.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Board Climbs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {boards.map((gym) => (
                    <GymCard key={gym.id} gym={gym} onClick={() => handleSelect(gym)} />
                  ))}
                </div>
              </section>
            )}

            {regularGyms.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Gyms
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {regularGyms.map((gym) => (
                    <GymCard key={gym.id} gym={gym} onClick={() => handleSelect(gym)} />
                  ))}
                </div>
              </section>
            )}

            {gyms.length === 0 && (
              <div className="text-center text-white/50 mt-20">
                <p className="text-lg mb-2">No gyms available yet</p>
                <p className="text-sm">Check back soon for board climbs and gym routes.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GymCard({ gym, onClick }: { gym: Gym; onClick: () => void }) {
  const boardColors: Record<string, string> = {
    kilter: 'from-orange-600 to-red-700',
    tension: 'from-blue-600 to-indigo-700',
    moon: 'from-yellow-600 to-amber-700',
  };

  const gradient = gym.boardType
    ? boardColors[gym.boardType] || 'from-gray-600 to-gray-700'
    : 'from-dark-surface to-dark-card';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl bg-gradient-to-br ${gradient}
        hover:scale-[1.02] active:scale-[0.98] transition-transform`}
    >
      <div className="flex items-center gap-3">
        {gym.logoUrl ? (
          <img src={gym.logoUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
            {gym.isBoard ? '📐' : '🧗'}
          </div>
        )}
        <div>
          <p className="font-semibold">{gym.name}</p>
          {gym.city && (
            <p className="text-xs text-white/60">{gym.city}{gym.state ? `, ${gym.state}` : ''}</p>
          )}
          {gym.boardType && (
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-white/20 rounded-full uppercase">
              {gym.boardType} board
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
