import BrandLogo from '@forum-discussion/assets/svg/logo.svg';
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
  console.log(pathname);
  const theme = useMantineTheme();

  return (
    <Box component="aside" pos="sticky" w="100%" maw={342} top={0} left={0}>
      <Stack py={24} px="md" h="100vh" bg="white" maw={262}>
        <Stack>
          <Center>
            <Link href="/">
              <BrandLogo
                style={{
                  height: 60,
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
          <Text color="grape">Main Menu</Text>
          <Box>
            {MAIN_MENU.map((menu, index) => (
              <Box key={index} p={6}>
                <Button
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
                        pathname !== menu.path
                          ? theme.colors.dark[9]
                          : undefined,
                    },
                  }}
                  component={Link}
                  href={menu.path}
                >
                  {menu.label}
                </Button>
              </Box>
            ))}
            <Box p={6}>
              <Button
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
            </Box>
          </Box>
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
