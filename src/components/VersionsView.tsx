import { motion } from 'framer-motion';

const versions = [
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
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          Version History
        </h1>
        <p className="text-lg text-gray-400">
          A high-level index of all VEDA platform releases. For detailed patch notes, please see the full Changelog.
        </p>
      </div>

      <div className="bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
              <th className="p-6 font-bold">Version</th>
              <th className="p-6 font-bold">Release Date</th>
              <th className="p-6 font-bold">Highlight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {versions.map((v, idx) => (
              <motion.tr 
                key={v.version}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-white/5 transition-colors group cursor-default"
              >
                <td className="p-6">
                  <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm font-bold group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                    {v.version}
                  </span>
                </td>
                <td className="p-6 text-sm text-gray-400 font-medium whitespace-nowrap">
                  {v.date}
                </td>
                <td className="p-6 text-sm text-gray-300 font-medium">
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
