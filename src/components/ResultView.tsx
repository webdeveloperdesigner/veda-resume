import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Briefcase, TrendingUp, Target } from 'lucide-react';
import { ReviewResult } from '../lib/types';
import { FeedbackModal } from './FeedbackModal';
import { StatsBento } from './StatsBento';

interface ResultViewProps {
  data: ReviewResult;
  onReset: () => void;
  analysisTime: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-bold text-gray-900 dark:text-gray-200">{value}%</span>
    </div>
    <div className="w-full h-2.5 bg-gray-200 dark:bg-black/40 rounded-full overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
      />
    </div>
  </div>
);

const getScoreLabel = (score: number) => {
  if (score >= 90) return { label: 'Exceptional', color: 'text-emerald-400', glow: 'drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]' };
  if (score >= 75) return { label: 'Strong', color: 'text-teal-400', glow: 'drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]' };
  if (score >= 60) return { label: 'Needs Polish', color: 'text-yellow-400', glow: 'drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]' };
  return { label: 'Requires Overhaul', color: 'text-red-400', glow: 'drop-shadow-[0_0_20px_rgba(248,113,113,0.3)]' };
};

export function ResultView({ data, onReset, analysisTime }: ResultViewProps) {
  const scoreMeta = getScoreLabel(data.overallScore);
  const [displayScore, setDisplayScore] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    let current = 0;
    const increment = data.overallScore / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= data.overallScore) {
        setDisplayScore(data.overallScore);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [data.overallScore]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto space-y-12 pb-20"
    >
      <motion.div variants={itemVariants} className="text-center space-y-8">
        <h2 className="text-lg font-bold tracking-[0.2em] uppercase text-gray-500">ATS Score Analysis</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Current Score</span>
            <div className="text-6xl md:text-8xl font-black leading-none text-gray-300 dark:text-gray-700">
              {displayScore}
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-center justify-center">
            <svg className="w-12 h-12 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">Optimized Score</span>
            <div className="text-[clamp(5rem,15vw,10rem)] font-black leading-none text-score-gradient drop-shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              {data.improvedScore || data.overallScore + 20 /* Fallback if not returned */}
            </div>
          </div>
        </div>

        <p className={`text-2xl font-semibold tracking-wide uppercase ${scoreMeta.color} ${scoreMeta.glow}`}>
          {scoreMeta.label}
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">{data.summary}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[50px] pointer-events-none" />
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 relative z-10">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <span>Metrics Breakdown</span>
          </h3>
          <div className="relative z-10">
            <ProgressBar label="Clarity" value={data.categoryScores.clarity} />
            <ProgressBar label="Impact" value={data.categoryScores.impact} />
            <ProgressBar label="ATS Compatibility" value={data.categoryScores.atsCompatibility} />
            <ProgressBar label="Structure" value={data.categoryScores.structure} />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 space-y-8 shadow-xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[50px] pointer-events-none" />
          <div className="relative z-10">
            {data.industryFit && (
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center space-x-2 text-blue-400">
                  <Briefcase className="w-6 h-6" />
                  <span>Industry Fit</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-200 dark:border-white/5">{data.industryFit}</p>
              </div>
            )}
            {data.skillGap && data.skillGap.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
                <h3 className="text-sm font-bold mb-4 text-indigo-400 tracking-wider uppercase flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Potential Skill Gaps</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.skillGap.map((skill, i) => (
                    <div key={i} className="group flex items-center space-x-2 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 group-hover:bg-indigo-400 transition-all duration-300" />
                      <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200/80 group-hover:text-indigo-950 dark:group-hover:text-indigo-200 transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {data.missingKeywords && data.missingKeywords.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
                <h3 className="text-sm font-bold mb-4 text-purple-500 tracking-wider uppercase flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Missing ATS Keywords</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-md text-sm font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-green-50 dark:bg-green-500/5 backdrop-blur-md border border-green-200 dark:border-green-500/20 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-green-400">
            <CheckCircle2 className="w-6 h-6" />
            <span>Key Strengths</span>
          </h3>
          <ul className="space-y-4">
            {data.strengths.map((str, i) => (
              <li key={i} className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 flex-shrink-0 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-amber-50 dark:bg-amber-500/5 backdrop-blur-md border border-amber-200 dark:border-amber-500/20 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center space-x-2 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
            <span>Critical Weaknesses</span>
          </h3>
          <ul className="space-y-4">
            {data.weaknesses.map((wk, i) => (
              <li key={i} className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 flex-shrink-0 shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                <span className="leading-relaxed">{wk}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-teal-400">Smart Rewrites</span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Before and after comparisons to maximize impact.</p>
        <div className="space-y-6">
          {data.rewrites.map((rw, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3 opacity-80">Original</h4>
                  <p className="text-gray-500 dark:text-gray-400/80 line-through decoration-amber-500/30 leading-relaxed">{rw.original}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">Suggested</h4>
                  <div className="relative group">
                    <p className="text-gray-800 dark:text-gray-100 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 p-4 rounded-xl leading-relaxed shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                      {rw.suggested}
                    </p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(rw.suggested)}
                      className="absolute top-2 right-2 p-2 bg-emerald-500/20 rounded-lg text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-500/40"
                      title="Copy to clipboard"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-gray-200 dark:border-white/10">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"><strong className="text-gray-800 dark:text-gray-300 tracking-wide">WHY: </strong>{rw.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-emerald-500">Fully Optimized ATS Resume</span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Copy and paste this expert-level rewrite into your word processor. It has been optimized for ATS parsers.</p>
        
        {data.summaryOfChanges && (
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 p-6 rounded-2xl mb-6">
            <h4 className="text-sm font-bold tracking-widest uppercase text-blue-500 mb-2">Summary of Changes</h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.summaryOfChanges}</p>
          </div>
        )}

        <div className="relative group">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed relative z-10">
              {data.fullyOptimizedResume || "No optimized resume provided by the AI. Please try again."}
            </pre>
          </div>
          
          <button 
            onClick={() => {
              if (data.fullyOptimizedResume) {
                navigator.clipboard.writeText(data.fullyOptimizedResume);
              }
            }}
            className="absolute top-4 right-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all font-bold text-sm flex items-center space-x-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy Resume</span>
          </button>
        </div>
      </motion.div>

      <div className="pt-8">
        <StatsBento 
          categoriesCount={Object.keys(data.categoryScores).length} 
          rewritesCount={data.rewrites.length} 
          responseTime={`${analysisTime}s`} 
        />
      </div>

      <motion.div variants={itemVariants} className="text-center pt-8">
        <button
          onClick={() => {
            const hasGivenFeedback = localStorage.getItem('veda_feedback_given') === 'true';
            if (hasGivenFeedback) {
              onReset();
            } else {
              setShowFeedbackModal(true);
            }
          }}
          className="px-10 py-4 rounded-full font-bold text-gray-700 dark:text-white bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/20 backdrop-blur-md transition-all active:scale-[0.98] shadow-xl"
        >
          Analyze Another Resume
        </button>
      </motion.div>

      <FeedbackModal 
        isOpen={showFeedbackModal} 
        onComplete={() => {
          setShowFeedbackModal(false);
          onReset();
        }} 
      />
    </motion.div>
  );
}
