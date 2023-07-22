'use client';
import BrandLogoWithText from '@forum-discussion/assets/svg/logo-with-text.svg';
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  Header as MantineHeader,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCategory,
  IconChevronDown,
  IconLogout,
  IconMenu2,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_MENU } from '../_menu';
import { useEffect } from 'react';
import { JWT } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  session: JWT | null;
}

export function Header({ session }: HeaderProps) {
  const [opened, toggleAction] = useDisclosure(false);
  const pathname = usePathname();
  const theme = useMantineTheme();
  useEffect(() => {
    toggleAction.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  function isActive(path: string) {
    if (pathname !== '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  }

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
                    color: isActive(menu.path)
                      ? undefined
                      : theme.colors.dark[9],
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
          {session ? (
            <div>
              <Text color="grape" mb="xs">
                Account
              </Text>
              <Stack spacing="sm">
                <Button
                  px={8}
                  variant="subtle"
                  size="md"
                  fullWidth
                  leftIcon={<IconUser />}
                  styles={{
                    inner: {
                      justifyContent: 'flex-start',
                    },
                    label: {
                      color: isActive('/profile')
                        ? undefined
                        : theme.colors.dark[9],
                    },
                  }}
                  component={Link}
                  href="/profile"
                >
                  Profile
                </Button>

                <Button
                  px={8}
                  variant="subtle"
                  size="md"
                  fullWidth
                  leftIcon={<IconLogout />}
                  color="red"
                  styles={{
                    inner: {
                      justifyContent: 'flex-start',
                    },
                    label: {
                      flex: '1 0 auto',
                    },
                  }}
                  onClick={async () => await signOut()}
                >
                  Logout
                </Button>
              </Stack>
            </div>
          ) : (
            <>
              <Divider />
              <Stack>
                <Button size="md" component={Link} href="/auth/register">
                  Sign up
                </Button>
                <Button
                  variant="light"
                  size="md"
                  component={Link}
                  href="/auth/login"
                >
                  Login
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
