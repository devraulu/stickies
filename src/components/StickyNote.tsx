import React from "react";
import type { Note } from "../types";
import { COLORS } from "../constants";
import { DragContext } from "../context";

type Props = {
  note: Note;
  onContentChange: (content: string) => void;
  onResize: (w: number, h: number) => void;
  onMove: (x: number, y: number) => void;
  onFocus: () => void;
  onDelete: () => void;
  onDragEnd: (clientX: number, clientY: number) => void;
};

export default function StickyNote({
  note,
  onContentChange,
  onResize,
  onMove,
  onFocus,
  onDelete,
  onDragEnd,
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { setIsDragging } = React.useContext(DragContext);
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      onResize(el.offsetWidth, el.offsetHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleDragMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const offsetX = e.clientX - note.x;
    const offsetY = e.clientY - note.y;

    const handleMouseMove = (e: MouseEvent) => {
      onMove(e.clientX - offsetX, e.clientY - offsetY);
    };
    const handleMouseUp = (up: MouseEvent) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      onDragEnd(up.clientX, up.clientY);
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const c = COLORS[note.color] ?? COLORS.stone;
  return (
    <div
      className="absolute border border-stone-800 shadow-md"
      style={{ left: note.x, top: note.y, zIndex: note.z }}
      onMouseDown={onFocus}
    >
      <div
        onMouseDown={handleDragMouseDown}
        className={`cursor-grab select-none px-1 py-0.5 flex justify-end items-center ${focused ? c.bar : c.base} `}
      >
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onDelete}
          className="text-stone-600 hover:text-red-600 px-1 leading-none"
        >
          ×
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={note.content}
        className={`block resize outline-none p-2 ${c.base}`}
        style={{ width: note.w, height: note.h }}
        onChange={(e) => onContentChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
