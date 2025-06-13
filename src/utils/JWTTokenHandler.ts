import jwt from "jsonwebtoken";
import { config } from "dotenv";

import { StatusCodes } from "@enums";

config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const convertToToken = (value: any): string => {
  return jwt.sign(value, JWT_SECRET);
};

export const verifyToken = (
  token: string
): Promise<{ status: StatusCodes; data: any }> => {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) return resolve({ status: StatusCodes.FORBIDDEN, data: null });
      return resolve({ status: StatusCodes.OK, data });
    });
  });
};
