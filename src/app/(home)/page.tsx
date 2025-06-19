import NextLink from "next/link"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="grid gap-y-4 p-4">
        <div>
          <h1>Welcome!</h1>
        </div>
        <div>
          <Button type="button" asChild>
            <NextLink href="/sign-up">
              Go to Sign up
            </NextLink>
          </Button>
        </div>
      </div>
    </div>
  )
}
