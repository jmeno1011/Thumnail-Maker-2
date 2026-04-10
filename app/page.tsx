"use client";
import { FileDropZone } from "@/components/FileDropZone";
import { ImageCard } from "@/components/ImageCard";
import { SettingsPanel } from "@/components/SettingsPanel";
import { OutputFormat } from "@/constants";
import { useCallback, useState } from "react";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Thumbnail Maker",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  description:
    "Convert PNG, JPG, and HEIC images into optimized JPEG or WebP thumbnails directly in your browser.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "PNG, JPG, HEIC, and HEIF input support",
    "JPEG and WebP thumbnail output",
    "Adjustable image quality",
    "Aspect-ratio preserving resize",
    "In-browser file processing",
  ],
};

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
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
      <div className="mb-9">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#6ee7b7,#4d8ef8)] text-lg text-white">
            ✦
          </div>
          <h1 className="text-2xl font-extrabold tracking-[-0.02em]">
            Thumbnail Maker
          </h1>
        </div>
        <p className="pl-12 text-sm text-(--text-muted)">
          PNG / JPG / HEIC → JPEG / WebP · Aspect ratio preserved · Fast
          in-browser processing
        </p>
      </div>

      <div className="mb-5">
        <SettingsPanel
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
    </main>
  );
}
