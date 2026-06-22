import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Bug, Activity, ExternalLink } from 'lucide-react';

const reports = [
  {
    internalId: 'VEDA-SEC-005',
    externalId: 'CVE-2024-45296',
    source: 'Dependabot',
    date: 'June 23, 2026',
    title: 'Path-to-RegExp Regular Expression Denial of Service (ReDoS)',
    description: 'A vulnerability in the `path-to-regexp` dependency could allow an attacker to cause a denial of service via a crafted regular expression. We have overridden the dependency with a patched version in our package manager resolutions.',
    status: 'Resolved',
    severity: 'Critical',
    impact: 'Potential for application unresponsiveness during heavy payload processing.',
    solution: 'Upgraded `path-to-regexp` to `^0.1.10` via npm overrides to prevent malicious regex evaluation.'
  },
  {
    internalId: 'VEDA-SEC-004',
    externalId: 'Internal Audit',
    source: 'VEDA Security Team',
    date: 'June 21, 2026',
    title: 'PDF Parsing Payload Truncation Limit',
    description: 'During a security audit, it was discovered that excessively large PDF documents without a character limit could cause memory bloat on edge workers. We implemented a hard truncation limit to safeguard infrastructure.',
    status: 'Resolved',
    severity: 'Medium',
    impact: 'Could lead to edge worker timeout or Out of Memory (OOM) errors.',
    solution: 'Enforced a strict 5MB file size limit and a 100,000 character extraction cutoff in `pdfExtract.ts`.'
  },
  {
    internalId: 'VEDA-SEC-003',
    externalId: 'CVE-2026-27904',
    source: 'Dependabot',
    date: 'June 20, 2026',
    title: 'Minimatch ReDoS via Nested Extglobs',
    description: 'Nested *() extglobs produce regexps with nested unbounded quantifiers, exhibiting catastrophic backtracking in V8. A 12-byte pattern against a non-matching input can stall the event loop for several seconds.',
    status: 'Resolved',
    severity: 'High',
    impact: 'Any context where an attacker can influence the glob pattern is vulnerable. Stalls the Node.js event loop leading to high availability impact.',
    solution: 'Upgraded minimatch to patched version 10.2.3 which mitigates nested extglob backtracking.'
  },
  {
    internalId: 'VEDA-SEC-002',
    externalId: 'CVE-2026-26996',
    source: 'Dependabot',
    date: 'June 20, 2026',
    title: 'Minimatch ReDoS via Repeated Wildcards',
    description: 'minimatch is vulnerable to ReDoS when a glob pattern contains many consecutive `*` wildcards followed by a literal character that does not appear in the test string. V8\'s regex engine backtracks exponentially.',
    status: 'Resolved',
    severity: 'High',
    impact: 'Any application that passes user-controlled strings to minimatch() is vulnerable to DoS. A single call could hang the application indefinitely.',
    solution: 'Upgraded minimatch to patched version 10.2.1.'
  },
  {
    internalId: 'VEDA-SEC-001',
    externalId: 'CVE-2026-27903',
    source: 'Dependabot',
    date: 'June 20, 2026',
    title: 'Minimatch ReDoS via GLOBSTAR Segments',
    description: 'matchOne() performs unbounded recursive backtracking when a glob pattern contains multiple non-adjacent ** (GLOBSTAR) segments. This can stall the Node.js event loop for tens of seconds per invocation, leading to a severe Denial of Service.',
    status: 'Resolved',
    severity: 'High',
    impact: 'High availability impact. Any application where an attacker can influence the glob pattern is vulnerable to event loop starvation.',
    solution: 'Upgraded minimatch to patched version 10.2.3 which bounds the recursive backtracking behavior.'
  }
];

const severityConfig = {
  Critical: { bg: 'bg-red-500', text: 'text-red-500', icon: ShieldAlert, border: 'border-red-500/30', glow: 'shadow-[0_0_40px_rgba(239,68,68,0.2)]' },
  High: { bg: 'bg-orange-500', text: 'text-orange-500', icon: Bug, border: 'border-orange-500/30', glow: 'shadow-[0_0_40px_rgba(249,115,22,0.2)]' },
  Medium: { bg: 'bg-amber-500', text: 'text-amber-500', icon: Activity, border: 'border-amber-500/30', glow: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]' },
  Low: { bg: 'bg-blue-500', text: 'text-blue-500', icon: ShieldCheck, border: 'border-blue-500/30', glow: 'shadow-[0_0_40px_rgba(59,130,246,0.2)]' },
};

export function SecurityReportView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-6 py-32"
    >
      <div className="mb-20 text-center sm:text-left">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 drop-shadow-xl">
          Security Center
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          Transparency is our priority. Track platform vulnerabilities, malware reports, and security advisories with our internal tracking system.
        </p>
      </div>

      <div className="space-y-16 perspective-[2000px]">
        {reports.map((report) => {
          const config = severityConfig[report.severity as keyof typeof severityConfig] || severityConfig.Medium;
          const Icon = config.icon;

          return (
            <motion.div 
              key={report.internalId}
              initial={{ opacity: 0, rotateX: 20, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02, z: 20 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative group"
            >
              {/* 3D Background Layer */}
              <div 
                className={`absolute inset-0 bg-white dark:bg-[#121212] rounded-[2rem] border ${config.border} shadow-2xl transition-all duration-500 group-hover:${config.glow} -z-10`}
                style={{ transform: 'translateZ(-20px)' }}
              />
              
              <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-xl overflow-hidden relative">
                
                {/* Decorative Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 ${config.bg} opacity-10 blur-[80px] pointer-events-none`} style={{ transform: 'translateZ(10px)' }} />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                  
                  {/* Left Side: Header & Meta */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-black tracking-widest uppercase shadow-md">
                        {report.internalId}
                      </span>
                      <span className="px-3 py-1 rounded-full border border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-semibold flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5" />
                        {report.externalId}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                        {report.date}
                      </span>
                    </div>

                    <h2 className={`text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:${config.text} transition-colors`}>
                      {report.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">
                      {report.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-inner">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Impact</h4>
                        <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">{report.impact}</p>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-500/10 shadow-inner">
                        <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider mb-2">Resolution</h4>
                        <p className="text-sm text-gray-800 dark:text-gray-300 font-medium">{report.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Status Badge */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${config.border} bg-white dark:bg-[#121212] shadow-lg`}>
                      <Icon className={`w-5 h-5 ${config.text}`} />
                      <span className={`font-bold ${config.text}`}>{report.severity}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-bold border border-transparent dark:border-white/5 shadow-md">
                      <div className={`w-2.5 h-2.5 rounded-full ${report.status === 'Resolved' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                      {report.status}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
