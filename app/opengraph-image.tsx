import { ImageResponse } from "next/og";

export const alt = "Thumbnail Maker image converter";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0d0f14",
          color: "#e8eaed",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#6ee7b7",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            Thumbnail Maker
          </div>
          <div
            style={{
              color: "#e8eaed",
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: 0,
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Convert images into optimized thumbnails
          </div>
          <div
            style={{
              color: "#9ca3af",
              fontSize: 32,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            PNG, JPG, and HEIC to JPEG or WebP. Browser-only processing.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
