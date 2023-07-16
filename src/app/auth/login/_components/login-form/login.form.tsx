'use client';
import { LOGIN_SCHEMA } from '@forum-discussion/utils/constants/schema-validation';
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
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconKey, IconMail } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [isLoading, toggle] = useToggle();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(LOGIN_SCHEMA),
  });

  const onSubmit = form.onSubmit(async values => {
    toggle();
    signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    }).then(res => {
      if (res?.url) {
        notifications.show({
          title: 'Oops, something wrong',
          message: 'Yeay... Login success!',
          color: 'green',
        });
        router.push(res?.url);
      }
      if (res?.error) {
        toggle();
        notifications.show({
          title: 'Oops, something wrong',
          message: res?.error,
          color: 'red',
        });
      }
    });
  });

  return (
    <>
      <Text align="center">
        <Title>Welcome back</Title>
        <Text>Please enter your details.</Text>
      </Text>
      <form onSubmit={onSubmit}>
        <Stack>
          <Stack spacing="xs">
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
            <Button type="submit" loading={isLoading}>
              Continue
            </Button>
          </Stack>
          <Divider label="or" labelPosition="center" />
          <Button
            variant="outline"
            component={Link}
            href="register"
            disabled={isLoading}
          >
            Sign up
          </Button>
        </Stack>
      </form>
    </>
  );
}
