import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { UploadZone } from './components/UploadZone';
import { LoadingState } from './components/LoadingState';
import { ResultView } from './components/ResultView';
import { Navbar } from './components/Navbar';
import { WhatsNewPopup } from './components/WhatsNewPopup';
import { ChangelogView } from './components/ChangelogView';
import { VersionsView } from './components/VersionsView';
import { AppState, ReviewResult } from './lib/types';
import { AlertCircle, Sparkles } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'changelog' | 'versions'>('home');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProcessText = async (text: string, targetRole?: string) => {
    setAppState('loading');
    setErrorMsg(null);
    
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: text, targetRole })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to analyze resume. Please try again.';
        try {
          const responseText = await response.text();
          try {
            const errorData = JSON.parse(responseText);
            if (errorData.error) errorMessage = errorData.error;
          } catch {
            if (responseText) errorMessage = responseText;
          }
        } catch {
          // Fallback
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setResult(data);
      setAppState('result');
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error);
      setErrorMsg(error.message || 'An unexpected error occurred.');
      setAppState('error');
    }
  };

  const handleReset = () => {
    setResult(null);
    setAppState('idle');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onOpenPopup={() => setIsPopupOpen(true)} 
      />

      <WhatsNewPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        onNavigateToChangelog={() => setCurrentView('changelog')} 
      />

      {currentView === 'home' ? (
        <main className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {appState === 'idle' && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center space-y-6 mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-2">
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Powered by Gemini</span>
              </motion.div>
              <motion.a 
                href="https://bodhai.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants} 
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
              >
                <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Co-powered by BodhAI</span>
              </motion.a>
            </div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black tracking-tight hero-heading drop-shadow-lg"
            >
              AI-powered resume analysis<br />for smarter careers.
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Virtual Employability & Document Analyzer (VEDA) deeply evaluates your career profile using knowledge-driven insights. Drop your resume to uncover skill gaps, industry fit, and actionable improvements.
            </motion.p>
          </motion.div>
        )}

        {appState === 'idle' && <UploadZone onProcessText={handleProcessText} />}
        
        {appState === 'loading' && <LoadingState />}
        
        {appState === 'result' && result && (
          <ResultView data={result} onReset={handleReset} />
        )}

        {appState === 'error' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20 space-y-6"
          >
            <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold">Analysis Failed</h2>
            <p className="text-gray-600 dark:text-gray-400">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="px-8 py-3 mt-4 rounded-full font-bold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 backdrop-blur-sm transition-all active:scale-[0.98]"
            >
              Try Again
            </button>
          </motion.div>
        )}
        </main>
      ) : currentView === 'changelog' ? (
        <ChangelogView />
      ) : (
        <VersionsView />
      )}

      {/* Global Footer */}
      <footer className="w-full text-center py-8 mt-auto border-t border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-black/20">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} VEDA Resume. <a href="https://bodhai.pages.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">Co-powered by BodhAI</a>.
        </p>
      </footer>
    </div>
  );
}

export default App;
