import { adaptiveRender } from '@forum-discussion/utils';
import { cookies } from 'next/headers';
import { Desktop } from './_viewports';
export default function Home() {
  const viewport = cookies().get('viewport')?.value;

  return adaptiveRender(viewport, {
    desktop: <Desktop />,
    mobile: <Desktop />,
  });
}
