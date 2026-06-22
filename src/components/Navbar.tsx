import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, X, Star } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'changelog' | 'versions';
  onNavigate: (view: 'home' | 'changelog' | 'versions') => void;
  onOpenPopup: () => void;
}

export function Navbar({ currentView, onNavigate, onOpenPopup }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (view: 'home' | 'changelog' | 'versions') => {
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
          className="pointer-events-auto bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full px-4 py-3 flex items-center justify-between relative z-50"
        >
          {/* Left: Logo */}
          <div className="flex items-center space-x-2 pl-2">
            <div className="w-6 h-6 rounded bg-black flex items-center justify-center font-black text-white text-xs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <span className="text-base font-bold text-black tracking-tight">VEDA Resume</span>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-6">
            <button 
              onClick={() => handleNav('home')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'home' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Home
            </button>
            
            <button 
              onClick={() => handleNav('changelog')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'changelog' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Changelog
            </button>

            <button 
              onClick={() => handleNav('versions')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'versions' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Versions
            </button>

            <button 
              onClick={onOpenPopup}
              className="flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>Updates</span>
            </button>

            <a 
              href="https://survey.bodhai.pages.dev/survey/veda-resume-feedback-survey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
            >
              <span>Feedback</span>
            </a>

            <a 
              href="https://github.com/webdeveloperdesigner/veda-resume"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
              title="Give us a star if it's good!"
            >
              <Star className="w-4 h-4" />
              <span>Star Us</span>
            </a>
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleNav('home')}
              className="hidden sm:block bg-black text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-black bg-gray-100 rounded-full hover:bg-gray-200 transition-colors pointer-events-auto"
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
              className="absolute top-16 left-0 right-0 bg-white rounded-3xl shadow-xl p-4 flex flex-col space-y-2 pointer-events-auto z-40 lg:hidden border border-gray-100"
            >
              <button onClick={() => handleNav('home')} className={`p-3 rounded-xl font-semibold text-left transition-colors ${currentView === 'home' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}>Home</button>
              <button onClick={() => handleNav('changelog')} className={`p-3 rounded-xl font-semibold text-left transition-colors ${currentView === 'changelog' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}>Changelog</button>
              <button onClick={() => handleNav('versions')} className={`p-3 rounded-xl font-semibold text-left transition-colors ${currentView === 'versions' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}>Versions</button>
              
              <div className="h-px bg-gray-100 my-2" />
              
              <button onClick={() => { onOpenPopup(); setIsMobileMenuOpen(false); }} className="p-3 rounded-xl font-semibold text-left text-gray-600 hover:bg-gray-50 flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Updates</span>
              </button>
              
              <a href="https://survey.bodhai.pages.dev/survey/-OvagieJv9Z3YEl1wBbX" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl font-semibold text-left text-gray-600 hover:bg-gray-50 flex items-center space-x-2">
                <span>Feedback</span>
              </a>

              <a href="https://github.com/webdeveloperdesigner/veda-resume" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl font-semibold text-left text-gray-600 hover:bg-gray-50 flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Star us on GitHub!</span>
              </a>

              <button onClick={() => handleNav('home')} className="mt-4 p-3 rounded-xl font-bold text-center text-white bg-black hover:bg-gray-800 transition-colors sm:hidden">
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
