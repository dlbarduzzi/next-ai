"use client"

import NextLink from "next/link"
import NextImage from "next/image"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { TRPCClientError } from "@trpc/client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client/provider"
import { cn } from "@/lib/utils"

export function SignUp() {
  const [queryError, setQueryError] = useState<string | null>(null)
  const [rawQueryError, setRawQueryError] = useState<unknown | null>(null)

  const trpc = useTRPC()
  const query = useMutation(trpc.auth.signUp.mutationOptions())

  const isSubmitting = false

  async function onSubmit() {
    setQueryError(() => null)
    setRawQueryError(() => null)
    try {
      const resp = await query.mutateAsync({
        email: "jane@email.com",
        password: "aaaaaaaaA1!",
      })
      if (!resp.ok) {
        switch (resp.error.code) {
          case "signup/email-already-registered":
            console.warn("--- EMAIL ---")
            console.warn(resp)
            return
          case "signup/server-exception":
            console.warn("--- EXCEPTION ---")
            console.warn(resp)
            return
          default:
            resp.error.code satisfies never
        }
      }
      // eslint-disable-next-line no-console
      console.log(resp)
    }
    catch (error) {
      if (error instanceof TRPCClientError) {
        setQueryError(() => "TRCP Client Error")
        setRawQueryError(() => error)
      }
      else {
        setQueryError(() => "Internal Server Error")
        setRawQueryError(() => error)
      }
    }
  }

  return (
    <div className="grid gap-y-4">
      <div className="flex">
        <NextLink
          href="/"
          className={cn(
            "rounded-full focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-primary-ring focus-visible:ring-offset-2",
            isSubmitting && "pointer-events-none",
          )}
        >
          <NextImage
            src="/images/logo.png"
            alt="NextAI"
            width={500}
            height={500}
            className="h-10 w-auto"
          />
          <span className="sr-only">Link to home page.</span>
        </NextLink>
      </div>
      <div>
        <Button type="button" onClick={onSubmit} disabled>Sign up</Button>
      </div>
      {queryError
        ? (
            <div className="grid gap-y-4">
              <div className={cn(
                "rounded-md bg-red-100 p-4 text-sm font-medium text-red-800 max-w-fit",
              )}
              >
                <span>{queryError}</span>
                <span className="ml-3 border-l border-l-red-800 pl-3">
                  <span
                    role="button"
                    onClick={() => {
                      setQueryError(() => null)
                      setRawQueryError(() => null)
                    }}
                  >
                    Dismiss
                  </span>
                </span>
              </div>
              <div className="rounded-md bg-gray-100 p-4 text-sm">
                <div className="mb-4 font-semibold">Raw Error</div>
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(rawQueryError, null, 2)}</pre>
              </div>
            </div>
          )
        : null}
    </div>
  )
}
