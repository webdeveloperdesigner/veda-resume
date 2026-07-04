import { useEffect } from 'react';

export function InitialSplash({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Show the skeleton layout for 15 seconds before booting
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-white dark:bg-black pt-32 px-6 flex flex-col items-center">
      {/* SKELETON LAYOUT (YouTube / LinkedIn Style) */}
      <div className="w-full flex flex-col items-center pointer-events-none select-none">
        
        {/* Hero Section Skeleton */}
        <div className="flex flex-col items-center mb-16 space-y-5 w-full max-w-2xl animate-pulse">
           <div className="flex gap-3 mb-4">
             <div className="w-32 h-8 bg-gray-200 dark:bg-white/10 rounded-full" />
             <div className="w-40 h-8 bg-gray-200 dark:bg-white/10 rounded-full" />
             <div className="w-36 h-8 bg-gray-200 dark:bg-white/10 rounded-full" />
           </div>
           <div className="w-4/5 h-12 bg-gray-200 dark:bg-white/10 rounded-xl" />
           <div className="w-3/4 h-12 bg-gray-200 dark:bg-white/10 rounded-xl" />
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
        <div className="w-full max-w-6xl mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-40 rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 animate-pulse ${i === 1 ? 'md:col-span-2' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
