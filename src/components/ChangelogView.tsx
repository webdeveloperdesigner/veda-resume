import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const releases = [
  {
    version: 'v1.3.8',
    date: 'July 04, 2026',
    title: 'LoadingState Message Extraction',
    description: 'We extracted the dynamic, rotating status messages from the LoadingState component into our language dictionary, ensuring the entire cinematic boot sequence can be translated.',
    changes: [
      { type: 'feature', text: 'Extracted all rotating loading messages (e.g., EXTRACTING DOCUMENT LAYOUT...) into en.json.' },
      { type: 'feature', text: 'Replaced hardcoded English text in LoadingState.tsx with dynamic useTranslation hooks.' }
    ]
  },
  {
    version: 'v1.3.7',
    date: 'July 04, 2026',
    title: 'UploadZone Error & Validation Extraction',
    description: 'We finalized the localization of the UploadZone component by extracting all error states, validation text, and warning messages into our language dictionary.',
    changes: [
      { type: 'feature', text: 'Extracted PDF validation errors, character length warnings, and missing file states into en.json.' },
      { type: 'feature', text: 'Replaced hardcoded English error text in UploadZone.tsx with dynamic useTranslation hooks.' }
    ]
  },
  {
    version: 'v1.3.6',
    date: 'July 04, 2026',
    title: 'UploadZone Text Extraction',
    description: 'We continued the UI text extraction process by completely localizing the file drop instructions, tabs, and action buttons in the UploadZone component.',
    changes: [
      { type: 'feature', text: 'Extracted UploadZone tabs, file drop instructions, and character count templates into en.json.' },
      { type: 'feature', text: 'Replaced hardcoded English text in UploadZone.tsx with dynamic useTranslation hooks.' }
    ]
  },
  {
    version: 'v1.3.5',
    date: 'July 04, 2026',
    title: 'Navbar Navigation String Extraction',
    description: 'We continued the UI text extraction process by completely localizing the navigation bar, ensuring smooth translation of all links, tooltips, and mobile menus.',
    changes: [
      { type: 'feature', text: 'Extracted Navbar links, tooltips, and action buttons into en.json.' },
      { type: 'feature', text: 'Replaced hardcoded English text in Navbar.tsx with dynamic useTranslation hooks.' }
    ]
  },
  {
    version: 'v1.3.4',
    date: 'July 04, 2026',
    title: 'Hero & Footer String Extraction',
    description: 'We have begun the massive UI text extraction process, successfully migrating the main App.tsx Hero and Footer strings into our i18next translation dictionary.',
    changes: [
      { type: 'feature', text: 'Extracted Hero titles, subtitles, and badges into en.json.' },
      { type: 'feature', text: 'Replaced hardcoded English text in App.tsx with dynamic useTranslation hooks.' }
    ]
  },
  {
    version: 'v1.3.3',
    date: 'July 04, 2026',
    title: 'English Localized Dictionary Core',
    description: 'We have established the core translation dictionary file for English, laying the foundation for all future regional Indian languages.',
    changes: [
      { type: 'feature', text: 'Created the initial en.json dictionary in src/locales/en.json.' },
      { type: 'feature', text: 'Wired up the English dictionary to the central i18next configuration.' }
    ]
  },
  {
    version: 'v1.3.2',
    date: 'July 04, 2026',
    title: 'i18n Engine Initialization',
    description: 'We have configured the core i18next engine and initialized it within the React component tree.',
    changes: [
      { type: 'feature', text: 'Created the central i18n.ts configuration to handle browser language detection.' },
      { type: 'feature', text: 'Integrated the i18next instance globally inside main.tsx.' }
    ]
  },
  {
    version: 'v1.3.1',
    date: 'July 04, 2026',
    title: 'Cinematic App Boot & Loading Experience',
    description: 'We have completely transformed the initial app load and resume parsing states with high-fidelity, cinematic animations and background skeleton layouts.',
    changes: [
      { type: 'feature', text: 'Added InitialSplash screen with a 15-second YouTube-style skeleton boot-up sequence.' },
      { type: 'feature', text: 'Overhauled LoadingState with a dynamic, synchronized horizontal progress bar and cinematic circular spinner.' },
      { type: 'improvement', text: 'Prevented layout shifts during analysis by introducing underlying exact-height skeleton placeholders.' }
    ]
  },
  {
    version: 'v1.3.0',
    date: 'June 24, 2026',
    title: 'Localization Infrastructure (Phase 1)',
    description: 'We have taken the first step towards VEDA Resume Global (India Edition) by installing the core internationalization framework (i18next).',
    changes: [
      { type: 'feature', text: 'Installed i18next, react-i18next, and i18next-browser-languagedetector.' }
    ]
  },
  {
    version: 'v1.2.10',
    date: 'June 23, 2026',
    title: 'Security Patch & Deployment Hotfix',
    description: 'We have resolved a critical Vite vulnerability and fixed a strict TypeScript compilation error to restore our Vercel deployment pipeline.',
    changes: [
      { type: 'bugfix', text: 'Cleaned up orphaned lucide-react imports in App.tsx to resolve TS6133 build failures on Vercel.' },
      { type: 'bugfix', text: 'Upgraded Vite to v6.4.3 to resolve CVE-2026-53571 (server.fs.deny bypass on Windows).' },
      { type: 'ui', text: 'Updated the Security Center dashboard to mark VEDA-SEC-006 as fully resolved.' }
    ]
  },
  {
    version: 'v1.2.9',
    date: 'June 23, 2026',
    title: 'Real-Time Stats Dashboard & UI Enhancements',
    description: 'We have introduced a dynamic statistics dashboard that showcases real-time metrics during your resume analysis, alongside crucial UI/UX refinements across the platform.',
    changes: [
      { type: 'feature', text: 'Added a real-time Stats Dashboard (Bento UI) to track API response time, rewritten bullets, and scored categories dynamically.' },
      { type: 'ui', text: 'Enhanced the global footer with a premium, highlighted privacy badge to reinforce our zero-storage policy.' },
      { type: 'bugfix', text: 'Resolved a CSS rendering bug in the loading spinner to ensure perfect visibility in both light and dark modes.' }
    ]
  },
  {
    version: 'v1.2.8',
    date: 'June 23, 2026',
    title: 'Expert ATS AI Rewrite & Security Dashboard',
    description: 'We have completely overhauled the Gemini API integration to act as a 15+ year expert ATS recruiter. Additionally, we introduced a transparent Security Center and improved the user feedback flow.',
    changes: [
      { type: 'feature', text: 'Lowered Gemini model temperature to 0.0 for highly deterministic, repeatable scoring.' },
      { type: 'feature', text: 'Expanded JSON schema to return a fully optimized ATS resume rewrite and list of missing keywords.' },
      { type: 'feature', text: 'Added a dedicated Security Center to track internal and external vulnerabilities (like CVE-2024-45296).' },
      { type: 'ui', text: 'Redesigned ResultView to display Before & After scores and a Markdown container for the copied resume.' },
      { type: 'ui', text: 'Integrated a Feedback Modal before allowing users to reset the analysis state.' }
    ]
  },
  {
    version: 'v1.2.7',
    date: 'June 23, 2026',
    title: 'Security Patch & Light Mode Fixes',
    description: 'We have resolved a high-severity vulnerability reported by Dependabot and completed the light mode UI implementation across all remaining views.',
    changes: [
      { type: 'bugfix', text: 'Resolved CVE-2024-45296 (ReDoS) by overriding path-to-regexp to a patched version.' },
      { type: 'ui', text: 'Implemented full light mode support for the Changelog, Versions, and Updates views.' },
      { type: 'ui', text: 'Ensured all typography and containers dynamically respond to the system theme toggle.' }
    ]
  },
  {
    version: 'v1.2.6',
    date: 'June 23, 2026',
    title: 'Navbar Clean Up & Code Stability',
    description: 'We have optimized the Navbar by removing redundant calls to action and refining the theme toggle layout. We also resolved a TypeScript build error to ensure platform stability.',
    changes: [
      { type: 'ui', text: 'Removed redundant "Get Started" CTAs from desktop and mobile navigation.' },
      { type: 'ui', text: 'Refined the size and hover states of the dark mode toggle.' },
      { type: 'bugfix', text: 'Fixed a TypeScript build error related to unused icon imports.' }
    ]
  },
  {
    version: 'v1.2.5',
    date: 'June 23, 2026',
    title: 'Two-Step Upload Confirmation',
    description: 'We have overhauled the Upload Zone to require an explicit confirmation step before AI analysis begins. This prevents accidental submissions and ensures you have uploaded the correct document.',
    changes: [
      { type: 'feature', text: 'Implemented a two-step confirmation flow for resume uploads and text pasting.' },
      { type: 'ui', text: 'Added a dedicated "Review My Resume" premium gradient button.' },
      { type: 'ui', text: 'Redesigned the Upload Zone active state to display the file name and character count securely.' }
    ]
  },
  {
    version: 'v1.2.4',
    date: 'June 23, 2026',
    title: 'System Theme Toggle & UI Refinements',
    description: 'We have introduced a dedicated theme toggle button to switch seamlessly between light and dark modes, along with global CSS refinements to ensure perfect readability across all themes.',
    changes: [
      { type: 'feature', text: 'Added a sun/moon toggle icon in the Navbar for manual theme control.' },
      { type: 'ui', text: 'Refined global text and background colors to fully support light mode.' }
    ]
  },
  {
    version: 'v1.2.3',
    date: 'June 23, 2026',
    title: 'Cinematic Dark Mode & System Theme Integration',
    description: 'We have completely redesigned the VEDA platform to feature a stunning, pure-black cinematic dark mode. This update includes dynamic background glows, an engineered CSS grid pattern, and automated system theme detection to provide an unparalleled premium user experience.',
    changes: [
      { type: 'ui', text: 'Implemented pure-black background design with dynamic CSS grid overlays.' },
      { type: 'feature', text: 'Added automated system theme detection and intelligent Tailwind dark mode toggling.' },
      { type: 'ui', text: 'Redesigned the Upload Zone with premium dashed borders, circular icon containers, and interactive glow states.' },
      { type: 'ui', text: 'Optimized Navbar layout and updated feedback survey links.' }
    ]
  },
  {
    version: 'v1.2.2',
    date: 'June 21, 2026',
    title: 'Mobile Navigation & Feedback Integration',
    description: 'We have made VEDA fully accessible on the go with a brand new responsive mobile navigation menu, and integrated direct feedback channels so you can help shape our roadmap.',
    changes: [
      { type: 'feature', text: 'Implemented a responsive dropdown Hamburger menu for seamless mobile and tablet navigation.' },
      { type: 'feature', text: 'Added a direct Feedback survey link to the Navbar to gather feature requests and bug reports.' },
      { type: 'ui', text: 'Added a "Star on GitHub" CTA button to the Navbar.' }
    ]
  },
  {
    version: 'v1.2.1',
    date: 'June 21, 2026',
    title: 'Navbar TypeScript Fixes',
    description: 'A quick hotfix to ensure proper TypeScript compilation after the introduction of the Versions view.',
    changes: [
      { type: 'bugfix', text: 'Updated NavbarProps interface to accept the new "versions" view state.' }
    ]
  },
  {
    version: 'v1.2.0',
    date: 'June 21, 2026',
    title: 'Major UI/UX Overhaul & Multi-View Navigation',
    description: 'We have transformed VEDA from a single-page application into a robust multi-view platform. This release introduces a floating navigation system, a dedicated version index, and a beautiful new Updates modal.',
    changes: [
      { type: 'feature', text: 'Implemented a multi-view routing system seamlessly switching between Home, Changelog, and Versions.' },
      { type: 'ui', text: 'Redesigned the Navbar into a modern, pill-shaped floating island.' },
      { type: 'ui', text: 'Transformed the Updates popup into a highly premium animated modal with hover effects.' },
      { type: 'feature', text: 'Introduced a brand new, dedicated Versions Index page for high-level release tracking.' }
    ]
  },
  {
    version: 'v1.1.2',
    date: 'June 21, 2026',
    title: 'Brand Identity & SEO Optimization',
    description: 'We have updated the VEDA brand identity with a new favicon, optimized SEO metadata for better discoverability, and added a shiny new "Powered by Gemini" badge.',
    changes: [
      { type: 'ui', text: 'Added "Powered by Gemini" branding to the home page.' },
      { type: 'ui', text: 'Updated the site favicon to the official VEDA logo.' },
      { type: 'ui', text: 'Optimized HTML meta tags and Open Graph data for seamless social sharing.' }
    ]
  },
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
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-6">
          Changelog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
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
              <span className="px-3 py-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold tracking-widest uppercase">
                {release.version}
              </span>
              <span className="text-gray-500 font-medium">{release.date}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              {release.title}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
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
                  <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-2xl transition-all hover:border-gray-300 dark:hover:border-white/10 relative mt-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <ul className="space-y-5 relative z-10">
                      {release.changes.map((change, cIdx) => {
                        const style = typeStyles[change.type as keyof typeof typeStyles];
                        return (
                          <li key={cIdx} className="flex items-start space-x-4">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text} mt-0.5 flex-shrink-0`}>
                              {style.label}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{change.text}</span>
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
              className="mt-6 flex items-center space-x-2 text-emerald-500 dark:text-emerald-400 font-semibold hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors opacity-100 transform duration-300"
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
