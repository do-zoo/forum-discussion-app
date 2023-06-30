'use client';

import { Box } from '@mantine/core';
import React from 'react';
import { Header } from './header';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <Box mih="100vh" component="main" maw={512} mx="auto">
      <Header />
      {children}
    </Box>
  );
}
