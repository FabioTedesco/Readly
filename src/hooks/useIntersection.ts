import { useEffect, useRef } from "react";

export function useIntersectionCallback(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return ref;
}
