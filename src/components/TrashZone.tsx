import React from "react";
import { DragContext } from "../context";

const TrashZone = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { isDragging } = React.useContext(DragContext);

  if (!isDragging) return null;

  return (
    <div
      ref={ref}
      className="fixed right-0 top-0 h-full w-24 flex items-center justify-center bg-red-400 text-white text-sm select-none"
    >
      trash
    </div>
  );
});

export default TrashZone;
