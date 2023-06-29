import { NextResponse } from 'next/server';

export const withCookie = (
  res: NextResponse,
  ...options: Parameters<NextResponse['cookies']['set']>
) => {
  res.cookies.set(...options);

  return res;
};
