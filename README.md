# Thumbnail Maker

Thumbnail Maker is a browser-based image thumbnail converter built with Next.js.
It converts PNG, JPG, JPEG, HEIC, and HEIF files into optimized JPEG, WebP, or PNG thumbnails
without uploading images to a server.

Live site: [https://thumnail-maker-2.vercel.app/](https://thumnail-maker-2.vercel.app/)

## Features

- Convert `PNG`, `JPG`, `JPEG`, `HEIC`, and `HEIF` images
- Export thumbnails as `JPEG`, `WebP`, or `PNG`
- Resize by target width while preserving aspect ratio
- Adjust output quality before export
- Handle multiple files in one session
- Generate previews and download each converted image
- Keep processing in the browser for privacy
- Include SEO metadata, `robots.txt`, `sitemap.xml`, and an Open Graph image

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- `heic2any` for HEIC/HEIF conversion
- Vercel Analytics

## How It Works

1. The user drags in or selects image files.
2. Supported files are filtered in the drop zone.
3. HEIC and HEIF files are normalized into browser-readable image blobs.
4. Images are drawn to a hidden canvas and resized to the selected width.
5. The canvas output is encoded as JPEG, WebP, or PNG. JPEG and WebP use the selected quality.
6. Each result is previewed and can be downloaded individually.

## Getting Started

### Requirements

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file when you want to force a canonical site URL:

```bash
SITE_URL=https://your-domain.com
```

URL resolution order:

1. `SITE_URL`
2. `NEXT_PUBLIC_SITE_URL`
3. `VERCEL_PROJECT_PRODUCTION_URL`
4. `VERCEL_URL`
5. `http://localhost:3000`

This value is used for:

- `metadataBase`
- canonical URL
- Open Graph URL
- `robots.txt`
- `sitemap.xml`

## SEO

The project includes:

- metadata in `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/opengraph-image.tsx`
- structured data in `app/page.tsx`

After deployment, verify:

- `/robots.txt`
- `/sitemap.xml`
- page source canonical URL
- Open Graph and Twitter metadata

## Project Structure

```text
app/
  globals.css
  layout.tsx
  opengraph-image.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  FileDropZone.tsx
  ImageCard.tsx
  SettingsPanel.tsx
utils/
  formatBytes.ts
  imageFiles.ts
  siteUrl.ts
types/
  heic2any.d.ts
  image.ts
```

## Notes

- HEIC and HEIF conversion depends on browser support and client-side decoding.
- Images are processed locally in the browser, but large files can still be memory-intensive.
- The deployed project URL currently uses the spelling `thumnail`. A custom domain with the correct spelling would be better for branding and SEO.
