export const COLORS = {
  stone:  { base: "bg-stone-400",  bar: "bg-stone-500",  hover: "hover:bg-stone-500"  },
  yellow: { base: "bg-yellow-200", bar: "bg-yellow-300", hover: "hover:bg-yellow-300" },
  green:  { base: "bg-green-200",  bar: "bg-green-300",  hover: "hover:bg-green-300"  },
  blue:   { base: "bg-blue-200",   bar: "bg-blue-300",   hover: "hover:bg-blue-300"   },
  pink:   { base: "bg-pink-200",   bar: "bg-pink-300",   hover: "hover:bg-pink-300"   },
  orange: { base: "bg-orange-200", bar: "bg-orange-300", hover: "hover:bg-orange-300" },
} as const;

export const SIZES = {
  sm: { w: 250, h: 300 },
  md: { w: 350, h: 400 },
  lg: { w: 450, h: 450 },
} as const;
