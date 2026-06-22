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
              className="w-full max-w-md bg-[#121212] border border-emerald-500/30 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] pointer-events-auto relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="p-6 sm:p-8 relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">Updates</h2>
                      <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mt-0.5">v1.2.6 Release</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="group flex items-start space-x-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="bg-amber-500/10 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">Navbar Optimization</h3>
                      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">The Navbar has been decluttered by removing redundant elements, ensuring a cleaner focus on core actions.</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start space-x-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="bg-blue-500/10 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">Theme Toggle Refinements</h3>
                      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">The dark mode toggle has been increased in size and given smoother hover states for better usability.</p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="bg-purple-500/10 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">Codebase Stability</h3>
                      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Resolved underlying build warnings and improved code cleanliness.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 relative z-10">
                <button 
                  onClick={onClose}
                  className="w-full py-3.5 mb-3 rounded-xl font-bold text-[#121212] bg-white hover:bg-gray-200 transition-colors shadow-lg"
                >
                  Mark as Read
                </button>
                <button 
                  onClick={() => {
                    onNavigateToChangelog();
                    onClose();
                  }}
                  className="w-full py-3.5 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm border border-transparent"
                >
                  View Full Changelog
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
