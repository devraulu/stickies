export function debounce<T extends unknown[]>(fn: (...args: T) => void, ms: number) {
  let id: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}
