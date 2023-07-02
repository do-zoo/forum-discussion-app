'use client';
import { HydrateProps, Hydrate as RQHydrate } from '@tanstack/react-query';

export function HydrateReactQuery(props: HydrateProps) {
  return <RQHydrate {...props} />;
}
