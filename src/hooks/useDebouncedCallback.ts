import { useRef, useCallback, useEffect } from "react";

function useDebouncedCallback<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return useCallback((...args: T) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      fnRef.current(...args);
    }, delay);
  }, [delay]);
}

export default useDebouncedCallback;
