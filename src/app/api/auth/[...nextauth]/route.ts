import { createOptions } from '@forum-discussion/configs/next-auth';
import { type NextApiRequest } from 'next';
import NextAuth from 'next-auth';

async function handler(req: NextApiRequest, res: any) {
  return await NextAuth(req, res, createOptions(req));
}

export async function GET(req: Request, res: any) {
  return await handler(req as unknown as NextApiRequest, res);
}

export async function POST(req: Request, res: any) {
  return await handler(req as unknown as NextApiRequest, res);
}
