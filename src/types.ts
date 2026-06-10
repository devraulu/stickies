import type { COLORS } from "./constants";

export type SyncStatus = "saving" | "saved";

export type ColorKey = keyof typeof COLORS;

export type Note = {
  content: string;
  w: number;
  h: number;
  x: number;
  y: number;
  z: number;
  color: ColorKey;
};
