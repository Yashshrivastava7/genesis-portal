import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

type userType = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials, req) {
        const primsa = new PrismaClient();
        const user: userType = await primsa.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            role: token.role,
          },
        };
      }

      return session;
    },

    jwt: async ({ token, user }) => {
      const u = user as unknown as userType;
      if (user) {
        token.id = u.id;
        token.email = u.email;
        token.name = u.name;
        token.role = u.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
