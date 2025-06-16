import type { UserSchema } from "@/db/schemas"

import bcrypt from "bcryptjs"
import postgres from "postgres"

import { DrizzleError, eq } from "drizzle-orm"

import { signUpSchema } from "./schemas"
import { passwords, users } from "@/db/schemas"

import { lowercase } from "@/tools/strings"
import { procedure, router } from "@/trpc/init"

import { LOG_STATUS, RESP_STATUS, RESP_MESSAGE } from "./status"

const _signUpErrorCodes = [
  RESP_STATUS.EMAIL_ALREADY_REGISTERED,
  RESP_STATUS.INTERNAL_SERVER_ERROR,
] as const

type SignUpErrorCode = (typeof _signUpErrorCodes)[number]

type SignUpResponse =
  | { ok: true, user: UserSchema }
  | { ok: false, status: SignUpErrorCode, message: string }

export const authRouter = router({
  signUp: procedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }): Promise<SignUpResponse> => {
      try {
        const user = await ctx.db.query.users.findFirst({
          where: eq(users.email, lowercase(input.email)),
          columns: { id: true },
        })
        if (user != null) {
          return {
            ok: false,
            status: RESP_STATUS.EMAIL_ALREADY_REGISTERED,
            message: "This email is already registered",
          }
        }
      }
      catch (error) {
        ctx.logger.error("db query to find user failed", {
          error,
          action: "auth.signup",
          status: LOG_STATUS.SIGNUP_ERROR_USER_FIND,
        })
        return {
          ok: false,
          status: RESP_STATUS.INTERNAL_SERVER_ERROR,
          message: RESP_MESSAGE.INTERNAL_SERVER_ERROR,
        }
      }

      let user: UserSchema | undefined

      try {
        user = await ctx.db.transaction(async tx => {
          const [newUser] = await tx
            .insert(users)
            .values({
              email: lowercase(input.email),
              isEmailVerified: false,
            })
            .returning()
          if (newUser == null) {
            ctx.logger.error("db query to create user returned null value", {
              action: "auth.signup",
              status: LOG_STATUS.SIGNUP_ERROR_USER_NULL,
            })
            throw tx.rollback()
          }
          const [newPassword] = await tx
            .insert(passwords)
            .values({
              hash: await bcrypt.hash(input.password, 12),
              userId: newUser.id,
            })
            .returning({ id: passwords.id })
          if (newPassword == null) {
            ctx.logger.error("db query to create password returned null value", {
              action: "auth.signup",
              status: LOG_STATUS.SIGNUP_ERROR_PASSWORD_NULL,
            })
            throw tx.rollback()
          }
          return newUser
        })
      }
      catch (error) {
        if (error instanceof Error) {
          if (error.cause instanceof postgres.PostgresError) {
            // Prevent leaking sensitive data by logging only `message`.
            ctx.logger.error("postgres db error", {
              error: error.cause.message,
              action: "auth.signup",
              status: LOG_STATUS.SIGNUP_ERROR_POSTGRES_ERROR,
            })
          }
          else if (error instanceof DrizzleError) {
            // Rollback error should have been logged at the time rollback was called.
            if (error.message !== "Rollback") {
              ctx.logger.error("drizzle lib error", {
                error,
                action: "auth.signup",
                status: LOG_STATUS.SIGNUP_ERROR_DRIZZLE_ERROR,
              })
            }
          }
        }
        else {
          ctx.logger.error("uncaught exception", {
            error,
            action: "auth.signup",
            status: LOG_STATUS.SIGNUP_ERROR_UNCAUGHT_EXCEPTION,
          })
        }
        return {
          ok: false,
          status: RESP_STATUS.INTERNAL_SERVER_ERROR,
          message: RESP_MESSAGE.INTERNAL_SERVER_ERROR,
        }
      }

      if (user == null) {
        ctx.logger.error("user cannot be null", {
          action: "auth.signup",
          status: LOG_STATUS.SIGNUP_ERROR_USER_NULL,
        })
        return {
          ok: false,
          status: RESP_STATUS.INTERNAL_SERVER_ERROR,
          message: RESP_MESSAGE.INTERNAL_SERVER_ERROR,
        }
      }

      // TODO:
      // 1. Link account
      // 2. Send email verification

      ctx.logger.info("user created successfully", {
        id: user.id,
        email: user.email,
        status: LOG_STATUS.SIGNUP_SUCCESS,
      })

      return { ok: true, user }
    }),
})
