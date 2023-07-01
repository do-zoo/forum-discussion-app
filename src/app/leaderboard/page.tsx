import { adaptiveRender } from '@forum-discussion/utils';
import { cookies } from 'next/headers';
import { Desktop, Mobile } from './_viewports';

export const metadata = {
  title: 'Leaderboard | Forum Discussion App',
};

export default function Leadarboard() {
  const viewport = cookies().get('viewport')?.value;
  return adaptiveRender(viewport, {
    desktop: <Desktop />,
    mobile: <Mobile />,
  });
}
