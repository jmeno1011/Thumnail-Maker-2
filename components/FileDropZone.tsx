"use client";
import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import {
  ACCEPTED_IMAGE_INPUTS,
  isSupportedInputFile,
} from "../utils/imageFiles";

type FileDropZoneProps = {
  onFiles: (files: File[]) => void;
};

export function FileDropZone({ onFiles }: FileDropZoneProps) {
  // dragging은 드래그 중 시각 상태만 관리하고, 파일 목록 상태는 상위 App이 관리합니다.
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);
      // 드롭된 파일 중 지원 포맷만 통과시켜서 상위 컴포넌트에 전달합니다.
      const files = [...event.dataTransfer.files].filter(isSupportedInputFile);
      if (files.length) onFiles(files);
    },
    [onFiles],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 클릭 업로드도 드래그 업로드와 같은 필터를 써서 동작을 맞춥니다.
    const files = [...(event.target.files ?? [])].filter(isSupportedInputFile);
    if (files.length) onFiles(files);
    // 같은 파일을 다시 선택해도 change 이벤트가 나가도록 값을 비웁니다.
    event.target.value = "";
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={[
        "cursor-pointer select-none rounded-(--radius) border-2 border-dashed px-8 py-13 text-center transition-all duration-200",
        dragging
          ? "border-(--accent) bg-[rgba(110,231,183,0.05)] animate-[pulse-border_1s_infinite]"
          : "border-(--border) bg-(--surface)",
      ].join(" ")}
    >
      {/* accept는 파일 선택기 힌트 역할이고,
          실제 허용 여부는 위의 isSupportedInputFile에서 다시 검증합니다. */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_INPUTS}
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <div className="mb-3 text-[42px]">📂</div>
      <p className="mb-1.5 text-[17px] font-extrabold">
        Drag PNG, JPG, or HEIC files here or click to upload
      </p>
      <p className="text-sm text-(--text-muted)">
        Multiple files supported · PNG, JPG, and HEIC accepted
      </p>
    </div>
  );
}
