import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { UploadZone } from './components/UploadZone';
import { LoadingState } from './components/LoadingState';
import { ResultView } from './components/ResultView';
import { AppState, ReviewResult } from './lib/types';
import { AlertCircle } from 'lucide-react';

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

  const handleProcessText = async (text: string) => {
    setAppState('loading');
    setErrorMsg(null);
    
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: text })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to analyze resume. Please try again.';
        try {
          const responseText = await response.text();
          try {
            const errorData = JSON.parse(responseText);
            if (errorData.error) errorMessage = errorData.error;
          } catch (e) {
            if (responseText) errorMessage = responseText;
          }
        } catch (e) {
          // Fallback
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setResult(data);
      setAppState('result');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected error occurred.');
      setAppState('error');
    }
  };

  const handleReset = () => {
    setResult(null);
    setAppState('idle');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans selection:bg-emerald-500/30">
      <header className="border-b border-white/5 bg-[#0C0C0C]/60 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-400 flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">V</div>
            <span className="text-xl font-bold tracking-widest uppercase">VEDA</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium tracking-wide text-gray-400 uppercase">
            <a href="#" className="hover:text-emerald-400 transition-colors">How it works</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Methodology</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {appState === 'idle' && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center space-y-6 mb-16"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black tracking-tight hero-heading drop-shadow-lg"
            >
              AI-powered resume analysis<br />for smarter careers.
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
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
            <p className="text-gray-400">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="px-8 py-3 mt-4 rounded-full font-bold text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all active:scale-[0.98]"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
