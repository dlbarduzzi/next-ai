import NextLink from "next/link"

import { Button } from "@/components/ui/button"
import { SignUp } from "@/modules/auth/views/sign-up"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="sign-up-header">
        <h1 id="sign-up-header" className="sr-only">
          Sign up.
        </h1>
      </section>
      <div className="p-4">
        <div>
          <Button type="button" asChild>
            <NextLink href="/">
              Go to Homepage
            </NextLink>
          </Button>
        </div>
        <div className="mt-4">
          <SignUp />
        </div>
      </div>
    </div>
  )
}
