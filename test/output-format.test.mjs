import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const constantsSource = readFileSync(new URL("../constants.ts", import.meta.url), "utf8");
const imageFilesSource = readFileSync(
  new URL("../utils/imageFiles.ts", import.meta.url),
  "utf8",
);
const pageSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("format selector offers PNG output", () => {
  assert.match(constantsSource, /FORMATS\s*=\s*\[[^\]]*"png"[^\]]*\]/s);
});

test("PNG output keeps the png extension in downloaded filenames", () => {
  assert.match(imageFilesSource, /format\s*===\s*"png"\s*\?\s*"png"/);
});

test("hero copy visually separates input and output formats", () => {
  assert.match(pageSource, />\s*From\s*</);
  assert.match(pageSource, />\s*To\s*</);
  assert.match(pageSource, /PNG, JPG, HEIC/);
  assert.match(pageSource, /JPEG, WebP, PNG/);
});
