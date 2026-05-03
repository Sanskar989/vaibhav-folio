import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const MUSIC_URL = "/bgm.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showVibe, setShowVibe] = useState(false);

  const startMusic = useCallback(() => {
    if (hasStarted || !audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setHasStarted(true);
      setShowVibe(true);
      setTimeout(() => setShowVibe(false), 3000);
    }).catch(() => {});
  }, [hasStarted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.18;
      audioRef.current.loop = true;
    }
  }, []);

  // Auto-play on first user interaction (click, scroll, touch, keypress)
  useEffect(() => {
    const events = ['click', 'scroll', 'touchstart', 'keydown', 'mousemove'];
    const handler = () => {
      startMusic();
      events.forEach(e => window.removeEventListener(e, handler));
    };
    events.forEach(e => window.addEventListener(e, handler, { once: true, passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, handler));
  }, [startMusic]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* "Vibes On" toast that appears when music starts */}
      {showVibe && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-24 right-6 z-[150] bg-brand-accent/90 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-[0_10px_40px_rgba(108,99,255,0.4)] flex items-center gap-3"
        >
          <Music className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-bold">Travel vibes ON</span>
          <div className="flex items-center gap-[2px] ml-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [3, 12 + Math.random() * 6, 3] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
                className="w-[2px] bg-white/80 rounded-full"
                style={{ height: 3 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating music button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-[150] w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg group ${
          isPlaying
            ? 'bg-brand-accent text-white shadow-brand-accent/40'
            : 'bg-white/10 backdrop-blur-xl border border-white/20 text-white/60 hover:text-white hover:border-brand-accent/50'
        }`}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5" />
            <span className="absolute inset-0 rounded-full border-2 border-brand-accent/50 animate-ping opacity-20" />
            {/* Spinning ring */}
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-3px] rounded-full border-2 border-transparent border-t-brand-accent/60"
            />
          </>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </>
  );
}
