require("module-alias/register");

import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { StatusCodes } from "@enums";
import { createResponse } from "@utils";
import { authRoutes, shipmentRoutes } from "@routes";
import { swaggerSpec } from "@configs";

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);
app.use("/shipments", shipmentRoutes);

// Root & Fallback Routes
app.all("/", (req: Request, res: Response): Response => {
  return createResponse(
    res,
    "welcome to API",
    "API is running",
    StatusCodes.OK
  );
});
app.all("*", (req: Request, res: Response) => {
  return createResponse(
    res,
    null,
    "Route not found or method not allowed",
    StatusCodes.NOT_FOUND
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
