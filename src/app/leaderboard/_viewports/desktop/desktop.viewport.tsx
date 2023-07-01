'use client';
import { LeaderBoardTable } from '@forum-discussion/components/table';
import { Paper, Text } from '@mantine/core';

export function Desktop() {
  return (
    <Paper shadow="xs" radius="xs">
      <Text
        size="lg"
        fw={600}
        px="sm"
        py={20}
        pos="sticky"
        top={0}
        style={{ zIndex: 101 }}
        bg="white"
      >
        Leaderboard
      </Text>

      <LeaderBoardTable
        theadStyles={{
          position: 'sticky',
          top: 68,
          left: 0,
          zIndex: 100,
        }}
      />
    </Paper>
  );
}
