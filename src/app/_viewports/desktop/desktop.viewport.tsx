'use client';
import { DiscussionCard } from '@forum-discussion/components/card';
import { useThreads } from '@forum-discussion/hooks-api';
import { Box, Button, Group, Paper, Stack } from '@mantine/core';
import { IconSunrise } from '@tabler/icons-react';
import { IconRocket } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

export function Desktop() {
  const { data: threads, isLoading } = useThreads({});

  return (
    <Box>
      <Paper
        radius="xs"
        px="sm"
        py="sm"
        pos="sticky"
        top={0}
        mb="md"
        style={{
          zIndex: 10,
        }}
        shadow="xs"
      >
        <Group spacing="sm">
          <Button leftIcon={<IconRocket />} variant="light" radius="xl">
            Populer
          </Button>
          <Button
            leftIcon={<IconSunrise />}
            variant="subtle"
            color="gray"
            radius="xl"
          >
            New
          </Button>
        </Group>
      </Paper>
      <Stack pos="relative">
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <DiscussionCard key={index} />
          ))}
      </Stack>
    </Box>
  );
}
