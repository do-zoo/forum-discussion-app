import BrandLogoWithText from '@forum-discussion/assets/svg/logo-with-text.svg';
import {
  Box,
  Button,
  Center,
  Divider,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconCategory, IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_MENU } from '../_menu';

export function SideBar() {
  const pathname = usePathname();

  const theme = useMantineTheme();

  return (
    <Box component="aside" pos="fixed" w="100%" maw={342} top={0} left={0}>
      <Stack py={24} px="md" h="100vh" bg="white" maw={262}>
        <Stack>
          <Center>
            <Link href="/">
              <BrandLogoWithText
                style={{
                  height: 40,
                }}
              />
            </Link>
          </Center>
          <Divider />
        </Stack>
        <Box
          style={{
            flex: '1 1 auto',
          }}
        >
          <Text color="grape" mb="xs">
            Main Menu
          </Text>
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
        </Box>
        <Stack>
          <Divider />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet
            at dolor id porta.
          </Text>
          <Button radius="xl" size="md">
            Join
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
