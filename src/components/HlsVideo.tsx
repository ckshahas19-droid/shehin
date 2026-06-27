import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps {
  src: string;
  className?: string;
  flipY?: boolean;
}

export default function HlsVideo({ src, className = '', flipY = false }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: Hls | null = null;

    const isMp4 = src.toLowerCase().endsWith('.mp4') || src.includes('/user_') || !src.includes('.m3u8');

    if (isMp4) {
      video.src = src;
      const playVideo = () => {
        video.play().catch((err) => {
          console.warn("MP4 Video autoplay failed, trying again", err);
        });
        setIsLoaded(true);
      };
      
      video.addEventListener('loadedmetadata', playVideo);
      video.addEventListener('canplay', playVideo);
      
      // Force trigger if readyState already has metadata
      if (video.readyState >= 1) {
        playVideo();
      }

      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
        video.removeEventListener('canplay', playVideo);
      };
    } else if (Hls.isSupported()) {
      hlsInstance = new Hls({
        maxMaxBufferLength: 10, // Optimize buffering for backgrounds
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.warn("HLS Video autoplay failed, trying again on user interaction", err);
        });
        setIsLoaded(true);
      });

      hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hlsInstance?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hlsInstance?.recoverMediaError();
              break;
            default:
              console.error("Unrecoverable HLS error:", data);
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari, iOS)
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((err) => {
          console.warn("Native HLS video play failed", err);
        });
        setIsLoaded(true);
      });
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-bg/85 ${className}`}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className={`w-full h-full object-cover opacity-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          transform: flipY ? 'scaleY(-1)' : 'none',
        }}
      />
    </div>
  );
}
