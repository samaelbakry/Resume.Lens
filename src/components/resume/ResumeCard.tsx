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
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-md">
      <div className="relative aspect-16/10 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100">
        <img
          src={imagePath}
          alt={`${companyName} ${jobTitle} resume`}
          className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />

        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />

          <span className="text-xs font-semibold text-slate-900">
            {feedback.overallScore}
          </span>

          <span className="text-[10px] font-medium text-slate-400">/ 100</span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-slate-900/70 backdrop-blur-md">
            <FileText size={15} className="text-white/90" />
          </div>

          <span className="text-xs font-medium text-white/90 drop-shadow-sm">
            Resume analysis
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {jobTitle}
            </h3>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
              <BriefcaseBusiness size={13} />
              <span>{companyName}</span>
            </div>
          </div>

          <Link
            to={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-900 hover:text-white"
            aria-label="View resume"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600" />

            <span className="text-xs text-slate-500">Resume analyzed</span>
          </div>

          <span className="text-xs font-medium text-slate-700">
            {feedback.overallScore}% match
          </span>
        </div>
      </div>
    </article>
  );
}