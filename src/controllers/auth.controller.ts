import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// import { config } from "dotenv";

import { StatusCodes, UserRole } from "@enums";
import { convertToToken, createResponse, hashPassword } from "@utils";
import { ILoginRequestDTO, ILRegisterRequestDTO } from "@requests";
import { login, registerUser } from "@/services";

// config();
const prisma = new PrismaClient();

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ILoginRequestDTO;

    const user = await login(email, password);
    const token = convertToToken(user);

    const preparedUser = {
      ...user,
      token,
    };

    return createResponse(res, preparedUser, "Login success", StatusCodes.OK);
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Internal server error",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  return createResponse(res, null, "Logout Successful", StatusCodes.OK);
};

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phone,
      NIC,
      city,
      postalCode,
    } = req.body as ILRegisterRequestDTO;

    const isPhoneUsed = !!(await prisma.user.findFirst({
      where: {
        phone,
      },
    }));
    const isEmailUsed = !!(
      email &&
      (await prisma.user.findFirst({
        where: {
          email,
        },
      }))
    );
    const isNICUsed = !!(await prisma.user.findFirst({
      where: {
        NIC,
      },
    }));
    if (isEmailUsed || isPhoneUsed || isNICUsed) {
      return createResponse(
        res,
        null,
        "Email/Phone/NIC already used.",
        StatusCodes.CONFLICT
      );
    }
    const passwordHash = await hashPassword(password);

    const regUser = await registerUser({
      firstName,
      lastName,
      email,
      passwordHash,
      address,
      phone,
      NIC,
      city,
      postalCode,
      role: UserRole.USER,
    });

    const token = convertToToken(regUser);

    const preparedUser = {
      ...regUser,
      token,
    };

    return createResponse(
      res,
      regUser,
      "Registered successfully",
      StatusCodes.CREATED
    );
  } catch (err) {
    return createResponse(
      res,
      null,
      (err as Error).message || "Internal server error",
      ((err as any).code ?? StatusCodes.INTERNAL_SERVER_ERROR) as StatusCodes
    );
  }
};

export const handleForgotPassword = async (req: Request, res: Response) => {
  return createResponse(res, null, "Password reset link sent", StatusCodes.OK);
};
