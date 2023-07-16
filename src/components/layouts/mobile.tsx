'use client';

import { Box } from '@mantine/core';
import React from 'react';
import { Header } from './header';
import { useSelectedLayoutSegments } from 'next/navigation';
import { LAYOUT_BLACK_LIST } from './_variable';
import { JWT } from 'next-auth/jwt';

interface MobileLayoutProps {
  children: React.ReactNode;
  session: JWT | null;
}

export function MobileLayout({ children, session }: MobileLayoutProps) {
  const segment = useSelectedLayoutSegments();

  const enableHeader = !LAYOUT_BLACK_LIST.some(path => segment[0] === path);

  return (
    <Box mih="100vh" component="main" maw={512} mx="auto">
      {enableHeader && <Header session={session} />}
      {children}
    </Box>
  );
}
