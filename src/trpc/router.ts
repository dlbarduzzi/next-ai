import { z } from "zod"
import { procedure, router } from "./init"

export const appRouter = router({
  foo: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation((opts) => {
      const foo = opts.ctx.db.foo
      return {
        greeting: `Hello, ${opts.input.text}. This is from db: ${foo}`,
      }
    }),
})

export type AppRouter = typeof appRouter
