import React, { ReactNode } from 'react';
import { usePrefetch } from './usePrefetch';

export interface PrefetchProps {
  prefetch: () => void;
  render: (callbackRef: (node: HTMLElement | null) => void) => ReactNode;
  cooldown?: number;
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
