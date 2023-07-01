'use client';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import {
  IconArrowDown,
  IconArrowUp,
  IconMessageCircle,
  IconPointFilled,
  IconShare,
} from '@tabler/icons-react';
import React from 'react';

export function DiscussionCard() {
  return (
    <Paper py="sm" px="xs">
      <Group noWrap spacing={0}>
        <Stack w={28} spacing={6} align="center">
          <ActionIcon color="gray" radius="xl" variant="light">
            <IconArrowUp size={rem(18)} />
          </ActionIcon>
          <Text size="sm" fw={500}>
            10k
          </Text>
          <ActionIcon color="gray" radius="xl" variant="light">
            <IconArrowDown size={rem(18)} />
          </ActionIcon>
        </Stack>
        <Stack
          style={{
            flex: '1 1 auto',
          }}
          spacing="xs"
          px="sm"
        >
          <Group position="apart">
            <Group spacing="xs">
              <Avatar size="sm" />
              <Text size="sm">Edward Edo</Text>
              <IconPointFilled size={rem(12)} />
              <Text size="sm" color="dimmed">
                7 hours ago
              </Text>
            </Group>
            <Text fw={600}>React Developer</Text>
          </Group>
          <Box>
            <Title order={4} mb={6}>
              Lorem ipsum dolor sit amet
            </Title>
            <Text lineClamp={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              laoreet at dolor id porta. Cras iaculis eleifend metus, ut congue
              tellus dignissim eget. Proin non arcu ullamcorper, ornare tellus
              sed, fermentum diam. Nulla augue lacus, sagittis eget volutpat...
            </Text>
          </Box>
          <Group spacing="xs">
            <Button
              leftIcon={<IconMessageCircle size={rem(18)} />}
              variant="subtle"
              color="gray"
              size="xs"
            >
              12 Comments
            </Button>
            <Button
              leftIcon={<IconShare size={rem(18)} />}
              variant="subtle"
              color="gray"
              size="xs"
            >
              Share
            </Button>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
}
