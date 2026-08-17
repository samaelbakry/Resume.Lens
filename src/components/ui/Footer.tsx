import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-10 px-6 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
           <Logo/>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          <div className="inline-flex items-center gap-2 text-xs text-white/50 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Improve your ATS match score before you apply</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs text-gray-400">
          <Link to="/privacy" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors duration-200">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors duration-200">
            Contact
          </Link>
        </div>

      </div>
    </footer>
  );
}