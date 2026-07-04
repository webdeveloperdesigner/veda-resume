import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';



export function LoadingState({ isFinishing, onComplete }: { isFinishing?: boolean, onComplete?: () => void }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isFinishing) {
      // Fast forward to 100% when API is done
      const finishInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(finishInterval);
            setTimeout(() => onComplete?.(), 500); // Wait 500ms for the CSS width transition to visually finish
            return 100;
          }
          return prev + 5; // Fast increment
        });
      }, 50);
      return () => clearInterval(finishInterval);
    } else {
      // Fake progress bar that slows down as it gets closer to 95%
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return 95;
          const remaining = 95 - prev;
          const increment = Math.max(1, Math.floor(remaining / 15));
          return prev + increment;
        });
      }, 1000);
      return () => clearInterval(progressInterval);
    }
  }, [isFinishing, onComplete]);

  // Sync messages directly to the progress percentage
  let currentMessage = "";
  if (progress < 20) currentMessage = t('loading.messages.extracting');
  else if (progress < 40) currentMessage = t('loading.messages.analyzing');
  else if (progress < 60) currentMessage = t('loading.messages.ats');
  else if (progress < 75) currentMessage = t('loading.messages.gaps');
  else if (progress < 95) currentMessage = t('loading.messages.fit');
  else if (progress < 100) currentMessage = t('loading.messages.preparing');
  else currentMessage = t('loading.messages.complete');

  return (
    <div className="relative w-full">
      {/* BACKGROUND SKELETON LAYOUT */}
      <div className="w-full flex flex-col items-center opacity-30 dark:opacity-20 pointer-events-none select-none blur-[2px]">
        
        {/* Hero Section Skeleton (To prevent layout shifts) */}
        <div className="flex flex-col items-center mb-16 space-y-5 w-full max-w-2xl animate-pulse">
           {/* Badges */}
           <div className="flex gap-3 mb-4">
             <div className="w-32 h-8 bg-gray-200 dark:bg-white/10 rounded-full" />
             <div className="w-40 h-8 bg-gray-200 dark:bg-white/10 rounded-full" />
             <div className="w-36 h-8 bg-gray-200 dark:bg-white/10 rounded-full" />
           </div>
           {/* H1 Placeholder */}
           <div className="w-4/5 h-12 bg-gray-200 dark:bg-white/10 rounded-xl" />
           <div className="w-3/4 h-12 bg-gray-200 dark:bg-white/10 rounded-xl" />
           {/* Paragraph Placeholder */}
           <div className="w-full h-4 bg-gray-200 dark:bg-white/10 rounded-md mt-6" />
           <div className="w-11/12 h-4 bg-gray-200 dark:bg-white/10 rounded-md" />
           <div className="w-4/5 h-4 bg-gray-200 dark:bg-white/10 rounded-md" />
        </div>

        {/* Upload Zone Skeleton */}
        <div className="w-full max-w-4xl h-80 rounded-3xl border-2 border-dashed border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center space-y-6 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-white/10" />
          <div className="w-64 h-6 rounded-md bg-gray-200 dark:bg-white/10" />
          <div className="w-48 h-4 rounded-md bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Stats Bento Skeleton */}
        <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-40 rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 animate-pulse ${i === 1 ? 'md:col-span-2' : ''}`} />
          ))}
        </div>
      </div>

      {/* OVERLAY LOADING UI */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-[#0A0A0A]/90 backdrop-blur-md">
        
        {/* Subtle CSS Grid Background (optional styling) */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(to right, rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-8">
          
          {/* Logo / Spinner Section */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center mb-16"
          >
            {/* Cinematic Multi-Ring Spinner */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border border-gray-300 dark:border-white/10 animate-[spin_4s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-gray-400 dark:border-white/20 animate-[spin_3s_linear_infinite_reverse]"></div>
              <div className="absolute inset-7 rounded-full border-2 border-t-transparent border-r-transparent border-b-gray-900 border-l-gray-900 dark:border-t-transparent dark:border-r-transparent dark:border-b-white dark:border-l-white animate-[spin_1s_linear_infinite]"></div>
              <Sparkles className="w-8 h-8 text-gray-900 dark:text-white animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-3 drop-shadow-sm">
              VEDA
            </h1>
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase text-center">
              Virtual Employability & Document Analyzer
            </p>
          </motion.div>

          {/* Progress Bar Section */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end px-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMessage}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs font-bold tracking-widest text-gray-600 dark:text-gray-300 uppercase"
                >
                  {currentMessage}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-black text-gray-900 dark:text-white">
                {progress}%
              </span>
            </div>

            <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gray-900 dark:bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Bottom Loading Indicator */}
          <div className="mt-12 flex items-center space-x-3 opacity-50">
            <div className="flex space-x-1">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
            </div>
            <span className="text-xs font-bold tracking-[0.3em] text-gray-900 dark:text-white uppercase">Loading</span>
          </div>

        </div>
      </div>
    </div>
  );
}
