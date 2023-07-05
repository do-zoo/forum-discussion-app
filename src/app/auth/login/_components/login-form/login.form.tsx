'use client';
import {
  Button,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconKey } from '@tabler/icons-react';
import { IconMail } from '@tabler/icons-react';
import Link from 'next/link';

export function LoginForm() {
  return (
    <>
      <Text align="center">
        <Title>Welcome back</Title>
        <Text>Please enter your details.</Text>
      </Text>
      <Stack spacing="xs">
        <TextInput placeholder="jhon@example.com" icon={<IconMail />} />
        <PasswordInput
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          icon={<IconKey />}
        />
        <Button>Continue</Button>
      </Stack>
      <Divider label="or" labelPosition="center" />
      <Button variant="outline" component={Link} href="register">
        Sign up
      </Button>
    </>
  );
}
