export default function Logo() {
  return (
    <>
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white shadow-2xs">
        <div className="h-2 w-2 rounded-full bg-slate-900"></div>
      </div>
      <span className="text-sm font-medium tracking-wide text-slate-900">
        Resume Lens
      </span>
    </>
  );
}