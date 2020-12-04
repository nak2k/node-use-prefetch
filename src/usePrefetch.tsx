import { useCallback, useRef } from 'react';

export interface PrefetchOptions {
  cooldown?: number;
  delay?: number;
}

export function usePrefetch(
  prefetch: () => void,
  options: PrefetchOptions = {}
) {
  const {
    cooldown = 300000,
    delay = 200,
  } = options;

  // Keep a newest reference of `prefetch` always.
  const prefetchRef = useRef(prefetch);

  // Keep a process to clean up a previous node.
  const cleanUpRef = useRef<() => void>();

  const callbackRef = useCallback((node: HTMLElement | null) => {
    // Clean up a previous node.
    if (cleanUpRef.current) {
      cleanUpRef.current();
    }

    // Release a reference of a previous node when a component unmounts.
    if (!node) {
      cleanUpRef.current = undefined;
      return;
    }

    // Call `prefetch` with cooldown.
    let lastCall: number = Number.MIN_SAFE_INTEGER;

    function callPrefetch() {
      const now = Date.now();
      if (now - lastCall > cooldown) {
        prefetchRef.current();
        lastCall = now;
      }
    }

    let delayHandle: number | undefined;

    const schedulePrefetchHandler = () => {
      delayHandle = setTimeout(() => {
        delayHandle = undefined;
        callPrefetch();
      }, delay) as any;
    };

    const cancelPrefetchHandler = () => {
      clearTimeout(delayHandle);
    };

    node.addEventListener('mouseover', schedulePrefetchHandler);
    node.addEventListener('mouseout', cancelPrefetchHandler);
    node.addEventListener('mousedown', callPrefetch);
    node.addEventListener('touchstart', callPrefetch);
    node.addEventListener('pointerover', schedulePrefetchHandler);
    node.addEventListener('pointerout', cancelPrefetchHandler);
    node.addEventListener('pointerdown', callPrefetch);

    // Set a process to clean up when this callback ref is called at next time.
    cleanUpRef.current = () => {
      clearTimeout(delayHandle);
      node.removeEventListener('mouseover', schedulePrefetchHandler);
      node.removeEventListener('mouseout', cancelPrefetchHandler);
      node.removeEventListener('mousedown', callPrefetch);
      node.removeEventListener('touchstart', callPrefetch);
      node.removeEventListener('pointerover', schedulePrefetchHandler);
      node.removeEventListener('pointerout', cancelPrefetchHandler);
      node.removeEventListener('pointerdown', callPrefetch);
    };
  }, []);

  prefetchRef.current = prefetch;

  return callbackRef;
}
