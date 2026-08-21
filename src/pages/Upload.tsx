import { useState, type FormEvent } from "react";
import UplodeResumeFile from "../components/resume/UplodeResumeFile";
import {
  Briefcase,
  Building2,
  FileText,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { usePuterStore } from "../lib/puter";
import { convertPdfToImage, generateUUID } from "../lib/utili";
import { prepareInstructions } from "../constants";

interface Props {
 companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File
}

export default function Upload() {
  const { auth, isLoading, ai, fs, kv } = usePuterStore();
  const [isProccessing, setIsProccessing] = useState(false);
  const [staticText, setStaticText] = useState("");
  const [file, setFile] = useState<File | null>(null);

 const handleAnalyze = async ({companyName,jobTitle,jobDescription,file}: Props) => {
  try {
    setIsProccessing(true);

    setStaticText("Uploading your file..");

    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) {
      setStaticText("Failed to upload file");
      return;
    }

    setStaticText("Converting your file...");

    const converted = await convertPdfToImage(file);


// console.log("🔄 PDF conversion result:", converted);
// console.log("📄 Original file:", file);
// console.log("🖼️ Converted file:", converted.file);
// console.log("❌ Conversion error:", converted.error);

    if (!converted.file) {
      setStaticText(converted.error || "Failed to convert PDF to image");
      return;
    }

    setStaticText("Uploading your image...");

    const uploadedImage = await fs.upload([converted.file]);

    if (!uploadedImage) {
      setStaticText("Failed to upload image");
      return;
    }

    setStaticText("Preparing Data");

    const uuid = generateUUID();

    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStaticText("Analyzing...");
  
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({
        jobTitle,
        jobDescription,
      })
    );

    if (!feedback) {
      setStaticText("Failed to analyze");
      return;
    }

    const feedbackText = typeof feedback.message.content === "string"? feedback.message.content: feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStaticText("Analysis completed!");
  } catch (error) {
    console.error("Analyze error:", error);
    setStaticText("Something went wrong");
  } finally {
    setIsProccessing(false);
  }
};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  return (
    <div className="mx-auto w-full max-w-xl my-10 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:p-8">
      {isProccessing ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <img
              src="/images/resume-scan.gif"
              alt="Scanning resume..."
              className="h-48 w-auto rounded-lg object-contain"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/10 to-transparent" />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <Loader2 size={13} className="animate-spin text-blue-600" />
            <span>Analyzing document structure</span>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-slate-900">
            Waiting for your resume
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            {staticText ||
              "Extracting key details and calculating ATS compatibility..."}
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-6 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-slate-900">
              Upload Your Resume
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Enter job details to get an accurate ATS match score and instant
              analysis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="company-name"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Company Name
              </label>
              <div className="relative">
                <Building2
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  placeholder="e.g. Google, Acme Corp"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="job-title"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Job Title
              </label>
              <div className="relative">
                <Briefcase
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="job-description"
                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Job Description
              </label>
              <div className="relative">
                <FileText
                  size={16}
                  className="absolute left-3.5 top-3 text-slate-400"
                />
                <textarea
                  name="job-description"
                  id="job-description"
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 resize-none"
                  placeholder="Paste key responsibilities or requirements..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Upload Resume
              </label>
              <UplodeResumeFile onFileSelected={handleFileSelect} />
            </div>

            <button
              type="submit"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-slate-800 hover:shadow-lg focus:ring-4 focus:ring-slate-200"
            >
              <UploadCloud size={16} />
              <span>Analyze Resume</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
