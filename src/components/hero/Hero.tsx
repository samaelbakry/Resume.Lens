import {
    ArrowUpRight,
    ScanSearch,
    Sparkles
} from "lucide-react";
import { resumes } from "../../constants";
import ResumeCard from "../resume/ResumeCard";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-4 pb-20 pt-32 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-75 w-225 -translate-x-1/2 rounded-full bg-indigo-500/6 blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <div className="mb-7 flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 backdrop-blur-md">
          <Sparkles size={13} className="text-blue-400" strokeWidth={1.8} />

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            AI Resume Intelligence
          </span>

          <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>

        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mx-auto max-w-4xl text-[3.25rem]  font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem]">
            <span className="block">Your resume.</span>

            <span className="mt-2 block bg-linear-to-r from-white via-white/80 to-white/35 bg-clip-text text-transparent">
              Under the microscope.
            </span>
          </h1>

          <p className=" mx-auto mt-8 max-w-155 px-4 text-[14px] font-light leading-7 tracking-wide text-white/40 sm:text-[15px] md:text-base" >
            Analyze your resume against real job requirements, discover missing
            skills, improve your ATS score, and get actionable feedback in
            seconds.
          </p>
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <button className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]">
            <ScanSearch size={16} />

            <span>Analyze my resume</span>

            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    <section className="my-5 max-w-7xl mx-auto grid grid-cols-3 gap-3">
        {resumes.length > 0 && resumes.map((resume)=>(
            <ResumeCard key={resume.id} resume={resume}/>
        ))}
    </section>
    </section>
  );
}
