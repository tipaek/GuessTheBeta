import { useEffect, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeApi, userApi } from '../api/client';
import { useAppStore } from '../store/useAppStore';
import TopBar from '../components/TopBar';
import ClimbCard from '../components/ClimbCard';

export default function FeedPage() {
  const navigate = useNavigate();
  const {
    selectedGym, feedRoutes, addFeedRoutes, setFeedRoutes,
    seenRouteIds, addSeenRoute,
    currentIndex, setCurrentIndex,
    minGrade, maxGrade, token,
  } = useAppStore();

  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  // Redirect if no gym selected
  useEffect(() => {
    if (!selectedGym) {
      navigate('/');
    }
  }, [selectedGym, navigate]);

  // Load initial routes
  const loadRoutes = useCallback(async () => {
    if (!selectedGym || loading) return;
    setLoading(true);
    try {
      const routes = await routeApi.getRandom(selectedGym.id, minGrade, maxGrade, seenRouteIds, 5);
      if (routes.length > 0) {
        addFeedRoutes(routes);
        routes.forEach((r) => addSeenRoute(r.id));
      }
    } catch (err) {
      console.error('Failed to load routes:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedGym, minGrade, maxGrade, seenRouteIds, loading, addFeedRoutes, addSeenRoute]);

  useEffect(() => {
    if (selectedGym && feedRoutes.length === 0) {
      loadRoutes();
    }
  }, [selectedGym, feedRoutes.length, loadRoutes]);

  // Prefetch more routes when near the end
  useEffect(() => {
    if (feedRoutes.length > 0 && currentIndex >= feedRoutes.length - 2) {
      loadRoutes();
    }
  }, [currentIndex, feedRoutes.length, loadRoutes]);

  // Record view in history
  useEffect(() => {
    if (token && feedRoutes[currentIndex]) {
      userApi.recordHistory(feedRoutes[currentIndex].id, false).catch(() => {});
    }
  }, [currentIndex, feedRoutes, token]);

  // Touch/swipe handling for vertical navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;

    // Only handle vertical swipes (ignore horizontal for video navigation)
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentIndex < feedRoutes.length - 1) {
        // Swipe up → next route
        setCurrentIndex(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Swipe down → previous route
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // Keyboard navigation (PC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < feedRoutes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, feedRoutes.length, setCurrentIndex]);

  // Mouse wheel navigation
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelTimeout.current) return;
    wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null; }, 500);

    if (e.deltaY > 0 && currentIndex < feedRoutes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!selectedGym) return null;

  const currentRoute = feedRoutes[currentIndex];

  return (
    <div className="h-full flex flex-col">
      <TopBar
        title={selectedGym.name}
        showFilter
        onBack={() => { setFeedRoutes([]); navigate('/'); }}
      />
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {loading && feedRoutes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
          </div>
        ) : currentRoute ? (
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
          >
            <ClimbCard route={currentRoute} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white/50">
            <div className="text-center">
              <p className="text-lg mb-2">No routes found</p>
              <p className="text-sm">Try adjusting your difficulty filter</p>
            </div>
          </div>
        )}

        {/* Position indicator */}
        {feedRoutes.length > 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            {feedRoutes.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((_, i) => {
              const actualIndex = Math.max(0, currentIndex - 2) + i;
              return (
                <div
                  key={actualIndex}
                  className={`w-1.5 rounded-full transition-all ${
                    actualIndex === currentIndex ? 'h-4 bg-brand' : 'h-1.5 bg-white/30'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
