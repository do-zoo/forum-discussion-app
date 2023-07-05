import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

export const oAuthProviders = {
  google: GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  }),
  facebook: FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
  }),
  apple: AppleProvider({
    clientId: process.env.APPLE_CLIENT_ID ?? '',
    clientSecret: process.env.APPLE_CLIENT_SECRET ?? '',
  }),
} as const;

export default oAuthProviders;
