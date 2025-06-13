import { signUpSchema } from "./schemas"
import { procedure, router } from "@/trpc/init"

export const authRouter = router({
  signUp: procedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    ctx.logger.info("user registered successfully", {
      email: input.email,
      status: "NEW_USER_REGISTERED",
    })
    return { ok: true }
  }),
})
