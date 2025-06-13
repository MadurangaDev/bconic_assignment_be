import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { createResponse, verifyToken } from "@utils";
import { StatusCodes, UserRole } from "@enums";
import { IUserFromDB } from "@interfaces";

config();

declare global {
  namespace Express {
    interface Request {
      user?: IUserFromDB;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return createResponse(
        res,
        null,
        "Access denied. No token provided.",
        StatusCodes.UNAUTHORIZED
      );
    }

    const decoded = await verifyToken(token);
    if (decoded.status !== StatusCodes.OK) {
      return createResponse(
        res,
        null,
        "Invalid token.",
        StatusCodes.UNAUTHORIZED
      );
    }

    req.user = decoded.data as IUserFromDB;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return createResponse(
        res,
        null,
        "Invalid token.",
        StatusCodes.UNAUTHORIZED
      );
    }

    if (error instanceof jwt.TokenExpiredError) {
      return createResponse(
        res,
        null,
        "Token expired.",
        StatusCodes.UNAUTHORIZED
      );
    }

    return createResponse(
      res,
      null,
      "Internal server error.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return createResponse(
        res,
        null,
        "Access denied. No user found.",
        StatusCodes.UNAUTHORIZED
      );
    }

    if (!roles.includes(req.user.role)) {
      return createResponse(
        res,
        null,
        "Access denied. Insufficient permissions.",
        StatusCodes.FORBIDDEN
      );
    }

    next();
  };
};
