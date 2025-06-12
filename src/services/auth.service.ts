import { PrismaClient } from "@prisma/client";

import { IUser, IUserFromDB } from "@interfaces";
import { comparePassword } from "@utils";
import { StatusCodes, UserRole } from "@enums";

const prisma = new PrismaClient();

export const registerUser = async (
  user: IUser
): Promise<Omit<IUserFromDB, "passwordHash">> => {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    const { passwordHash, ...userWithoutPassword } = newUser;
    return {
      ...userWithoutPassword,
      role: userWithoutPassword.role as UserRole,
    };
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to create db record",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const login = async (
  email: string,
  password: string
): Promise<Omit<IUserFromDB, "passwordHash">> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw {
        message: "User not found",
        code: StatusCodes.NOT_FOUND,
      };
    }
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw {
        message: "Invalid credentials",
        code: StatusCodes.UNAUTHORIZED,
      };
    }
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      role: userWithoutPassword.role as UserRole,
    };
  } catch (err) {
    throw {
      message: (err as Error).message || "Failed to fetch user",
      code: ((err as any).code ??
        StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes,
    };
  }
};
