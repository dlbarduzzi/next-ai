import { router } from "./init"
import { authRouter } from "@/modules/auth/router"

export const appRouter = router({
  auth: authRouter,
})

export type AppRouter = typeof appRouter
