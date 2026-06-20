import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const releases = [
  {
    version: 'v1.1.1',
    date: 'June 21, 2026',
    title: 'Codebase Stability & Type Safety',
    description: 'We have hardened the VEDA platform by strictly typing error handling and improving edge-case catches during PDF extraction and API analysis.',
    changes: [
      { type: 'bugfix', text: 'Migrated API route catch blocks to strict unknown typing for better error safety.' },
      { type: 'bugfix', text: 'Hardened pdfExtract.ts against untyped exception edge-cases.' },
      { type: 'bugfix', text: 'Cleaned up unused imports to guarantee zero-warning builds.' }
    ]
  },
  {
    version: 'v1.1.0',
    date: 'June 20, 2026',
    title: 'Targeted Analysis & UI Refresh',
    description: 'We are introducing a massive update to how VEDA grades your resume by introducing Target Role analysis, alongside a beautiful new floating navigation experience.',
    changes: [
      { type: 'feature', text: 'Added Target Role input for highly contextualized ATS grading.' },
      { type: 'feature', text: 'Introduced the "Fix It For Me" copy to clipboard functionality.' },
      { type: 'ui', text: "Revamped the Navbar with a floating island design and added What's New popup." },
      { type: 'bugfix', text: 'Added defensive payload truncation to prevent 400 errors with large PDFs.' }
    ]
  },
  {
    version: 'v1.0.0',
    date: 'June 10, 2026',
    title: 'The Inception of VEDA',
    description: 'The first version of Virtual Employability & Document Analyzer is live, powered by Google Gemini 2.5 Flash.',
    changes: [
      { type: 'feature', text: 'Initial release of VEDA Platform.' },
      { type: 'feature', text: 'Integrated Gemini 2.5 Flash for high-speed resume analysis.' },
      { type: 'ui', text: 'Cinematic dark mode UI with Framer Motion animations.' }
    ]
  }
];

const typeStyles = {
  feature: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Feature' },
  bugfix: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Fix' },
  ui: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'UI/UX' }
};

export function ChangelogView() {
  const [expandedId, setExpandedId] = useState<number>(0); // First one open by default

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-6 py-32"
    >
      <div className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
          Changelog
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
          New updates and improvements to VEDA. We are constantly shipping features to help you land your dream job.
        </p>
      </div>

      <div className="space-y-24">
        {releases.map((release, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="group"
          >
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-white text-black text-sm font-bold tracking-widest uppercase">
                {release.version}
              </span>
              <span className="text-gray-500 font-medium">{release.date}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">
              {release.title}
            </h2>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl">
              {release.description}
            </p>

            <AnimatePresence>
              {expandedId === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#121212] border border-white/5 rounded-3xl p-8 shadow-2xl transition-all hover:border-white/10 relative mt-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <ul className="space-y-5 relative z-10">
                      {release.changes.map((change, cIdx) => {
                        const style = typeStyles[change.type as keyof typeof typeStyles];
                        return (
                          <li key={cIdx} className="flex items-start space-x-4">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text} mt-0.5 flex-shrink-0`}>
                              {style.label}
                            </span>
                            <span className="text-gray-300 text-base leading-relaxed">{change.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => setExpandedId(expandedId === idx ? -1 : idx)}
              className="mt-6 flex items-center space-x-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors opacity-100 transform duration-300"
            >
              <span>{expandedId === idx ? 'Hide release notes' : 'Read full release notes'}</span>
              <motion.div animate={{ rotate: expandedId === idx ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
