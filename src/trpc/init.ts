import type { inferProcedureBuilderResolverOptions } from "@trpc/server"

import superjson from "superjson"

import { cache } from "react"
import { initTRPC } from "@trpc/server"

import { db } from "@/db/connect"
import { logger } from "@/lib/logger"

const t = initTRPC.create({ transformer: superjson })

export const router = t.router

export const procedure = t.procedure.use(({ next }) => {
  return next({ ctx: {
    db,
    logger,
  } })
})

export const createContext = cache(async () => {
  return { foo: "bar" }
})

export type AppOptions = inferProcedureBuilderResolverOptions<typeof procedure>
export type AppContext = AppOptions["ctx"]
