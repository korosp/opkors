import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER ?? '',
      from: process.env.EMAIL_FROM ?? 'noreply@karlxai.com',
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/login?verify=1',
    error: '/login?error=1',
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
