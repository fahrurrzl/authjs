"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { loginSchema, TLogin } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (data: TLogin) => {
  try {
    const validatedData = loginSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    const { email, password } = validatedData;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.password || !user.email) {
      return { error: "User not found" };
    }

    await signIn("credentials", {
      email: user.email,
      password: password,
      redirectTo: "/dashboard",
    });

    return { success: "Login successful" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Please confirm your email address" };
      }
    }
    throw error;
  }
};
