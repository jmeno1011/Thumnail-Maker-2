export const FORMATS = ["jpeg", "webp"] as const;

export type OutputFormat = (typeof FORMATS)[number];
