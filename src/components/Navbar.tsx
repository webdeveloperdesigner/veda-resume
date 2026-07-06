import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, X, Star, Sun, Moon } from 'lucide-react';
const IndiaFlag = () => (
  <svg viewBox="0 0 64 64" className="w-4 h-4 rounded-sm flex-shrink-0 shadow-sm" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="21.33" fill="#FF9933" />
    <rect y="21.33" width="64" height="21.33" fill="#FFFFFF" />
    <rect y="42.66" width="64" height="21.33" fill="#138808" />
    <circle cx="32" cy="32" r="7" fill="#000080" />
    <circle cx="32" cy="32" r="5" fill="#FFFFFF" />
    <circle cx="32" cy="32" r="3" fill="#000080" />
  </svg>
);

interface NavbarProps {
  currentView: 'home' | 'changelog' | 'versions' | 'security';
  onNavigate: (view: 'home' | 'changelog' | 'versions' | 'security') => void;
  onOpenPopup: () => void;
}

export function Navbar({ currentView, onNavigate, onOpenPopup }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const handleNav = (view: 'home' | 'changelog' | 'versions' | 'security') => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-4xl relative">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 dark:border-white/10 rounded-full px-4 py-3 flex items-center justify-between relative z-50"
        >
          {/* Left: Logo */}
          <div className="flex items-center space-x-2 pl-2">
            <div className="w-6 h-6 rounded bg-gray-900 dark:bg-white flex items-center justify-center font-black text-white dark:text-black text-xs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight">VEDA Resume</span>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-6">
            <button 
              onClick={() => handleNav('home')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'home' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.home')}
            </button>
            
            <button 
              onClick={() => handleNav('changelog')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'changelog' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.changelog')}
            </button>

            <button 
              onClick={() => handleNav('versions')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'versions' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.versions')}
            </button>

            <button 
              onClick={() => handleNav('security')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'security' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.security')}
            </button>

            <button 
              onClick={onOpenPopup}
              className="flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>{t('nav.updates')}</span>
            </button>

            <a 
              href="https://survey.bodhai.pages.dev/survey/veda-resume-feedback-survey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span>{t('nav.feedback')}</span>
            </a>

            <a 
              href="https://github.com/webdeveloperdesigner/veda-resume"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              title={t('nav.star_title')}
            >
              <Star className="w-4 h-4" />
              <span>{t('nav.star')}</span>
            </a>
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full transition-colors flex items-center justify-center pointer-events-auto space-x-1.5"
              >
                <IndiaFlag />
                <span>{i18n.resolvedLanguage === 'hi' ? 'HI' : 'EN'}</span>
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50 pointer-events-auto"
                  >
                    <button
                      onClick={() => { i18n.changeLanguage('en'); setIsLangDropdownOpen(false); }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold transition-colors ${i18n.resolvedLanguage === 'en' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                    >
                      <IndiaFlag />
                      <span>English</span>
                    </button>
                    <button
                      onClick={() => { i18n.changeLanguage('hi'); setIsLangDropdownOpen(false); }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold transition-colors ${i18n.resolvedLanguage === 'hi' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                    >
                      <IndiaFlag />
                      <span>हिंदी (Hindi)</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full transition-colors flex items-center justify-center pointer-events-auto"
              title={t('nav.toggle_theme')}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-colors pointer-events-auto"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl p-4 flex flex-col space-y-2 pointer-events-auto z-40 lg:hidden border border-gray-100 dark:border-white/10"
            >
              <button onClick={() => handleNav('home')} className={`p-3 rounded-xl font-semibold text-left transition-colors ${currentView === 'home' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>{t('nav.home')}</button>
              <button onClick={() => handleNav('changelog')} className={`p-3 rounded-xl font-semibold text-left transition-colors ${currentView === 'changelog' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>{t('nav.changelog')}</button>
              <button onClick={() => handleNav('versions')} className={`p-3 rounded-xl font-semibold text-left transition-colors ${currentView === 'versions' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>{t('nav.versions')}</button>
              <button onClick={() => handleNav('security')} className={`p-3 rounded-xl font-semibold text-left transition-colors ${currentView === 'security' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>{t('nav.security')}</button>
              
              <div className="h-px bg-gray-100 dark:bg-white/10 my-2" />
              
              <button onClick={() => { onOpenPopup(); setIsMobileMenuOpen(false); }} className="p-3 rounded-xl font-semibold text-left text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>{t('nav.updates')}</span>
              </button>
              
              <a href="https://survey.bodhai.pages.dev/survey/veda-resume-feedback-survey" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl font-semibold text-left text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center space-x-2">
                <span>{t('nav.feedback')}</span>
              </a>

              <a href="https://github.com/webdeveloperdesigner/veda-resume" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl font-semibold text-left text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>{t('nav.star_github')}</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
