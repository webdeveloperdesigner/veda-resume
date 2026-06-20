import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface WhatsNewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToChangelog: () => void;
}

export function WhatsNewPopup({ isOpen, onClose, onNavigateToChangelog }: WhatsNewPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#121212] border border-emerald-500/30 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden pointer-events-auto relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl">
                      <Sparkles className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white leading-tight">What's New</h2>
                      <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">v1.1.1 Release</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Zap className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-200">Target Role Analysis</h3>
                      <p className="text-sm text-gray-400 mt-1">Specify your target role before uploading to get highly contextualized ATS feedback.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <ShieldCheck className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-200">Robust Parsing</h3>
                      <p className="text-sm text-gray-400 mt-1">We've upgraded our engine to gracefully handle massive PDFs without timing out.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Sparkles className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-200">Fix It For Me</h3>
                      <p className="text-sm text-gray-400 mt-1">Hover over any Smart Rewrite suggestion to instantly copy it to your clipboard.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col space-y-3">
                  <button 
                    onClick={onClose}
                    className="w-full py-3 rounded-full font-bold text-[#121212] bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                  >
                    Awesome, let's go!
                  </button>
                  <button 
                    onClick={() => {
                      onNavigateToChangelog();
                      onClose();
                    }}
                    className="w-full py-3 rounded-full font-bold text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Read full changelog
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
