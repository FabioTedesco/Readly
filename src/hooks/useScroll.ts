import { useState, useEffect } from "react";

export function useScroll(threshold = 300) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollTo = (position: number) => {
    window.scrollTo({ top: position, behavior: "smooth" });
  };

  return { isVisible, scrollTo };
}
