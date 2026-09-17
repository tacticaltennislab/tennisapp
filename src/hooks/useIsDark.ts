"use client";

import { useEffect, useState } from "react";

// Tracks the .dark class on <html> live, so WebGL scenes (which can't just
// read CSS custom properties like the rest of the site) can react to the
// theme toggle without a page reload.
export function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
