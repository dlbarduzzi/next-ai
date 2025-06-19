"use client"

import type { SignUpSchema } from "@/modules/auth/schemas"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"

import { cn, delay } from "@/lib/utils"
import { signUpSchema } from "@/modules/auth/schemas"

export function SignUp() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "test@email.com",
      password: "P@ssword1!",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    await delay(2000)
    console.warn(data)
  }

  return (
    <div className={cn(
      "w-full max-w-[420px] overflow-hidden rounded-xl border border-gray-100",
      "bg-white px-5 py-8",
    )}
    >
      <div className="flex">
        <NextLink
          href="/"
          className={cn(
            "rounded-none focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
            isSubmitting && "pointer-events-none focus-visible:ring-0",
          )}
        >
          <NextImage
            src="/images/logo-full.png"
            alt="NextAI"
            width={500}
            height={500}
            className="h-auto w-28"
          />
          <span className="sr-only">Link to home page.</span>
        </NextLink>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-extrabold tracking-tight text-neutral-800">
          Sign up
        </h2>
        <p className="mt-0.5 text-sm text-neutral-600">
          Create an account to get started.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <div>
          <Button type="submit" disabled={isSubmitting}>Create Account</Button>
        </div>
      </form>
    </div>
  )
}
