import React from "react";

type DragContextValue = {
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
};

export const DragContext = React.createContext<DragContextValue>({
  isDragging: false,
  setIsDragging: () => {},
});
