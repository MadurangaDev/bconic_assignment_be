import { Router } from "express";
import {
  handleCreateShipment,
  handleGetShipmentById,
  handleUpdateShipment,
  handleGetAllShipments,
  handleGetDeliveryFee,
  getTrackingHistory,
} from "@controllers";
import {
  authenticateToken,
  authorizeRoles,
  validateRequestBody,
  validateRequestParams,
} from "@middlewares";
import {
  createShipmentRequestSchema,
  updateShipmentParamsSchema,
  updateShipmentRequestSchema,
} from "@requests";
import { calculateShippingCostRequestSchema } from "@/types/interfaces/requests/shipment/calculate.request";
import { UserRole } from "@/types/enums";

const shipmentRoutes = Router();

shipmentRoutes.post(
  "/",
  authenticateToken,
  authorizeRoles(UserRole.USER),
  validateRequestBody(createShipmentRequestSchema),
  handleCreateShipment
);
shipmentRoutes.get(
  "/",
  authenticateToken,
  authorizeRoles(UserRole.USER, UserRole.ADMIN),
  handleGetAllShipments
);
shipmentRoutes.get(
  "/:id",
  authenticateToken,
  authorizeRoles(UserRole.USER, UserRole.ADMIN),
  validateRequestParams(updateShipmentParamsSchema),
  handleGetShipmentById
);
shipmentRoutes.patch(
  "/:id",
  authenticateToken,
  authorizeRoles(UserRole.ADMIN),
  validateRequestParams(updateShipmentParamsSchema),
  validateRequestBody(updateShipmentRequestSchema),
  handleUpdateShipment
);
shipmentRoutes.post(
  "/calculate-fee",
  validateRequestBody(calculateShippingCostRequestSchema),
  handleGetDeliveryFee
);
shipmentRoutes.get(
  "/:id/history",
  authenticateToken,
  authorizeRoles(UserRole.USER, UserRole.ADMIN),
  validateRequestParams(updateShipmentParamsSchema),
  getTrackingHistory
);

export { shipmentRoutes };
