import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

import { createResponse } from "@utils";
import { StatusCodes } from "@enums";

export const validateRequestBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return createResponse(
        res,
        null,
        result.error.issues[0]?.message || "Invalid request",
        StatusCodes.BAD_REQUEST
      );
    }
    next();
  };

export const validateRequestQuery =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return createResponse(
        res,
        null,
        result.error.issues[0]?.message || "Invalid request",
        StatusCodes.BAD_REQUEST
      );
    }
    next();
  };

export const validateRequestParams =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return createResponse(
        res,
        null,
        result.error.issues[0]?.message || "Invalid request",
        StatusCodes.BAD_REQUEST
      );
    }
    next();
  };

export const validateRequestHeaders =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.headers);
    if (!result.success) {
      return createResponse(
        res,
        null,
        result.error.issues[0]?.message || "Invalid request",
        StatusCodes.BAD_REQUEST
      );
    }
    next();
  };
