import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } =
  NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,

    session: {
      strategy: "jwt",
    },

    pages: {
      signIn: "/login",
    },

    providers: [
      Credentials({
        credentials: {
          username: { label: "Username" },
          password: {
            label: "Password",
            type: "password",
          },
        },

        async authorize(credentials) {
          const username = credentials.username;
          const password = credentials.password;

          if (
            typeof username !== "string" ||
            typeof password !== "string"
          ) {
            return null;
          }

          const user = await db.query.users.findFirst({
            where: eq(users.username, username),
          });

          if (!user || !user.passwordHash) {
            return null;
          }

          const valid = await bcrypt.compare(
            password,
            user.passwordHash
          );

          if (!valid) {
            return null;
          }

          return {
            id: String(user.id),
            name: user.name,
            email: user.username,
          };
        },
      }),
    ],
  });