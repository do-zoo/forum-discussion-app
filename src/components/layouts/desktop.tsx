'use client';

import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { SideBar } from './sidebar';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const TOP_CATEGORIES = [
  {
    label: 'React Developer',
    value: 10000,
  },
  {
    label: 'NodeJS',
    value: 1000,
  },
  {
    label: 'CSS',
    value: 100,
  },
];

const LEADERBOARDS = [
  {
    name: 'React Developer',
    value: 10000,
  },
  {
    name: 'NodeJS',
    value: 1000,
  },
  {
    name: 'CSS',
    value: 100,
  },
];

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <Box bg="gray.2" mih="100vh">
      <Flex justify="space-between">
        <SideBar />
        <Box component="main" maw={512} w="100%">
          {children}
        </Box>
        <Box component="aside" pos="sticky" w="100%" maw={342} top={0} left={0}>
          <Stack py={24} px="md" h="100vh" spacing="xl">
            <Box>
              <Title order={4} mb="sm">
                Top Categories
              </Title>
              <Group>
                {TOP_CATEGORIES.map((category, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    radius="xl"
                    rightIcon={
                      <Text fw="bold" color="dark" span>
                        17k
                      </Text>
                    }
                    color="gray"
                  >
                    <Text color="dark">{category.label}</Text>
                  </Button>
                ))}
              </Group>
            </Box>
            <Box>
              <Group noWrap position="apart" mb="sm">
                <Title order={4}>Leaderboard</Title>
                <Anchor fw={600}>Detail</Anchor>
              </Group>
              <Table verticalSpacing="xs" fontSize="md" fw={500}>
                <tbody>
                  {LEADERBOARDS.map((leaderboard, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{leaderboard.name}</td>
                      <td>
                        <Text align="right" color="grape">
                          {leaderboard.value} points
                        </Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
            <Text color="dimmed" fw="lighter">
              Forum Diskusi © 2023
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
