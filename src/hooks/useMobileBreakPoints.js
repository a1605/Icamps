import { useEffect, useState } from "react";

/**
 * Custom hook that tells you whether a given media query is active.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      const handler = (event) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );
  return matches;
}

/**
 * Get a set of boolean representing which breakpoint is active
 * and which breakpoints are inactive.
 */
export default function useBreakpoints() {
  const breakpoints = {
    isXs: useMediaQuery("(max-width: 640px)"),
    isSm: useMediaQuery("(min-width: 641px) and (max-width: 767px)"),
    isMd: useMediaQuery("(min-width: 768px) and (max-width: 1023px)"),
    isLg: useMediaQuery("(min-width: 1024px) and (max-width:1535px"),
    isXl: useMediaQuery("(min-width: 1536px)"),
    active: "xs",
  };
  if (breakpoints.isXs) breakpoints.active = "xs";
  if (breakpoints.isSm) breakpoints.active = "sm";
  if (breakpoints.isMd) breakpoints.active = "md";
  if (breakpoints.isLg) breakpoints.active = "lg";
  return breakpoints;
}

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
