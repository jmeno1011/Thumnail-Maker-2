"use client";
/* eslint-disable @next/next/no-img-element -- Preview src is an in-browser data URL. */
import { useCallback, useRef, useState } from "react";
import { OutputFormat, OutputMode } from "@/constants";
import { ProcessResult } from "@/types/image";
import { getOutputFileName, loadImageSource } from "@/utils/imageFiles";
import { formatBytes } from "@/utils/formatBytes";

type ImageCardProps = {
  item: File;
  format: OutputFormat;
  outputMode: OutputMode;
  quality: number;
  targetWidth: number;
};

export function ImageCard({
  item,
  format,
  outputMode,
  quality,
  targetWidth,
}: ImageCardProps) {
  // result에는 실제로 새로 만들어진 파일 Blob과 미리보기 정보를 함께 저장합니다.
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const process = useCallback(() => {
    const run = async () => {
      setError(null);
      setDone(false);
      setProcessing(true);

      try {
        // 입력 포맷이 PNG/JPG면 그대로, HEIC면 변환 후 브라우저가 읽을 수 있는 이미지로 로드합니다.
        const image = await loadImageSource(item);
        const sourceWidth = image.naturalWidth || image.width;
        const sourceHeight = image.naturalHeight || image.height;
        const w = outputMode === "thumbnail" ? targetWidth : sourceWidth;
        const h =
          outputMode === "thumbnail"
            ? Math.round(sourceHeight * (targetWidth / sourceWidth))
            : sourceHeight;
        const canvas = canvasRef.current;

        if (!canvas) {
          throw new Error("Canvas not available");
        }

        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Canvas context not available");
        }

        // 원본 비율을 유지한 채 지정된 width/height로 캔버스에 다시 그립니다.
        ctx.drawImage(image, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setError("Failed to convert the image.");
              setProcessing(false);
              return;
            }

            setResult({
              blob,
              w,
              h,
              // 새로 만들어진 Blob 크기를 저장해 원본 대비 절감률을 계산합니다.
              size: blob.size,
              // dataUrl은 리스트 카드 안에서 바로 써먹을 미리보기 이미지입니다.
              dataUrl: canvas.toDataURL(`image/${format}`, quality / 100),
            });
            setProcessing(false);
            setDone(true);
          },
          // 실제 파일 생성은 여기서 일어납니다.
          // 선택한 포맷과 품질 값으로 canvas 내용을 새 Blob으로 인코딩합니다.
          `image/${format}`,
          quality / 100,
        );
      } catch {
        setError("This file cannot be converted in the browser.");
        setProcessing(false);
      }
    };

    setProcessing(true);
    void run();
  }, [format, item, outputMode, quality, targetWidth]);

  const download = () => {
    if (!result) return;
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(result.blob);
    // 결과 파일명은 원본 이름 + 출력 모드 접미사 + 선택한 출력 확장자로 만듭니다.
    anchor.download = getOutputFileName(item.name, format, outputMode);
    anchor.click();
  };

  const reduction = result
    ? Math.round((1 - result.size / item.size) * 100)
    : null;

  return (
    <div
      className={[
        "overflow-hidden rounded-(--radius) border bg-(--surface) transition-colors duration-300 animate-[fadeIn_0.3s_ease]",
        done ? "border-green-700 bg-[#6ee7b7]/30" : "border-(--border)",
      ].join(" ")}
    >
      {/* 실제 변환 작업용 캔버스입니다. 사용자는 보지 않고, Blob 생성에만 사용합니다. */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex h-11 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-(--surface2)">
          {result ? (
            <img
              src={result.dataUrl}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[22px]">🖼</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{item.name}</p>
          <p className="mt-0.5 font-mono text-xs text-(--text-muted)">
            Original {formatBytes(item.size)}
            {result && (
              <span>
                {" "}
                →{" "}
                <span className="text-(--accent)">
                  {formatBytes(result.size)}
                </span>{" "}
                <span className="text-[11px] text-green-700 font-semibold">
                  ({reduction}% smaller)
                </span>
              </span>
            )}
          </p>
          {result && (
            <p className="mt-0.5 font-mono text-[11px] text-(--text-muted)">
              {result.w} × {result.h}px · {format.toUpperCase()} Q{quality}
              {outputMode === "convert" && " · Original size preserved"}
            </p>
          )}
          {error && <p className="mt-1 text-[11px] text-[#f87171]">{error}</p>}
        </div>

        <div className="flex shrink-0 gap-2">
          {!done && (
            <button
              type="button"
              onClick={process}
              disabled={processing}
              className={[
                "flex items-center gap-1.5 rounded-lg border-none px-4.5 py-2 text-[13px] font-extrabold transition-all duration-150",
                processing
                  ? "cursor-not-allowed bg-(--surface2) text-(--text-muted)"
                  : "cursor-pointer bg-(--accent) text-[#0d0f14]",
              ].join(" ")}
            >
              {processing ? (
                <>
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-(--text-muted) border-t-transparent" />
                  Processing
                </>
              ) : (
                "Convert"
              )}
            </button>
          )}

          {done && (
            <button
              type="button"
              onClick={download}
              className="cursor-pointer rounded-lg border border-(--accent) bg-transparent px-4.5 py-2 text-[13px] font-extrabold text-(--accent) transition-all duration-150"
            >
              ↓ Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
