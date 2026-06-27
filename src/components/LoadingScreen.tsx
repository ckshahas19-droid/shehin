import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);

  // Counter animation from 0 to 100 over exactly 2700ms
  useEffect(() => {
    const duration = 2700;
    const startTime = performance.now();

    let frameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate current count (0 to 100)
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      } else {
        // Delay 400ms after reaching 100 before triggering completion
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    frameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  // Word cycling every 900ms (so 3 words fit perfectly in 2700ms)
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);

    return () => {
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div 
      id="loading-screen" 
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12 select-none"
    >
      {/* Top Left Label */}
      <div className="flex items-start">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em]"
        >
          Portfolio Label &bull; Colection &apos;26
        </motion.div>
      </div>

      {/* Center Word Slider */}
      <div className="flex justify-center items-center h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Counter & Progress Bar Container */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-end items-baseline">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter">
            {String(count).padStart(3, '0')}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] bg-stroke/30 rounded-full overflow-hidden relative">
          <div
            className="accent-gradient h-full rounded-full transition-transform duration-75 ease-out"
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
