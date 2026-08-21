import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { usePuterStore } from "../../lib/puter";

export default function Navbar() {
  const { auth } = usePuterStore();

  const navItems = [
    { label: "Features", path: "/features" },
    { label: "Role Models", path: "/templates" },
    { label: "ATS Insights", path: "/insights" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4">
      <nav className="relative mx-auto max-w-6xl">
        <div className="flex h-17 items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-3 pl-5 shadow-lg shadow-slate-900/5 backdrop-blur-2xl">
          <Link to="/" className="group flex items-center gap-3">
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <Logo />

                <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.15em] text-slate-500">
                  AI
                </span>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-7 ml-10">
            {navItems.map((item, index) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative flex items-center gap-1.5 py-2 text-[13px] font-medium"
                >
                  <span
                    className={`
                      transition-colors duration-300
                      ${
                        active
                          ? "text-slate-950"
                          : "text-slate-500 group-hover:text-slate-900"
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  {index === 2 && (
                    <span className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  )}

                  <span
                    className={`
                      absolute -bottom-1 left-0 h-px bg-slate-950
                      transition-all duration-300
                      ${active ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {auth.isAuthenticated ? 
            <button
              onClick={auth.signOut}
              className="hidden sm:block px-4 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              Log out
            </button> : <Link
              to="/auth"
              className="hidden sm:block px-4 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              Log in
            </Link>}
            

            <Link
              to="/upload"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-medium text-white shadow-md transition-all duration-300 hover:bg-slate-800 hover:shadow-lg"
            >
              <Sparkles
                size={14}
                strokeWidth={1.8}
                className="text-blue-400 transition-transform duration-300 group-hover:rotate-12"
              />

              <span>Upload</span>

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />

              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </nav>
    </header>
  );
}