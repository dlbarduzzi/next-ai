import { z } from "zod"
import { strings } from "@/tools/strings"

export const PASSWORD_MIN_CHARS = 8
export const PASSWORD_MAX_CHARS = 72

export const signUpSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Not a valid email"),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(1, "Password is required")
    .min(PASSWORD_MIN_CHARS, {
      message: `Password must be at least ${PASSWORD_MIN_CHARS} characters long`,
    })
    .max(PASSWORD_MAX_CHARS, {
      message: `Password must be at most ${PASSWORD_MAX_CHARS} characters long`,
    }),
}).superRefine((input, ctx) => {
  if (!strings(input.password).hasNumber()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 number",
    })
  }
  if (!strings(input.password).hasSpecialChar()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 special character",
    })
  }
  if (!strings(input.password).hasLowercaseChar()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 lowercase character",
    })
  }
  if (!strings(input.password).hasUppercaseChar()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least 1 uppercase character",
    })
  }
})

export type SignUpSchema = z.infer<typeof signUpSchema>
