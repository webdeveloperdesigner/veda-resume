import { motion } from 'framer-motion';

const versions = [
  { version: 'v1.4.2', date: 'July 05, 2026', title: 'Hindi Translation: Upload & Loading' },
  { version: 'v1.4.1', date: 'July 05, 2026', title: 'Hindi Translation: Hero & Navbar' },
  { version: 'v1.4.0', date: 'July 05, 2026', title: 'Hindi Dictionary Initialization' },
  { version: 'v1.3.10', date: 'July 04, 2026', title: 'ResultView Complex String Extraction' },
  { version: 'v1.3.9', date: 'July 04, 2026', title: 'ResultView Basic Label Extraction' },
  { version: 'v1.3.8', date: 'July 04, 2026', title: 'LoadingState Message Extraction' },
  { version: 'v1.3.7', date: 'July 04, 2026', title: 'UploadZone Error & Validation Extraction' },
  { version: 'v1.3.6', date: 'July 04, 2026', title: 'UploadZone Text Extraction' },
  { version: 'v1.3.5', date: 'July 04, 2026', title: 'Navbar Navigation String Extraction' },
  { version: 'v1.3.4', date: 'July 04, 2026', title: 'Hero & Footer String Extraction' },
  { version: 'v1.3.3', date: 'July 04, 2026', title: 'English Localized Dictionary Core' },
  { version: 'v1.3.2', date: 'July 04, 2026', title: 'i18n Engine Initialization' },
  { version: 'v1.3.1', date: 'July 04, 2026', title: 'Cinematic App Boot & Loading Experience' },
  { version: 'v1.3.0', date: 'June 24, 2026', title: 'Localization Infrastructure (Phase 1)' },
  { version: 'v1.2.10', date: 'June 23, 2026', title: 'Security Patch & Deployment Hotfix' },
  { version: 'v1.2.9', date: 'June 23, 2026', title: 'Real-Time Stats Dashboard & UI Enhancements' },
  { version: 'v1.2.8', date: 'June 23, 2026', title: 'Expert ATS AI Rewrite & Security Dashboard' },
  { version: 'v1.2.7', date: 'June 23, 2026', title: 'Security Patch & Light Mode Fixes' },
  { version: 'v1.2.6', date: 'June 23, 2026', title: 'Navbar Clean Up & Code Stability' },
  { version: 'v1.2.5', date: 'June 23, 2026', title: 'Two-Step Upload Confirmation' },
  { version: 'v1.2.4', date: 'June 23, 2026', title: 'System Theme Toggle & UI Refinements' },
  { version: 'v1.2.3', date: 'June 23, 2026', title: 'Cinematic Dark Mode & System Theme Integration' },
  { version: 'v1.2.2', date: 'June 21, 2026', title: 'Mobile Navigation & Feedback Integration' },
  { version: 'v1.2.1', date: 'June 21, 2026', title: 'Navbar TypeScript Fixes' },
  { version: 'v1.2.0', date: 'June 21, 2026', title: 'Major UI/UX Overhaul & Multi-View Navigation' },
  { version: 'v1.1.2', date: 'June 21, 2026', title: 'Brand Identity & SEO Optimization' },
  { version: 'v1.1.1', date: 'June 21, 2026', title: 'Codebase Stability & Type Safety' },
  { version: 'v1.1.0', date: 'June 20, 2026', title: 'Targeted Analysis & UI Refresh' },
  { version: 'v1.0.0', date: 'June 10, 2026', title: 'The Inception of VEDA' },
];

export function VersionsView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-6 py-32"
    >
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
          Version History
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A high-level index of all VEDA platform releases. For detailed patch notes, please see the full Changelog.
        </p>
      </div>

      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500">
              <th className="p-6 font-bold">Version</th>
              <th className="p-6 font-bold">Release Date</th>
              <th className="p-6 font-bold">Highlight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/5">
            {versions.map((v, idx) => (
              <motion.tr 
                key={v.version}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-default"
              >
                <td className="p-6">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-lg text-sm font-bold group-hover:bg-emerald-500/20 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {v.version}
                  </span>
                </td>
                <td className="p-6 text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                  {v.date}
                </td>
                <td className="p-6 text-sm text-gray-800 dark:text-gray-300 font-medium">
                  {v.title}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
