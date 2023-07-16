'use client';
import { useRegister } from '@forum-discussion/hooks-api';
import { REGISTER_SCHEMA } from '@forum-discussion/utils/constants/schema-validation';
import {
  Button,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconKey, IconMail, IconUser } from '@tabler/icons-react';
import omit from 'lodash/omit';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export function RegisterForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
    validate: zodResolver(REGISTER_SCHEMA),
  });

  const { mutate: register, isLoading } = useRegister();

  const onSubmit = form.onSubmit(values => {
    const { email, name, password } = omit(values, 'confirm');
    register(
      { name, email, password },
      {
        onError(err) {
          const message = err?.response?.data?.message;
          if (message) {
            form.setFieldError('email', message);
          }
        },
        onSuccess() {
          signIn('credentials', {
            email,
            password,
          });
        },
      }
    );
  });

  return (
    <>
      <Text align="center">
        <Title>Welcome</Title>
        <Text>Please enter your details.</Text>
      </Text>
      <form onSubmit={onSubmit}>
        <Stack>
          <Stack spacing="xs">
            <TextInput
              placeholder="Full Name"
              icon={<IconUser />}
              {...form.getInputProps('name')}
            />
            <TextInput
              placeholder="jhon@example.com"
              icon={<IconMail />}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              icon={<IconKey />}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              placeholder="password confirmation"
              icon={<IconKey />}
              {...form.getInputProps('confirm')}
            />
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </Stack>
          <Divider label="or" labelPosition="center" />
          <Button
            variant="outline"
            component={Link}
            href="login"
            disabled={isLoading}
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </>
  );
}
