import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc;

export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    console.log("🚀 Starting PDF conversion...");

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await getDocument({
      data: arrayBuffer,
    }).promise;

    console.log("✅ PDF loaded");

    const page = await pdf.getPage(1);

    console.log("✅ Page loaded");

    const viewport = page.getViewport({
      scale: 4,
    });

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    if (!context) {
      return {
        imageUrl: "",
        file: null,
        error: "Could not create canvas context",
      };
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    console.log("✅ PDF page rendered");

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });

            return;
          }

          const originalName = file.name.replace(
            /\.pdf$/i,
            ""
          );

          const imageFile = new File(
            [blob],
            `${originalName}.png`,
            {
              type: "image/png",
            }
          );

          console.log("✅ Image created:", imageFile);

          resolve({
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
          });
        },
        "image/png"
      );
    });
  } catch (err) {
    console.error("❌ PDF conversion error:", err);

    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
}

export const generateUUID = () => crypto.randomUUID();