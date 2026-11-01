import { useEffect } from "react";

/**
 * Esc 키를 누르면 onEscape 를 부릅니다.
 */
export const useEscapeKey = (onEscape: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, enabled]);
};
