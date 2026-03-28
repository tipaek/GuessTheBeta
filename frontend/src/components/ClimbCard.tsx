import { useState, useEffect, useRef } from 'react';
import { routeApi, userApi } from '../api/client';
import { useAppStore } from '../store/useAppStore';
import VideoPlayer from './VideoPlayer';
import type { Route, BetaVideo } from '../types';

interface ClimbCardProps {
  route: Route;
}

export default function ClimbCard({ route }: ClimbCardProps) {
  const [showBeta, setShowBeta] = useState(false);
  const [videos, setVideos] = useState<BetaVideo[]>([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const token = useAppStore((s) => s.token);

  const touchStartX = useRef(0);

  // Reset state when route changes
  useEffect(() => {
    setShowBeta(false);
    setVideos([]);
    setVideoIndex(0);
  }, [route.id]);

  const handleShowBeta = async () => {
    if (videos.length === 0) {
      setLoadingVideos(true);
      try {
        const vids = await routeApi.getVideos(route.id);
        setVideos(vids);
      } catch (err) {
        console.error('Failed to load videos:', err);
      } finally {
        setLoadingVideos(false);
      }
    }
    setShowBeta(true);

    // Record beta watch
    if (token) {
      userApi.recordHistory(route.id, true).catch(() => {});
    }
  };

  // Horizontal swipe for multiple beta videos
  const handleVideoTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleVideoTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0 && videoIndex < videos.length - 1) {
        setVideoIndex(videoIndex + 1);
      } else if (deltaX < 0 && videoIndex > 0) {
        setVideoIndex(videoIndex - 1);
      }
    }
  };

  return (
    <div className="h-full w-full relative">
      {/* Route photo - full screen background */}
      <div className="absolute inset-0">
        <img
          src={route.photoUrl}
          alt={route.name || route.grade}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Route info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-brand rounded-full text-sm font-bold mb-2">
              {route.grade}
            </span>
            {route.name && (
              <p className="text-lg font-semibold drop-shadow-lg">{route.name}</p>
            )}
            <p className="text-sm text-white/70">{route.gymName}</p>
            {route.setter && (
              <p className="text-xs text-white/50 mt-1">Set by {route.setter}</p>
            )}
            {route.color && (
              <p className="text-xs text-white/50">Color: {route.color}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleShowBeta}
              disabled={loadingVideos}
              className="px-5 py-2.5 bg-brand hover:bg-brand-dark rounded-full font-semibold text-sm
                transition-colors shadow-lg disabled:opacity-50"
            >
              {loadingVideos ? '...' : 'Beta'}
            </button>
            {route.videoCount > 0 && (
              <span className="text-center text-xs text-white/50">
                {route.videoCount} video{route.videoCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Beta video overlay */}
      {showBeta && videos.length > 0 && (
        <div
          className="absolute inset-0 bg-black/95 z-20 flex flex-col"
          onTouchStart={handleVideoTouchStart}
          onTouchEnd={handleVideoTouchEnd}
        >
          {/* Close button */}
          <div className="flex items-center justify-between p-4">
            <div>
              <span className="text-sm font-semibold">{route.grade}</span>
              {videos[videoIndex]?.climber && (
                <span className="text-sm text-white/60 ml-2">
                  by {videos[videoIndex].climber}
                </span>
              )}
            </div>
            <button
              onClick={() => setShowBeta(false)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          {/* Video */}
          <div className="flex-1 flex items-center justify-center px-4">
            <VideoPlayer video={videos[videoIndex]} />
          </div>

          {/* Video navigation dots */}
          {videos.length > 1 && (
            <div className="flex items-center justify-center gap-2 p-4">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVideoIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === videoIndex ? 'bg-brand' : 'bg-white/30'
                  }`}
                />
              ))}
              <span className="text-xs text-white/40 ml-2">
                Swipe ← → for more beta
              </span>
            </div>
          )}
        </div>
      )}

      {/* No videos message */}
      {showBeta && videos.length === 0 && !loadingVideos && (
        <div className="absolute inset-0 bg-black/90 z-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-2">No beta videos yet</p>
            <p className="text-sm text-white/50 mb-4">Check back later</p>
            <button
              onClick={() => setShowBeta(false)}
              className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
