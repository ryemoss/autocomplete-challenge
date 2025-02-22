import { useEffect } from "react";

function useClickOutside<T extends HTMLElement>(ref: React.RefObject<T | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    }

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
