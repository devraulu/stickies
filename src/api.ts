import type { Note } from "./types";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

let store: Note[] = [];

export const api = {
  async getNotes(): Promise<Note[]> {
    await delay(200);
    return structuredClone(store);
  },

  async saveNotes(notes: Note[]): Promise<void> {
    await delay(300);
    store = structuredClone(notes);
  },
};
