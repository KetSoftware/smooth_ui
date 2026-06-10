import { useEffect, useRef, useState } from 'react';

export interface UseDelayedLoaderOptions {
  /** Wait this long before showing the loader. Fast responses never flash a spinner (default 300ms). */
  delay?: number;
  /** Once visible, keep the loader for at least this long to avoid a flicker on hide (default 200ms). */
  minDuration?: number;
}

/*
  Deferred loading indicator — the "spin delay" pattern.

  Problem: showing a spinner on every fetch feels jittery when the API responds in ~50ms,
  but hiding it instantly when a slow request finishes at 510ms (after a 500ms delay) also flickers.

  - delay: don't show until loading has been true for `delay` ms
  - minDuration: once shown, stay visible for at least `minDuration` ms after loading ends

  Same idea as the `spin-delay` npm package, kept inline to avoid another dependency.
*/
export function useDelayedLoader(isLoading: boolean, options: UseDelayedLoaderOptions = {}): boolean {
  const { delay = 300, minDuration = 200 } = options;
  const [showLoader, setShowLoader] = useState(false);
  const delayTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const shownAt = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      clearTimeout(hideTimer.current);
      delayTimer.current = setTimeout(() => {
        shownAt.current = Date.now();
        setShowLoader(true);
      }, delay);
    } else {
      clearTimeout(delayTimer.current);

      if (shownAt.current !== null) {
        const remaining = minDuration - (Date.now() - shownAt.current);
        hideTimer.current = setTimeout(
          () => {
            shownAt.current = null;
            setShowLoader(false);
          },
          Math.max(0, remaining)
        );
      } else {
        setShowLoader(false);
      }
    }

    return () => {
      clearTimeout(delayTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, [isLoading, delay, minDuration]);

  return showLoader;
}
