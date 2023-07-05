'use client';
import LogoWithText from '@forum-discussion/assets/svg/logo-with-text.svg';
import Logo from '@forum-discussion/assets/svg/logo.svg';
import {
  BackgroundImage,
  Box,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import React from 'react';

export function DesktopAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Group h="100vh" bg="white" noWrap>
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
      <BackgroundImage
        src="/assets/jpg/discussion.jpg"
        h="100vh"
        style={{
          flex: 1,
        }}
        component={Paper}
        radius={`${rem(48)} 0 0 ${rem(48)}`}
      >
        <Stack align="center" p={88}>
          <LogoWithText
            style={{
              height: 60,
            }}
          />
          <Text size="xl" fw={600} color="white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </Stack>
      </BackgroundImage>
    </Group>
  );
}
