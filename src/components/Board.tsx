import React from "react";
import StickyNote from "./StickyNote";
import NoteForm from "./NoteForm";
import TrashZone from "./TrashZone";
import { SIZES } from "../constants";
import type { Note, ColorKey, SyncStatus } from "../types";
import { api } from "../api";
import { DragContext } from "../context";
import useDebouncedCallback from "../hooks/useDebouncedCallback";

export default function Board() {
  const zCounter = React.useRef(0);
  const [notes, setNotes] = React.useState<Note[]>(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("notes-board") ?? "[]",
      ) as Note[];
      zCounter.current = saved.reduce((max, n) => Math.max(max, n.z), 0);
      return saved;
    } catch {
      return [];
    }
  });
  const [syncStatus, setSyncStatus] = React.useState<SyncStatus>("saved");
  const [isDragging, setIsDragging] = React.useState(false);
  const trashRef = React.useRef<HTMLDivElement>(null);

  const debouncedSave = useDebouncedCallback(() => {
    localStorage.setItem("notes-board", JSON.stringify(notes));
    api.saveNotes(notes).then(() => setSyncStatus("saved"));
  }, 500);

  React.useEffect(() => {
    setSyncStatus("saving");
    debouncedSave();
  }, [notes]);

  const mutateNotes = (updater: (prev: Note[]) => Note[]) => {
    setNotes((prev) => updater(prev));
  };

  const createNote = (size: keyof typeof SIZES, color: ColorKey) => {
    zCounter.current += 1;
    mutateNotes((prev) => {
      let x = 20, y = 60;
      while (prev.some((n) => n.x === x && n.y === y)) {
        x += 20;
        y += 20;
      }
      return [...prev, { content: "", w: SIZES[size].w, h: SIZES[size].h, x, y, z: zCounter.current, color }];
    });
  };

  const updateNote = (index: number, patch: Partial<Note>) => {
    mutateNotes((prev) =>
      prev.map((n, i) => (i === index ? { ...n, ...patch } : n)),
    );
  };

  const bringToFront = (index: number) => {
    zCounter.current += 1;
    mutateNotes((prev) =>
      prev.map((n, i) => (i === index ? { ...n, z: zCounter.current } : n)),
    );
  };

  const deleteNote = (index: number) => {
    mutateNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (index: number, clientX: number, clientY: number) => {
    const rect = trashRef.current?.getBoundingClientRect();
    if (
      rect &&
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      deleteNote(index);
    }
  };

  return (
    <DragContext.Provider value={{ isDragging, setIsDragging }}>
      <div className="bg-stone-300 h-screen w-screen">
        <div className="p-2 flex items-center gap-3">
          <NoteForm onCreate={createNote} />
          <span className="text-xs text-stone-600">
            {syncStatus === "saving" ? "saving…" : "saved ✓"}
          </span>
        </div>
        <div className="w-full h-full relative">
          {notes.map((note, i) => (
            <StickyNote
              key={i}
              note={note}
              onContentChange={(content) => updateNote(i, { content })}
              onResize={(w, h) => updateNote(i, { w, h })}
              onMove={(x, y) => updateNote(i, { x, y })}
              onFocus={() => bringToFront(i)}
              onDelete={() => deleteNote(i)}
              onDragEnd={(cx, cy) => handleDragEnd(i, cx, cy)}
            />
          ))}
        </div>
        <TrashZone ref={trashRef} />
      </div>
    </DragContext.Provider>
  );
}
