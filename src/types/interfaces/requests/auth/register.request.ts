import { validCityNames, validPostalCodes } from "@/data";
import { z } from "zod";

export const registerRequestSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: "first name must be a string",
      required_error: "first name is required",
    })
    .max(60, "first name must be maximum 60 characters length"),
  lastName: z
    .string({
      invalid_type_error: "last name must be a string",
      required_error: "last name is required",
    })
    .max(70, "last name must be maximum 70 characters length"),
  address: z
    .string({
      invalid_type_error: "address must be a string",
      required_error: "address is required",
    })
    .max(512, "address must be maximum 512 characters length"),
  city: z.enum(validCityNames as [string, ...string[]], {
    invalid_type_error: "city must be a valid city name",
    required_error: "city is required",
    message: "Invalid city name",
  }),
  postalCode: z.enum(validPostalCodes as [string, ...string[]], {
    invalid_type_error: "postal code must be a valid postal code",
    required_error: "postal code is required",
    message: "Invalid postal code",
  }),
  email: z
    .string({
      invalid_type_error: "email must be a string",
      required_error: "email is required",
    })
    .email("invalid email"),
  phone: z
    .string({
      invalid_type_error: "phone must be a string",
      required_error: "phone is required",
    })
    .regex(/^0[0-9]{9}$/, "Phone must start with 0 and be 10 digits long"),
  NIC: z
    .string({
      invalid_type_error: "NIC must be a string",
      required_error: "NIC is required",
    })
    .regex(
      /^(([5-9]{1})([0-9]{1})([0-3,5-8]{1})([0-9]{6})([vVxX]))|(([1-2]{1})([0,9]{1})([0-9]{2})([0-3,5-8]{1})([0-9]{7}))/,
      "Invalid NIC format"
    ),
  //   role: z.enum(["USER", "ADMIN"]),
  // .default("USER")
  password: z
    .string({
      invalid_type_error: "password must be a string",
      required_error: "password is required",
    })
    .min(8, "Password must be at least 8 characters long")
    .max(24, "Password must be maximum 24 characters length"),
});

export type ILRegisterRequestDTO = z.infer<typeof registerRequestSchema>;
