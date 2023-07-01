'use client';
import { Box, Flex, Paper, Text, ThemeIcon } from '@mantine/core';
import React, { CSSProperties } from 'react';
import Rank1 from '@forum-discussion/assets/svg/rank-1.svg';
import Rank2 from '@forum-discussion/assets/svg/rank-2.svg';
import Rank3 from '@forum-discussion/assets/svg/rank-3.svg';

interface RankProps {
  pos: number;
}

const svgStyles: CSSProperties = {
  width: 24,
};

export function Rank({ pos }: RankProps) {
  switch (pos) {
    case 1:
      return <Rank1 style={svgStyles} />;
    case 2:
      return <Rank2 style={svgStyles} />;
    case 3:
      return <Rank3 style={svgStyles} />;

    default:
      return (
        <ThemeIcon size={28} color="gray.3" radius="xl">
          <Text color="gray.6">{pos}</Text>
        </ThemeIcon>
      );
  }
}
