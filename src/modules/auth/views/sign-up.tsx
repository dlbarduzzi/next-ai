"use client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client/provider"
import { useMutation } from "@tanstack/react-query"

export function SignUp() {
  const trpc = useTRPC()
  const query = useMutation(trpc.foo.mutationOptions())

  async function onSubmit() {
    const res = await query.mutateAsync({ text: "John" })
    console.warn({ res })
  }

  return (
    <div>
      <Button type="button" onClick={onSubmit}>Sign up</Button>
    </div>
  )
}
