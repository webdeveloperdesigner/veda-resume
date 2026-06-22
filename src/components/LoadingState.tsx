import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MESSAGES = [
  "Reading your resume...",
  "Analyzing clarity and impact...",
  "Checking ATS compatibility...",
  "Identifying skill gaps...",
  "Evaluating industry fit...",
  "Preparing VEDA insights..."
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
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-24 h-24 flex items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500/50 animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-blue-500/50 animate-[spin_4s_linear_infinite_reverse]"></div>
        <Sparkles className="w-10 h-10 text-teal-400 animate-soft-pulse" />
      </div>

      <div className="h-8 overflow-hidden relative w-full max-w-sm text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-300 font-medium absolute w-full"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
