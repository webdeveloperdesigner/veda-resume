import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'changelog';
  onNavigate: (view: 'home' | 'changelog') => void;
  onOpenPopup: () => void;
}

export function Navbar({ currentView, onNavigate, onOpenPopup }: NavbarProps) {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="pointer-events-auto bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full px-4 py-3 flex items-center justify-between w-full max-w-4xl"
      >
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 pl-2">
          <div className="w-6 h-6 rounded bg-black flex items-center justify-center font-black text-white text-xs">
            {/* Simple lightning bolt or V logo */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <span className="text-base font-bold text-black tracking-tight">VEDA Resume</span>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-sm font-semibold transition-colors ${
              currentView === 'home' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            Home
          </button>
          
          <button 
            onClick={() => onNavigate('changelog')}
            className={`text-sm font-semibold transition-colors ${
              currentView === 'changelog' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            Changelog
          </button>

          <button 
            onClick={onOpenPopup}
            className="flex items-center space-x-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span>Updates</span>
          </button>
        </div>

        {/* Right: CTA Button */}
        <div className="flex items-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
