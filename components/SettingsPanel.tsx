import { FORMATS, type OutputFormat } from "../constants";

type SettingsPanelProps = {
  format: OutputFormat;
  setFormat: (format: OutputFormat) => void;
  quality: number;
  setQuality: (quality: number) => void;
  width: number;
  setWidth: (width: number) => void;
};

export function SettingsPanel({
  format,
  setFormat,
  quality,
  setQuality,
  width,
  setWidth,
}: SettingsPanelProps) {
  return (
    // SettingsPanel은 변환 옵션을 직접 바꾸는 UI만 담당합니다.
    // 실제 변환은 ImageCard가 하고, 여기서는 상위 상태를 업데이트만 합니다.
    <div className="flex flex-wrap items-end gap-8 rounded-(--radius) border border-(--border) bg-(--surface) px-6 py-5">
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.08em] text-(--text-muted)">
          Format
        </label>
        <div className="flex gap-2">
          {FORMATS.map((item) => (
            <button
              key={item}
              type="button"
              // 클릭한 포맷이 상위 App 상태로 올라가고,
              // 그 값이 각 ImageCard에 전달되어 출력 포맷을 결정합니다.
              onClick={() => setFormat(item)}
              className={[
                "font-jetbrains cursor-pointer rounded-lg border px-4.5 py-1.75 text-[13px] font-semibold transition-all duration-150",
                format === item
                  ? "border-green-700 bg-[#6ee7b7] text-(--accent)"
                  : "border-(--border) bg-transparent text-(--text-muted)",
              ].join(" ")}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.08em] text-(--text-muted)">
          Width (px)
        </label>
        <div className="flex items-center gap-2.5">
          <input
            type="number"
            value={width}
            min={400}
            max={3840}
            step={100}
            // 사용자가 입력한 가로 길이는 비율 유지 리사이즈의 기준값으로 사용됩니다.
            onChange={(event) => setWidth(Number(event.target.value))}
            className="w-22.5 rounded-lg border border-(--border) bg-(--surface2) px-3 py-1.75 font-mono text-sm font-semibold text-(--text) outline-none"
          />
          <span className="text-xs text-(--text-muted)">
            Aspect ratio preserved
          </span>
        </div>
      </div>

      <div className="min-w-50 flex-1">
        <label className="mb-2 block text-xs uppercase tracking-[0.08em] text-(--text-muted)">
          Quality —
          <span className="ml-1 font-mono font-bold text-(--accent)">
            {quality}
          </span>
        </label>
        <div className="flex items-center gap-3">
          <span className="text-xs text-(--text-muted)">50</span>
          <input
            type="range"
            min={50}
            max={100}
            value={quality}
            // 품질 값은 JPEG/WebP 인코딩 시 canvas.toBlob의 quality 인자로 전달됩니다.
            onChange={(event) => setQuality(Number(event.target.value))}
            className="range-input flex-1 cursor-pointer accent-[#6ee7b7]"
          />
          <span className="text-xs text-(--text-muted)">100</span>
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-(--text-muted)">
          <span>Smaller file</span>
          <span
            className={
              quality >= 80 && quality <= 85
                ? "text-green-700 font-semibold"
                : ""
            }
          >
            {quality >= 80 && quality <= 85 ? "✓ Recommended range" : ""}
          </span>
          <span>Higher quality</span>
        </div>
      </div>
    </div>
  );
}
