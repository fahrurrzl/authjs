import { prisma } from "@/prisma/prisma";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log("Error fetching user by id => ", error);
  }
};
