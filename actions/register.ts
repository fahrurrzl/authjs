"use server";

import { prisma } from "@/prisma/prisma";
import { registerSchema, TRegister } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (data: TRegister) => {
  try {
    const validatedData = registerSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    const { name, email, password, confirmPassword } = validatedData;

    if (password !== confirmPassword) {
      return { error: "Password not match" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return { error: "User already exists" };
    }

    const lowercaseEmail = email.toLowerCase();

    await prisma.user.create({
      data: {
        name,
        email: lowercaseEmail,
        password: hashedPassword,
      },
    });

    return { success: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
