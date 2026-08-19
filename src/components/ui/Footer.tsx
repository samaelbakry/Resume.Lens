import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-10 px-6 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <Logo />
          </div>

          <span className="hidden sm:inline text-slate-300">|</span>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>Improve your ATS match score before you apply</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs text-slate-500 font-medium">
          <Link
            to="/privacy"
            className="hover:text-slate-900 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-slate-900 transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <Link
            to="/contact"
            className="hover:text-slate-900 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
