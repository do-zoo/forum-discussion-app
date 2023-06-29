import { RootStyleRegistry } from '@forum-discussion/configs';

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
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
