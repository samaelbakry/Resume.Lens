import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Features", path: "/features" },
    { label: "Role Models", path: "/templates" },
    { label: "ATS Insights", path: "/insights" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4">
      <nav className="relative mx-auto max-w-6xl">
        <div className="flex h-17 items-center justify-between rounded-2xl border border-white/8 bg-[#080808]/80 px-3 pl-5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
          <Link to="/" className="group flex items-center gap-3">
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <Logo />

                <span className="rounded-full border border-white/10 bg-white/4 px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.15em] text-white/40">
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
                  className="group relative flex items-center gap-1.5 py-2 text-[13px]"
                >
                  <span
                    className={`
                      transition-colors duration-300
                      ${
                        active
                          ? "text-white"
                          : "text-white/40 group-hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  {index === 2 && (
                    <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  )}

                  <span
                    className={`
                      absolute -bottom-1 left-0 h-px bg-white
                      transition-all duration-300
                      ${active ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="hidden sm:block px-4 py-2 text-[13px] text-white/50 transition-colors hover:text-white"
            >
              Log in
            </Link>

            <Link
              to="/analyze"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-white px-4 py-2.5 text-[13px] font-medium text-black transition-all duration-300 hover:pr-3"
            >
              <Sparkles
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:rotate-12"
              />

              <span>Analyze</span>

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />

              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-white/2.5 blur-3xl" />
      </nav>
    </header>
  );
}
