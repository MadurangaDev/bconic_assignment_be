import { Response } from "express";

import { StatusCodes } from "@enums";
import { baseResponse } from "@responses";

export const createResponseBody = <T>(
  body: T | null,
  message: string
): baseResponse<T> => {
  return {
    body,
    message,
  };
};

export const createResponse = <T>(
  res: Response,
  body: T | null,
  message: string,
  statusCode: StatusCodes
): Response => {
  return res.status(statusCode).json(createResponseBody(body, message));
};
