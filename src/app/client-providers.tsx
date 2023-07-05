'use client';
export const dynamic = 'force-dynamic';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
