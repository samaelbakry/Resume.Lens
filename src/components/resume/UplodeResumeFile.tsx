import { Trash2, UploadCloud } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (file: File | null) => void;
}

export default function UplodeResumeFile({ onFileSelected }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelected(file);
  }, [onFileSelected]);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
      maxSize: 20 * 1024 * 1024,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
          isDragActive
            ? "border-blue-500 bg-blue-50/50"
            : file
              ? "border-emerald-300 bg-emerald-50/30"
              : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/50"
        }`}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <img src="/images/pdf.png" className="size-10" />
              <div className="flex flex-col text-left overflow-hidden">
                <span className="truncate text-sm font-medium text-slate-900">
                  {file.name}
                </span>
                <span className="text-xs text-slate-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              
            </div>
            <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelected(null);
                }}
                className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-lg border border-slate-200 bg-white text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove file"
              >
                <Trash2 size={15} />
              </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-transform duration-300 group-hover:scale-105">
              <UploadCloud size={20} className="text-slate-600" />
            </div>
            
            <div className="mt-1">
              <p className="text-sm font-medium text-slate-900">
                <span className="text-blue-600 underline underline-offset-2">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="mt-1 text-xs text-slate-400">
                PDF format (max size 20 MB)
              </p>

            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
