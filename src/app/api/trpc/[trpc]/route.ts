import { appRouter } from "@/trpc/router"
import { createContext } from "@/trpc/init"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

function handler(req: Request) {
  return fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: "/api/trpc",
    createContext,
  })
}

export { handler as GET, handler as POST }
