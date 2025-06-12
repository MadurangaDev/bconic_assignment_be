import { z } from "zod";

export const calculateShippingCostRequestSchema = z.object({
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .min(0.01, "Weight must be at least 0.01 kg"),
  dimensions: z
    .string({
      required_error: "Dimensions are required",
      invalid_type_error: "Dimensions must be a string",
    })
    .regex(
      /^\d+x\d+x\d+$/,
      "Dimensions must be in the format WxHxD (e.g., 10x20x30)"
    )
    .max(50, "Dimensions must be at most 50 characters long"),
});
export type ICalculateShippingCostDTO = z.infer<
  typeof calculateShippingCostRequestSchema
>;
