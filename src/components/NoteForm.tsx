import React from "react";
import { COLORS, SIZES } from "../constants";
import type { ColorKey } from "../types";

type Props = {
  onCreate: (size: keyof typeof SIZES, color: ColorKey) => void;
};

export default function NoteForm({ onCreate }: Props) {
  const [selectedSize, setSelectedSize] = React.useState<keyof typeof SIZES>("md");
  const [selectedColor, setSelectedColor] = React.useState<ColorKey>("stone");

  const btnStyles = "bg-stone-700 text-white rounded-full px-4 py-2 text-sm hover:bg-stone-800 transition";

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {(Object.keys(SIZES) as (keyof typeof SIZES)[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedSize(key)}
            className={`px-3 py-1 rounded-full text-sm bg-stone-400 hover:bg-stone-500 transition ${selectedSize === key ? "ring-2 ring-stone-800" : ""}`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        {(Object.keys(COLORS) as ColorKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedColor(key)}
            className={`w-5 h-5 rounded-full ${COLORS[key].base} ${COLORS[key].hover} ${selectedColor === key ? "ring-2 ring-stone-800" : ""}`}
          />
        ))}
      </div>
      <button className={btnStyles} onClick={() => onCreate(selectedSize, selectedColor)}>
        create
      </button>
    </div>
  );
}
