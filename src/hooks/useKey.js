import { useEffect } from "react";
export function useKey(disabled, keyCode, element, action) {
  useEffect(() => {
    if (disabled) return;
    const callback = (e) => {
      if (document.activeElement === element.current) return;
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        element.current.focus();
        action("");
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener(callback);
    };
  }, []);
}
