import type { Metadata } from "next"

import { SignUp } from "@/modules/auth/views/sign-up"

import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Sign up",
}

export default function Page() {
  return (
    <div>
      <section aria-labelledby="sign-up-header">
        <h1 id="sign-up-header" className="sr-only">
          Sign up.
        </h1>
      </section>
      <div className={cn(
        "flex min-h-svh flex-col items-center justify-start bg-gradient-to-br",
        "from-gray-50 to-gray-200 p-3 sm:justify-center sm:p-6 md:p-10",
      )}
      >
        <SignUp />
      </div>
    </div>
  )
}
