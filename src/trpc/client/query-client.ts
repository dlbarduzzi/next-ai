import superjson from "superjson"

import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query"

export function newQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: query => {
          return defaultShouldDehydrateQuery(query) || query.state.status === "pending"
        },
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  })
}
