import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Download,
  FileText,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getScoreBadge } from "../../lib/helper";
import type { ResumeFeedback } from "../../interfaces/resume";

export default function ResumeAnalysisView() {
  const location = useLocation();
  const navigate = useNavigate();
  const resume = location.state?.resume;

  if (!resume) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Resume analysis not found</h2>

          <button
            onClick={() => navigate("/upload")}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }
  const { companyName ,  jobTitle, jobDescription, imagePath, resumePath } = resume;

  const feedback: ResumeFeedback = resume.feedback;

  const { overallScore, ...categories } = feedback;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-slate-900">
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Analysis Completed
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 capitalize">
            {jobTitle}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Building2 size={15} />
            <span>{companyName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={resumePath}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-100"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Overall Match Score
              </span>
              <Sparkles size={16} className="text-blue-600" />
            </div>

            <div className="my-6 flex items-baseline justify-center gap-1">
              <span className="text-6xl font-black tracking-tight text-slate-950">
                {overallScore}
              </span>
              <span className="text-lg font-bold text-slate-400">/ 100</span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-slate-900 transition-all duration-1000"
                style={{ width: `${overallScore}%` }}
              />
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Requires optimization in{" "}
              <strong className="text-slate-800">Skills</strong> &{" "}
              <strong className="text-slate-800">Content</strong> to cross the
              70% interview threshold.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <BriefcaseBusiness size={16} className="text-slate-500" />
              Target Job Requirements
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-4">
              {jobDescription}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <FileText size={15} />
                <span>Document Preview</span>
              </div>
            </div>
            <div className="relative aspect-4/5 bg-slate-100 overflow-hidden">
              <img
                src={imagePath}
                alt="Resume Document"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-4">
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/90 py-2.5 text-xs font-medium text-slate-900 backdrop-blur-md shadow-sm hover:bg-white"
                >
                  <span>Open Full Document</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">
              Category Breakdown & Action Items
            </h2>
            <span className="text-xs font-medium text-slate-500">
              5 Key Area Audits
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(categories).map(([key, data]) => {
              const styles = getScoreBadge(data.score);
              return (
                <div
                  key={key}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${styles.bg} ${styles.text}`}
                      >
                        {data.score}%
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full ${styles.bar}`}
                        style={{ width: `${data.score}%` }}
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      {data.tips.slice(0, 2).map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-600"
                        >
                          <Lightbulb
                            size={13}
                            className="mt-0.5 shrink-0 text-amber-500"
                          />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
              <TrendingUp size={18} className="text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Priority Improvements to Pass ATS
              </h3>
            </div>

            <div className="space-y-3">
              {Object.entries(categories).flatMap(([key, data]) =>
                data.tips.slice(2, 4).map((tip, idx) => (
                  <div
                    key={`${key}-${idx}`}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:bg-slate-100/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 shadow-2xs text-[10px] font-bold uppercase">
                        {key.substring(0, 2)}
                      </div>
                      <span className="text-xs font-medium text-slate-700">
                        {tip}
                      </span>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-slate-400 shrink-0"
                    />
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
