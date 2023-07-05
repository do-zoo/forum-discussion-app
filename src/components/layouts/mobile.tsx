'use client';

import { Box } from '@mantine/core';
import React from 'react';
import { Header } from './header';
import { useSelectedLayoutSegments } from 'next/navigation';
import { LAYOUT_BLACK_LIST } from './_variable';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const segment = useSelectedLayoutSegments();

  const enableHeader = !LAYOUT_BLACK_LIST.some(path => segment[0] === path);

  return (
    <Box mih="100vh" component="main" maw={512} mx="auto">
      {enableHeader && <Header />}
      {children}
    </Box>
  );
}
