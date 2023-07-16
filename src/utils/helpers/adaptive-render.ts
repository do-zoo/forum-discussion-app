import type { ReactElement } from 'react';

interface AdaptiveRenderComponentsOption {
  desktop?: ReactElement;
  mobile?: ReactElement;
}

export const adaptiveRender = (
  viewport: string = 'desktop',
  components: AdaptiveRenderComponentsOption = {}
): ReactElement | null => {
  const { desktop, mobile } = components;
  if (viewport === 'mobile') return mobile || null;
  return desktop || null;
};
