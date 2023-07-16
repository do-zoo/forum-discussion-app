import { z } from 'zod';

export const REGISTER_SCHEMA = z
  .object({
    name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6).max(16),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });
