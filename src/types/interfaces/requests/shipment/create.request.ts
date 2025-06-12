import { validCityNames, validPostalCodes } from "@/data";
import { z } from "zod";

export const createShipmentRequestSchema = z.object({
  recipientName: z
    .string({
      required_error: "Recipient name is required",
      invalid_type_error: "Recipient name must be a string",
    })
    .max(130, "Recipient name must be at most 130 characters long"),
  recipientPhone: z
    .string({
      required_error: "Recipient phone is required",
      invalid_type_error: "Recipient phone must be a string",
    })
    .regex(
      /^0[0-9]{9}$/,
      "Recipient phone must start with 0 and be 10 digits long"
    ),
  recipientEmail: z
    .string({
      invalid_type_error: "Recipient email must be a string",
    })
    .email("Invalid email format")
    .max(100, "Recipient email must be at most 100 characters long")
    .optional(),
  recipientCity: z.enum(validCityNames as [string, ...string[]], {
    required_error: "Recipient city is required",
    invalid_type_error: "Recipient city must be a valid city name",
    message: "Invalid recipient city name",
  }),
  recipientPostalCode: z.enum(validPostalCodes as [string, ...string[]], {
    required_error: "Recipient postal code is required",
    invalid_type_error: "Recipient postal code must be a valid postal code",
    message: "Invalid recipient postal code",
  }),
  recipientAddress: z
    .string({
      required_error: "Recipient address is required",
      invalid_type_error: "Recipient address must be a string",
    })
    .max(512, "Recipient address must be at most 512 characters long"),

  senderName: z
    .string({
      required_error: "Sender name is required",
      invalid_type_error: "Sender name must be a string",
    })
    .max(130, "Sender name must be at most 130 characters long"),
  senderPhone: z
    .string({
      required_error: "Sender phone is required",
      invalid_type_error: "Sender phone must be a string",
    })
    .regex(
      /^0[0-9]{9}$/,
      "Sender phone must start with 0 and be 10 digits long"
    ),
  senderAddress: z
    .string({
      required_error: "Sender address is required",
      invalid_type_error: "Sender address must be a string",
    })
    .max(512, "Sender address must be at most 512 characters long"),
  senderCity: z.enum(validCityNames as [string, ...string[]], {
    required_error: "Sender city is required",
    invalid_type_error: "Sender city must be a valid city name",
    message: "Invalid sender city name",
  }),
  senderPostalCode: z.enum(validPostalCodes as [string, ...string[]], {
    required_error: "Sender postal code is required",
    invalid_type_error: "Sender postal code must be a valid postal code",
    message: "Invalid sender postal code",
  }),

  packageDescription: z
    .string({
      required_error: "Package description is required",
      invalid_type_error: "Package description must be a string",
    })
    .max(255, "Package description must be at most 255 characters long"),
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
  specialInstructions: z
    .string({
      invalid_type_error: "Special instructions must be a string",
    })
    .max(512, "Special instructions must be at most 512 characters long")
    .optional(),
});

export type ICreateShipmentDTO = z.infer<typeof createShipmentRequestSchema>;
