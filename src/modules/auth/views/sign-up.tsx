"use client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client/provider"
import { useMutation } from "@tanstack/react-query"

export function SignUp() {
  const trpc = useTRPC()
  const query = useMutation(trpc.auth.signUp.mutationOptions())

  async function onSubmit() {
    await query.mutateAsync({ email: "dylan@email.com" })
  }

  return (
    <div>
      <Button type="button" onClick={onSubmit}>Sign up</Button>
    </div>
  )
}
