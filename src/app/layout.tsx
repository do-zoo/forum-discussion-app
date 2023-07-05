import {
  DesktopLayout,
  MobileLayout,
} from '@forum-discussion/components/layouts';
import { RootStyleRegistry } from '@forum-discussion/configs';
import { QueryProvider } from '@forum-discussion/configs/react-query';
import { adaptiveRender } from '@forum-discussion/utils';
import { cookies } from 'next/headers';
import ClientProviders from './client-providers';

export const metadata = {
  title: 'Forum Discussion App',
  description: 'Forum Discussion App is app for discussion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <QueryProvider>
          <ClientProviders>
            <RootStyleRegistry>
              <Layout>{children}</Layout>
            </RootStyleRegistry>
          </ClientProviders>
        </QueryProvider>
      </body>
    </html>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  const viewport = cookies().get('viewport')?.value;

  return adaptiveRender(viewport, {
    desktop: <DesktopLayout>{children}</DesktopLayout>,
    mobile: <MobileLayout>{children}</MobileLayout>,
  });
}
