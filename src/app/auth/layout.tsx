import { adaptiveRender } from '@forum-discussion/utils';
import { cookies } from 'next/headers';
import React from 'react';
import { DesktopAuthLayout, MobileAuthLayout } from './_components';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewport = cookies().get('viewport')?.value;

  return adaptiveRender(viewport, {
    mobile: <MobileAuthLayout>{children}</MobileAuthLayout>,
    desktop: <DesktopAuthLayout>{children}</DesktopAuthLayout>,
  });
}
