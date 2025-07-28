import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma/prisma";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const validatedData = loginSchema.parse({ email, password });
        const user = await prisma.user.findFirst({
          where: {
            email: validatedData.email,
          },
        });

        if (!user) return null;
        const passwordMatch = await bcrypt.compare(
          validatedData.password,
          user.password as string
        );

        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
