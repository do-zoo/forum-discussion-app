'use client';
import Logo from '@forum-discussion/assets/svg/logo.svg';
import { Box, Container, Group, Stack } from '@mantine/core';
import React from 'react';

export function MobileAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Group mih="100vh" bg="white">
      <Container maw={500} w="100%" px="md">
        <Box maw={320} mx="auto">
          <Stack>
            <Logo
              style={{
                height: 60,
              }}
            />

            {children}
          </Stack>
        </Box>
      </Container>
    </Group>
  );
}
