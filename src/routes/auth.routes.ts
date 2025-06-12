import { Router } from "express";

import { handleLogin, handleRegister } from "@controllers";
import { validateRequestBody } from "@middlewares";
import { loginRequestSchema, registerRequestSchema } from "@requests";

const authRoutes = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: sample@sample.com
 *               password:
 *                 type: string
 *                 example: samplePassword
 */
authRoutes.post("/login", validateRequestBody(loginRequestSchema), handleLogin);
authRoutes.post(
  "/register",
  validateRequestBody(registerRequestSchema),
  handleRegister
);

export { authRoutes };
