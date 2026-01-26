import { useCallback, useRef } from 'react';

export const useSound = (src: string, volume = 0.7) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
    }
    
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      // Handle autoplay restrictions gracefully
    });
  }, [src, volume]);

  return { play };
};
