import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/db";

interface GoogleProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async jwt({ token, profile, account }) {
      if (account && profile) {
        const googleProfile = profile as GoogleProfile;
        token.id = googleProfile.sub;
        token.name = googleProfile.name;
        token.email = googleProfile.email;
        token.picture = googleProfile.picture;
      }

      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
        include: {
          subscription: true,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.picture = dbUser.image;
        token.isPremium = dbUser.subscription?.isPremium || false;
      }

      return token;
    },
  },
}; 