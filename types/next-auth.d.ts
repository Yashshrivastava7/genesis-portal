import { DefaultUser } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
