import React from "react";

export function useSynchronizedScroll(): [
  (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void,
  (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void
] {
  const locksRef = React.useRef(0);
  const refs: React.MutableRefObject<HTMLDivElement | undefined>[] = [];

  const synchronizeOthers = React.useCallback(
    (mainElement: HTMLDivElement, otherRefs: React.MutableRefObject<HTMLDivElement | undefined>[]) => {
      const percentage = mainElement.scrollLeft / (mainElement.scrollWidth - mainElement.offsetWidth);
      otherRefs.forEach((otherTimelineRef) => {
        const otherElement = otherTimelineRef.current;
        if (!otherElement) {
          return;
        }
        otherElement.scrollLeft = Math.round(percentage * (otherElement.scrollWidth - otherElement.offsetWidth));
      });
    },
    []
  );

  const handleScroll = React.useCallback(
    (element: HTMLDivElement) => {
      if (locksRef.current > 0) {
        locksRef.current -= 1;
        return;
      }
      locksRef.current = refs.length - 1;

      const otherRefs = refs.filter((ref) => ref.current !== element);
      synchronizeOthers(element, otherRefs);
    },
    [refs, synchronizeOthers]
  );

  const registerTimeline = React.useCallback(
    (ref: React.MutableRefObject<HTMLDivElement | undefined>) => {
      if (!ref.current) {
        return;
      }
      refs.push(ref);
      ref.current.addEventListener("scroll", function (this) {
        handleScroll(this);
      });
    },
    [refs, handleScroll]
  );

  const unregisterTimeline = React.useCallback(
    (ref: React.MutableRefObject<HTMLDivElement | undefined>) => {
      if (!ref.current) {
        return;
      }
      refs.splice(refs.indexOf(ref), 1);
      ref.current.removeEventListener("scroll", function (this) {
        handleScroll(this);
      });
    },
    [refs, handleScroll]
  );

  return [registerTimeline, unregisterTimeline];
}
