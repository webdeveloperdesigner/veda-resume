import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MESSAGES = [
  "Extracting Document Layout",
  "Analyzing clarity and impact",
  "Checking ATS compatibility",
  "Identifying skill gaps",
  "Evaluating industry fit",
  "Preparing VEDA insights"
];

export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 md:py-32">
      {/* Cinematic Multi-Ring Spinner */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-12">
        <div className="absolute inset-0 rounded-full border border-gray-300 dark:border-white/10 animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute inset-2 rounded-full border border-gray-400 dark:border-white/20 animate-[spin_3s_linear_infinite_reverse]"></div>
        <div className="absolute inset-7 rounded-full border-2 border-transparent border-b-gray-900 border-l-gray-900 dark:border-b-white dark:border-l-white animate-[spin_1s_linear_infinite]"></div>
        <Sparkles className="w-8 h-8 text-gray-900 dark:text-white animate-pulse" />
      </div>

      {/* Static Header Text */}
      <h2 className="font-mono text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-wider">
        Scanning Resume...
      </h2>

      {/* Animated Subtitle */}
      <div className="h-8 overflow-hidden relative w-full max-w-sm text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium absolute w-full"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
