"use client";
import { FileDropZone } from "@/components/FileDropZone";
import { Footer } from "@/components/Footer";
import { ImageCard } from "@/components/ImageCard";
import { SettingsPanel } from "@/components/SettingsPanel";
import { OutputFormat, OutputMode } from "@/constants";
import { useCallback, useState } from "react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Thumbnail Maker",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  description:
    "Convert PNG, JPG, and HEIC images into optimized JPEG, WebP, or PNG thumbnails directly in your browser.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "PNG, JPG, HEIC, and HEIF input support",
    "JPEG, WebP, and PNG thumbnail output",
    "Convert images without resizing",
    "Adjustable image quality",
    "Aspect-ratio preserving resize",
    "In-browser file processing",
  ],
};

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputMode, setOutputMode] = useState<OutputMode>("thumbnail");
  const [format, setFormat] = useState<OutputFormat>("webp");
  const [quality, setQuality] = useState(82);
  const [width, setWidth] = useState(1200);

  const onFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((file) => file.name + file.size));
      return [
        ...prev,
        ...newFiles.filter((file) => !existing.has(file.name + file.size)),
      ];
    });
  }, []);

  const clear = () => setFiles([]);
  return (
    <main className="my-0 mx-auto w-full max-w-195 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#6ee7b7,#4d8ef8)] text-lg text-white">
            ✦
          </div>
          <h1 className="text-2xl font-extrabold tracking-[-0.02em]">
            Thumbnail Maker
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 pl-12 text-sm text-(--text-muted)">
          <span className="inline-flex items-center gap-2 rounded-md border border-(--border) bg-(--surface) px-2.5 py-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-(--accent)">
              From
            </span>
            <span className="font-mono text-xs font-semibold text-(--text)">
              PNG, JPG, HEIC
            </span>
          </span>
          <span className="font-mono text-sm font-bold text-(--accent)">→</span>
          <span className="inline-flex items-center gap-2 rounded-md border border-(--accent) bg-[#6ee7b7]/10 px-2.5 py-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-(--accent)">
              To
            </span>
            <span className="font-mono text-xs font-semibold text-(--text)">
              JPEG, WebP, PNG
            </span>
          </span>
          <span className="text-sm">
            Resize or keep original size · Browser-only processing
          </span>
        </div>
      </div>

      <div className="mb-5">
        <SettingsPanel
          outputMode={outputMode}
          setOutputMode={setOutputMode}
          format={format}
          setFormat={setFormat}
          quality={quality}
          setQuality={setQuality}
          width={width}
          setWidth={setWidth}
        />
      </div>

      <div className="mb-6">
        <FileDropZone onFiles={onFiles} />
      </div>

      {files.length > 0 && (
        <div className="animate-[fadeIn_0.3s_ease]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] text-(--text-muted)">
              <span className="font-mono font-bold text-(--accent)">
                {files.length}
              </span>{" "}
              files
            </p>
            <button
              type="button"
              onClick={clear}
              className="cursor-pointer rounded-md bg-transparent px-2 py-1 text-[13px] text-(--text-muted)"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {files.map((file, index) => (
              <ImageCard
                key={file.name + file.size + index}
                item={file}
                format={format}
                outputMode={outputMode}
                quality={quality}
                targetWidth={width}
              />
            ))}
          </div>
        </div>
      )}

      <p className="mt-12 text-center text-xs text-(--text-muted)">
        All processing happens directly in your browser · Files are never
        uploaded to a server
      </p>

      <section
        aria-labelledby="image-converter-details"
        className="mt-12 border-t border-(--border) pt-8"
      >
        <h2
          id="image-converter-details"
          className="text-lg font-extrabold text-(--text)"
        >
          Fast Image Thumbnails for PNG, JPG, and HEIC Files
        </h2>
        <div className="mt-4 grid gap-4 text-sm leading-6 text-(--text-muted) md:grid-cols-3">
          <p>
            Convert source images into JPEG, WebP, or PNG thumbnails with
            adjustable quality and width settings, or keep the original
            dimensions.
          </p>
          <p>
            Keep image proportions intact while reducing file size for sites,
            previews, posts, and product images.
          </p>
          <p>
            Process files in the browser so private images stay on your device
            instead of being uploaded to a server.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
