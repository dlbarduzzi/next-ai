import "server-only"

import { cache } from "react"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"

import { appRouter } from "@/trpc/router"
import { createContext } from "@/trpc/init"
import { newQueryClient } from "@/trpc/client/query-client"

export const getQueryServer = cache(newQueryClient)

export const trpcServer = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryServer,
})
