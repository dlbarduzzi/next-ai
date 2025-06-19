"use client"

import type { SignUpSchema } from "@/modules/auth/schemas"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { cn, delay } from "@/lib/utils"
import { signUpSchema } from "@/modules/auth/schemas"

export function SignUp() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState

  async function onSubmit(data: SignUpSchema) {
    await delay(2000)
    console.warn(data)
  }

  return (
    <div className={cn(
      "w-full max-w-[420px] overflow-hidden rounded-xl border border-neutral-100",
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
        <h2 className="text-base font-semibold text-neutral-900">
          Sign up
        </h2>
        <p className="text-sm text-neutral-600">
          Create an account to get started.
        </p>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-1 gap-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="mt-0.5">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      variant={errors.email ? "danger" : "default"}
                      disabled={isSubmitting}
                      placeholder="you@email.com"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="mt-0.5">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      variant={errors.password ? "danger" : "default"}
                      disabled={isSubmitting}
                      placeholder="Enter your password..."
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <Button type="submit" disabled={isSubmitting}>Create Account</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
