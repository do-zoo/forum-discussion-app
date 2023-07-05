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
import { IconKey, IconUser } from '@tabler/icons-react';
import { IconMail } from '@tabler/icons-react';
import Link from 'next/link';

export function RegisterForm() {
  return (
    <>
      <Text align="center">
        <Title>Welcome</Title>
        <Text>Please enter your details.</Text>
      </Text>
      <Stack spacing="xs">
        <TextInput placeholder="Full Name" icon={<IconUser />} />
        <TextInput placeholder="jhon@example.com" icon={<IconMail />} />
        <PasswordInput
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          icon={<IconKey />}
        />
        <PasswordInput placeholder="password confirmation" icon={<IconKey />} />
        <Button>Continue</Button>
      </Stack>
      <Divider label="or" labelPosition="center" />
      <Button variant="outline" component={Link} href="login">
        Sign in
      </Button>
    </>
  );
}
