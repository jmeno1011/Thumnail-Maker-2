import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Thumbnail Maker - Fast Image Thumbnail Converter",
    template: "%s | Thumbnail Maker",
  },
  description:
    "Convert PNG, JPG, and HEIC images into optimized JPEG or WebP thumbnails directly in your browser.",
  applicationName: "Thumbnail Maker",
  keywords: [
    "thumbnail maker",
    "image converter",
    "webp converter",
    "jpeg converter",
    "heic converter",
    "browser image compression",
  ],
  authors: [{ name: "Thumbnail Maker" }],
  creator: "Thumbnail Maker",
  publisher: "Thumbnail Maker",
  category: "image tools",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Thumbnail Maker - Fast Image Thumbnail Converter",
    description:
      "Convert PNG, JPG, and HEIC images into optimized JPEG or WebP thumbnails directly in your browser.",
    url: "/",
    siteName: "Thumbnail Maker",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Thumbnail Maker - Fast Image Thumbnail Converter",
    description:
      "Convert PNG, JPG, and HEIC images into optimized JPEG or WebP thumbnails directly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
