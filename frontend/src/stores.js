import { readable } from "svelte/store";
import { breakpoints } from "./constants";

export const isLimitedScreenSpace = readable(true, (set) => {
  let isBelowThreshold = true;

  const checkIfScreenSpaceIsLimited = () => {
    if (window.innerWidth < breakpoints.MEDIUM && !isBelowThreshold) {
      set(true);
      isBelowThreshold = true;
    } else if (window.innerWidth > breakpoints.MEDIUM && isBelowThreshold) {
      set(false);
      isBelowThreshold = false;
    }
  };

  if (typeof window !== undefined) {
    checkIfScreenSpaceIsLimited();

    window.addEventListener("resize", checkIfScreenSpaceIsLimited);
  }
});
