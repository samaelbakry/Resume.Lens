import { ArrowUpRight, ScanSearch, Sparkles } from "lucide-react";
import { resumes } from "../../constants";
import ResumeCard from "../resume/ResumeCard";
import { usePuterStore } from "../../lib/puter";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Hero() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth");
  }, [auth.isAuthenticated]);

  return (
    <section className="pt-10">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <div className="mb-7 flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 shadow-xs backdrop-blur-md">
          <Sparkles size={13} className="text-blue-600" strokeWidth={1.8} />

          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500">
            AI Resume Intelligence
          </span>

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        </div>

        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mx-auto max-w-4xl text-[3.25rem] font-medium leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem]">
            <span className="block">Your resume.</span>

            <span className="mt-2 block bg-linear-to-r from-slate-900 via-slate-700 to-slate-400 bg-clip-text text-transparent">
              Under the microscope.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-155 px-4 text-[14px] font-normal leading-7 tracking-wide text-slate-600 sm:text-[15px] md:text-base">
            Analyze your resume against real job requirements, discover missing
            skills, improve your ATS score, and get actionable feedback in
            seconds.
          </p>
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link to={"/upload"} className="group flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 hover:shadow-lg">
            <ScanSearch size={16} />

            <span>Analyze my resume</span>

            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <section className="relative z-10 my-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {resumes.length > 0 &&
          resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
      </section>
    </section>
  );
}
