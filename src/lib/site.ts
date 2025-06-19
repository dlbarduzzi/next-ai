import { env } from "@/env/client"

type SiteConfig = {
  name: string
  description: string
  url: string
}

export const siteConfig: SiteConfig = {
  name: "NextAI",
  // eslint-disable-next-line style/max-len
  description: "An app using advanced AI solutions to help you accomplish tasks faster.",
  url: env.NEXT_PUBLIC_APP_URL,
}
