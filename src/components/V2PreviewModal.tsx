import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe2, Users, FileText, Rocket } from 'lucide-react';

interface V2PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function V2PreviewModal({ isOpen, onClose }: V2PreviewModalProps) {
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
              className="w-full max-w-md bg-[#121212] border border-indigo-500/30 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.15)] pointer-events-auto relative overflow-hidden"
            >
              {/* V2 specific dynamic background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="p-6 sm:p-8 relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                      <Rocket className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">VEDA V2</h2>
                      <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mt-0.5">Coming Soon</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="group flex items-start space-x-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="bg-cyan-500/10 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform">
                      <Globe2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">Local Language Support</h3>
                      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Full localized support for Indian regional languages, breaking language barriers in recruitment.</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start space-x-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="bg-fuchsia-500/10 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4 text-fuchsia-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">Multi-Resume Profiles</h3>
                      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Manage and switch between multiple resume profiles tailored for different job roles seamlessly.</p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="bg-amber-500/10 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">Live Cover Letters</h3>
                      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Instantly generate tailored cover letters that perfectly match your newly optimized ATS resume.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 relative z-10">
                <button 
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25"
                >
                  I'm Excited!
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
