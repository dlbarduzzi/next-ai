import type { AppContext } from "@/trpc/init"
import type { UserSchema } from "@/db/schemas"

import bcrypt from "bcryptjs"
import postgres from "postgres"
import { eq } from "drizzle-orm"

import { signUpSchema } from "./schemas"
import { passwords, users } from "@/db/schemas"
import { procedure, router } from "@/trpc/init"

import { lowercase } from "@/tools/strings"

const AUTH_SIGNUP_ACTION = "auth.signup"

const _errorCodes = [
  "signup/server-exception",
  "signup/email-already-registered",
] as const

type ErrorCode = typeof _errorCodes[number]

type ErrorResponse = {
  ok: false
  error: { code: ErrorCode, message: string }
}

function badRequestResponse(code: ErrorCode, message: string): ErrorResponse {
  return { ok: false, error: { code, message } }
}

function serverExceptionResponse(
  ctx: AppContext,
  error: unknown,
  message: string,
): ErrorResponse {
  ctx.logger.error(message, {
    error,
    action: AUTH_SIGNUP_ACTION,
    status: "SERVER_EXCEPTION",
  })
  return {
    ok: false,
    error: {
      code: "signup/server-exception",
      message: "Something went wrong while processing your request",
    },
  }
}

type SuccessResponse = {
  ok: true
  user: UserSchema
}

function userCreatedResponse(ctx: AppContext, user: UserSchema): SuccessResponse {
  ctx.logger.info("user registered", {
    user: { id: user.id, email: user.email },
    action: AUTH_SIGNUP_ACTION,
    status: "USER_REGISTERED",
  })
  return { ok: true, user }
}

class RollbackError extends Error {
  constructor(message: string) {
    super("db rollback error")
    this.name = this.constructor.name
    this.message = message
  }
}

export const authRouter = router({
  signUp: procedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.query.users.findFirst({
          where: eq(users.email, lowercase(input.email)),
        })
        if (user != null) {
          return badRequestResponse(
            "signup/email-already-registered",
            "This email is already registered",
          )
        }
      }
      catch (error) {
        return serverExceptionResponse(
          ctx,
          error,
          "db query to find user by email failed",
        )
      }

      let user: UserSchema | undefined

      try {
        user = await ctx.db.transaction(async tx => {
          const [newUser] = await tx
            .insert(users)
            .values({ email: lowercase(input.email), isEmailVerified: false })
            .returning()

          if (newUser == null) {
            throw new RollbackError("db query to create user returned null value")
          }

          const hash = await bcrypt.hash(input.password, 12)

          const [newPassword] = await tx
            .insert(passwords)
            .values({ hash, userId: newUser.id })
            .returning({ id: passwords.id })

          if (newPassword == null) {
            throw new RollbackError("db query to create password returned null value")
          }

          return newUser
        })
      }
      catch (error) {
        if (error instanceof RollbackError) {
          return serverExceptionResponse(
            ctx,
            error.name,
            error.message,
          )
        }
        if (error instanceof Error && error.cause instanceof postgres.PostgresError) {
          return serverExceptionResponse(
            ctx,
            `[Postgres] ${error.cause.message}`, // Prevent leaking sensitive data.
            "db query to create user failed",
          )
        }
        return serverExceptionResponse(
          ctx,
          error,
          "db query to create user failed",
        )
      }

      // TODO:
      // 1. Send email verification

      return userCreatedResponse(ctx, user)
    }),
})
