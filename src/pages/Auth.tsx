import { LogIn, LogOut, Sparkles } from "lucide-react";
import { usePuterStore } from "../lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/");
  }, [auth.isAuthenticated]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 text-slate-900">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-[130px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-xs">
            <Sparkles size={13} className="text-blue-600" strokeWidth={1.8} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500">
              Welcome Back
            </span>
          </div>

          <h2 className="text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
            Hello, Welcome!
          </h2>
          <p className="mt-3 text-sm font-normal text-slate-600">
            Sign in to access your resume intelligence dashboard and
            personalized ATS scores.
          </p>
          {isLoading ? (
            <button className="group mt-8 flex w-full items-center animate-pulse justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-slate-800 hover:shadow-lg">
              <span>signing you in...</span>
            </button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <button
                  onClick={auth.signOut}
                  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-slate-800 hover:shadow-lg"
                >
                  <LogOut size={16} />
                  <span>log out</span>
                </button>
              ) : (
                <button
                  onClick={auth.signIn}
                  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-slate-800 hover:shadow-lg"
                >
                  <LogIn size={16} />
                  <span>log in</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
