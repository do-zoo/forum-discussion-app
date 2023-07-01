'use client';
import { Rank } from '@forum-discussion/components/rank';
import {
  Avatar,
  Center,
  Group,
  Table,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React, { CSSProperties } from 'react';

const thStyles: React.CSSProperties = {
  paddingTop: 12,
  paddingBottom: 12,
};

interface LeaderBoardTableProps {
  theadStyles?: CSSProperties;
}

export function LeaderBoardTable({ theadStyles }: LeaderBoardTableProps) {
  const theme = useMantineTheme();
  const ths = (
    <tr
      style={{
        backgroundColor: theme.colors.gray[1],
        boxShadow: `0px 1.5px 1.5px 0px ${theme.colors.gray[4]}`,
      }}
    >
      <th
        style={{
          ...thStyles,

          width: 72,
        }}
      >
        <Text fw={500} color="gray.6">
          Rank
        </Text>
      </th>
      <th style={thStyles}>
        <Text fw={500} color="gray.6">
          Name
        </Text>
      </th>
      <th
        style={{
          ...thStyles,
          width: 90,
        }}
      >
        <Text fw={500} color="gray.6">
          Score
        </Text>
      </th>
    </tr>
  );

  const rows = Array(5)
    .fill(0)
    .map((_, index) => (
      <tr key={index}>
        <td>
          <Center>
            <Rank pos={index + 1} />
          </Center>
        </td>
        <td>
          <Group noWrap>
            <Avatar radius="xl" />
            <Text fw={500}>Hasanudin Entop</Text>
          </Group>
        </td>
        <td>
          <Text fw={500}>1000</Text>
        </td>
      </tr>
    ));
  return (
    <Table captionSide="bottom" horizontalSpacing="lg" verticalSpacing="lg">
      <thead style={theadStyles}>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
