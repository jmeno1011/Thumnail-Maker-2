export const FORMATS = ["jpeg", "webp"] as const;
export const OUTPUT_MODES = ["thumbnail", "convert"] as const;

export type OutputFormat = (typeof FORMATS)[number];
export type OutputMode = (typeof OUTPUT_MODES)[number];
