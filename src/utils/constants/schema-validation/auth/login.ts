import { z } from 'zod';

export const LOGIN_SCHEMA = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6).max(16),
});
