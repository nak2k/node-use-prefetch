import React, { ReactNode } from 'react';
import { usePrefetch } from './usePrefetch';

export interface PrefetchProps {
  prefetch: () => void;
  render: (callbackRef: (node: HTMLElement | null) => void) => ReactNode;

  /**
   * A cooldown time to avoid calling `prefetch` in succession.
   *
   * @default 300000 millisec
   */
  cooldown?: number;

  /**
   * A duration to wait before calling `prefetch`.
   *
   * @default 200 millisec
   */
  delay?: number;
}

export function Prefetch(props: PrefetchProps) {
  const {
    prefetch,
    render,
    cooldown,
    delay,
  } = props;

  const callbackRef = usePrefetch(prefetch, {
    cooldown,
    delay,
  });

  return <>{render(callbackRef)}</>;
}
