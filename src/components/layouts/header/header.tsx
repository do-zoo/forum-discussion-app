'use client';
import React from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  Header as MantineHeader,
  Stack,
  rem,
  useMantineTheme,
} from '@mantine/core';
import BrandLogoWithText from '@forum-discussion/assets/svg/logo-with-text.svg';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCategory,
  IconChevronDown,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { MAIN_MENU } from '../_menu';
import Link from 'next/link';

export function Header() {
  const [opened, toggleAction] = useDisclosure(false);
  const pathname = usePathname();
  const theme = useMantineTheme();

  return (
    <>
      <MantineHeader height={72} p="md" pos="sticky" top={0} zIndex={999999}>
        <Group h="100%" noWrap position="apart">
          <BrandLogoWithText
            style={{
              height: 32,
            }}
          />
          <ActionIcon
            variant="subtle"
            size="md"
            onClick={() => {
              toggleAction.toggle();
            }}
          >
            {opened ? <IconX /> : <IconMenu2 />}
          </ActionIcon>
        </Group>
      </MantineHeader>
      <Drawer
        opened={opened}
        onClose={toggleAction.close}
        withCloseButton={false}
        position="top"
        styles={{
          body: {
            padding: rem(8),
          },
          content: {
            minHeight: '100vh',
          },
        }}
      >
        <Stack pt={72}>
          <Stack spacing="sm">
            {MAIN_MENU.map((menu, index) => (
              <Button
                px={8}
                key={index}
                variant="subtle"
                size="md"
                fullWidth
                leftIcon={<menu.Icon />}
                styles={{
                  inner: {
                    justifyContent: 'flex-start',
                  },
                  label: {
                    color:
                      pathname !== menu.path ? theme.colors.dark[9] : undefined,
                  },
                }}
                component={Link}
                href={menu.path}
              >
                {menu.label}
              </Button>
            ))}
            <Button
              px={8}
              variant="subtle"
              size="md"
              fullWidth
              leftIcon={<IconCategory />}
              styles={{
                inner: {
                  justifyContent: 'flex-start',
                },
                label: {
                  flex: '1 0 auto',
                  color: theme.colors.dark[9],
                },
              }}
              rightIcon={<IconChevronDown />}
            >
              Categories
            </Button>
          </Stack>
          <Divider />
          <Stack>
            <Button size="md">Sign up</Button>
            <Button variant="light" size="md">
              Login
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
