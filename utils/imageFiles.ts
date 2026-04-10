import { type OutputFormat } from "../constants";

// 드롭존과 파일 선택기에서 허용할 입력 포맷 목록입니다.
const SUPPORTED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/heic",
  "image/heif",
]);

const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".heic", ".heif"];

// input[accept]에 그대로 넘겨서 파일 선택기에서 보이는 포맷을 제한합니다.
export const ACCEPTED_IMAGE_INPUTS = ".png,.jpg,.jpeg,.heic,.heif,image/png,image/jpeg,image/heic,image/heif";

export function isSupportedInputFile(file: File) {
  const lowerName = file.name.toLowerCase();

  // 브라우저가 MIME 타입을 비워서 주는 경우가 있어 확장자도 함께 검사합니다.
  return (
    SUPPORTED_MIME_TYPES.has(file.type) ||
    SUPPORTED_EXTENSIONS.some((extension) => lowerName.endsWith(extension))
  );
}

function isHeicFile(file: File) {
  const lowerName = file.name.toLowerCase();

  // HEIC/HEIF는 브라우저 기본 디코딩이 불안정하므로 별도 변환 경로로 보냅니다.
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    lowerName.endsWith(".heic") ||
    lowerName.endsWith(".heif")
  );
}

async function normalizeSourceBlob(file: File) {
  if (!isHeicFile(file)) {
    // PNG/JPG는 바로 canvas에 그릴 수 있으므로 원본 파일을 그대로 사용합니다.
    return file;
  }

  // HEIC는 동적으로 디코더를 불러와 PNG Blob으로 바꾼 뒤 이후 파이프라인에 태웁니다.
  const { default: heic2any } = await import("heic2any");
  const converted = await heic2any({
    blob: file,
    toType: "image/png",
  });

  return Array.isArray(converted) ? converted[0] : converted;
}

export async function loadImageSource(file: File) {
  // 이 함수는 어떤 입력 포맷이 들어와도 최종적으로 <img>에 넣을 수 있는 소스를 만듭니다.
  const blob = await normalizeSourceBlob(file);
  const objectUrl = URL.createObjectURL(blob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Image load failed"));
      nextImage.src = objectUrl;
    });

    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function getOutputFileName(inputName: string, format: OutputFormat) {
  const ext = format === "jpeg" ? "jpg" : "webp";
  const baseName = inputName.replace(/\.(png|jpe?g|heic|heif)$/i, "");

  // 업로드 원본 이름을 유지하되, 변환 결과임을 알 수 있게 _thumb 접미사를 붙입니다.
  return `${baseName || inputName}_thumb.${ext}`;
}
