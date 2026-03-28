import type { BetaVideo } from '../types';

interface VideoPlayerProps {
  video: BetaVideo;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const { videoUrl } = video;

  // Detect YouTube URLs and render as iframe embed
  const youtubeMatch = videoUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
  );

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return (
      <div className="w-full aspect-video max-h-[70vh] rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Beta video"
        />
      </div>
    );
  }

  // Detect Instagram embed URLs
  if (videoUrl.includes('instagram.com')) {
    return (
      <div className="w-full aspect-[9/16] max-h-[70vh] rounded-xl overflow-hidden">
        <iframe
          src={`${videoUrl}embed`}
          className="w-full h-full"
          allowFullScreen
          title="Beta video"
        />
      </div>
    );
  }

  // Direct video URL (mp4, webm, etc.)
  return (
    <div className="w-full max-h-[70vh] rounded-xl overflow-hidden">
      <video
        src={videoUrl}
        controls
        autoPlay
        playsInline
        className="w-full h-full object-contain"
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
}
