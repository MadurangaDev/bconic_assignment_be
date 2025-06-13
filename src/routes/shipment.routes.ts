import { Router } from "express";
import {
  handleCreateShipment,
  handleGetShipmentById,
  handleUpdateShipment,
  handleGetAllShipments,
  handleGetDeliveryFee,
  getTrackingHistory,
} from "@controllers";
import { validateRequestBody, validateRequestParams } from "@middlewares";
import {
  createShipmentRequestSchema,
  updateShipmentParamsSchema,
  updateShipmentRequestSchema,
} from "@requests";
import { calculateShippingCostRequestSchema } from "@/types/interfaces/requests/shipment/calculate.request";

const shipmentRoutes = Router();

shipmentRoutes.post(
  "/",
  validateRequestBody(createShipmentRequestSchema),
  handleCreateShipment
);
shipmentRoutes.get("/", handleGetAllShipments);
shipmentRoutes.get(
  "/:id",
  validateRequestParams(updateShipmentParamsSchema),
  handleGetShipmentById
);
shipmentRoutes.patch(
  "/:id",
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
  validateRequestParams(updateShipmentParamsSchema),
  getTrackingHistory
);

export { shipmentRoutes };
