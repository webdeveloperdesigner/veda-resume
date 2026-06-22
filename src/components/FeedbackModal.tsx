import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function FeedbackModal({ isOpen, onComplete }: FeedbackModalProps) {
  const handleSurveyClick = () => {
    // Open survey in new tab
    window.open('https://survey.bodhai.pages.dev/survey/veda-resume-feedback-survey', '_blank');
    
    // Save completion state to browser
    localStorage.setItem('veda_feedback_given', 'true');
    
    // Close modal and proceed to reset app
    onComplete();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
          >
            {/* Decorative Ambient Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                Help Us Improve VEDA
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Before analyzing your next resume, please take <strong className="text-emerald-500 font-bold">30 seconds</strong> to share your experience. Your feedback shapes the future of BodhAI!
              </p>

              <button 
                onClick={handleSurveyClick}
                className="w-full flex items-center justify-center space-x-3 bg-gray-900 dark:bg-white text-white dark:text-black py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-[0.98] shadow-xl hover:shadow-2xl"
              >
                <span>Open Survey & Continue</span>
                <ExternalLink className="w-5 h-5 opacity-70" />
              </button>
              
              <p className="mt-6 text-xs text-gray-400 font-medium tracking-wide uppercase">
                Opens securely via BodhAI Forms
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
