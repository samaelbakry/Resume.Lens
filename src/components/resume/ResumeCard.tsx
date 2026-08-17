import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
} from "lucide-react";
import type { Resume } from "../../interfaces";
import { Link } from "react-router-dom";

interface ResumeCardProps {
  resume: Resume;
}

export default function ResumeCard({
  resume: { companyName, jobTitle, imagePath, resumePath, feedback },
}: ResumeCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/4">
      <div className="relative aspect-16/10 overflow-hidden rounded-xl border border-white/6 bg-black">
        <img
          src={imagePath}
          alt={`${companyName} ${jobTitle} resume`}
          className="h-full w-full object-cover object-top opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

          <span className="text-xs font-medium text-white">
            {feedback.overallScore}
          </span>

          <span className="text-[10px] text-white/40">/ 100</span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 backdrop-blur-md">
            <FileText size={15} className="text-white/70" />
          </div>

          <span className="text-xs text-white/60">Resume analysis</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-medium text-white">{jobTitle}</h3>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/40">
              <BriefcaseBusiness size={13} />
              <span>{companyName}</span>
            </div>
          </div>

          <Link
            to={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-white/50 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white"
            aria-label="View resume"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400/80" />

            <span className="text-xs text-white/40">Resume analyzed</span>
          </div>

          <span className="text-xs font-medium text-white/60">
            {feedback.overallScore}% match
          </span>
        </div>
      </div>
    </article>
  );
}
