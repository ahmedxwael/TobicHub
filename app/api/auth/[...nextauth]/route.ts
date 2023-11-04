import prisma from "@/prisma";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      });

      session.user.id = user?.id.toString();
      session.user.admin = user?.admin;

      return session;
    },
    async signIn({ user }: any) {
      try {
        const storedUser = await prisma.user.findUnique({
          where: { email: user?.email },
        });

        if (!storedUser) {
          await prisma.user.create({
            data: {
              email: user?.email,
              name: user?.name,
              image: user?.image,
            },
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
