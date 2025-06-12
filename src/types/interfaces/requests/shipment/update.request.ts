import { z } from "zod";
import { createShipmentRequestSchema } from "./create.request";
import { TrackingStatus } from "@/types/enums";

export const updateShipmentParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateShipmentRequestSchema = createShipmentRequestSchema
  .partial()
  .extend({
    paymentStatus: z.boolean().optional(),
    currentStatus: z
      .enum(Object.values(TrackingStatus) as [string, ...string[]])
      .optional(),
  });

export type IUpdateShipmentDTO = z.infer<typeof updateShipmentRequestSchema> & {
  id: number;
};
