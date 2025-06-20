"use client"

import type { SignUpSchema } from "@/modules/auth/schemas"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { ButtonSpinner } from "@/components/kit/button-spinner"

import { cn, delay } from "@/lib/utils"
import { signUpSchema } from "@/modules/auth/schemas"

export function SignUp() {
  const [isTermsChecked, setIsTermsChecked] = useState(true)

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
    <div className="w-full max-w-[420px]">
      <div className={cn(
        "w-full overflow-hidden rounded-xl border border-gray-200",
        "bg-white px-6 py-8",
      )}
      >
        <div className="flex">
          <NextLink
            href="/"
            className={cn(
              "rounded-none focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-gray-900 focus-visible:ring-offset-2",
              isSubmitting && "pointer-events-none focus-visible:ring-0",
            )}
          >
            <NextImage
              src="/images/logo-full.png"
              alt="NextAI"
              width={500}
              height={500}
              priority={true}
              className="h-auto w-24"
            />
            <span className="sr-only">Link to home page.</span>
          </NextLink>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900">
            Sign up
          </h2>
          <p className="text-sm text-gray-600">
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sign-up-terms-and-conditions"
                disabled={isSubmitting}
                checked={isTermsChecked}
                onCheckedChange={() => setIsTermsChecked(() => !isTermsChecked)}
              />
              <Label
                htmlFor="sign-up-terms-and-conditions"
                className={cn(
                  "peer-disabled:cursor-not-allowed font-normal text-sm/6",
                  isSubmitting && "pointer-events-none",
                )}
              >
                Accept
                {" "}
                <NextLink
                  href="/info/terms"
                  className={cn(
                    "font-semibold hover:underline hover:underline-offset-4",
                    "text-gray-900",
                    isSubmitting && "pointer-events-none",
                  )}
                >
                  terms
                </NextLink>
                {" and "}
                <NextLink
                  href="/info/conditions"
                  className={cn(
                    "font-semibold hover:underline hover:underline-offset-4",
                    "text-gray-900",
                    isSubmitting && "pointer-events-none",
                  )}
                >
                  conditions
                </NextLink>
              </Label>
            </div>
            <div>
              <ButtonSpinner
                type="submit"
                size="md"
                className="w-full"
                title="Create Account"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              />
            </div>
          </form>
        </FormProvider>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-900">
            Already have an account?
            {" "}
            <NextLink
              href="/sign-in"
              className={cn(
                "font-semibold hover:underline hover:underline-offset-4",
                isSubmitting && "pointer-events-none",
              )}
            >
              Sign in
            </NextLink>
          </p>
        </div>
      </div>
    </div>
  )
}
