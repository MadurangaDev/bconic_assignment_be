import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z
    .string({
      invalid_type_error: "email must be a string",
      required_error: "email is required",
    })
    .email("invalid email"),
  password: z.string({
    invalid_type_error: "password must be a string",
    required_error: "password is required",
  }),
});

export type ILoginRequestDTO = z.infer<typeof loginRequestSchema>;
