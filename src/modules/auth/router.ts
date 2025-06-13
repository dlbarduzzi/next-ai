import { procedure, router } from "@/trpc/init"
import { z } from "zod"

const signUpSchema = z.object({ email: z.string() })

export const authRouter = router({
  signUp: procedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    ctx.logger.info("user registered successfully", {
      email: input.email,
      status: "NEW_USER_REGISTERED",
    })
  }),
})
