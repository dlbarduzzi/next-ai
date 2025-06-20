"use client"

import type { SignUpSchema } from "@/modules/auth/schemas"

import NextLink from "next/link"
import NextImage from "next/image"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { LuInfo } from "react-icons/lu"

import {
  FaCheck,
  FaCircle,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

import { ButtonSpinner } from "@/components/kit/button-spinner"

import { strings } from "@/tools/strings"
import { cn, delay } from "@/lib/utils"

import {
  signUpSchema,
  PASSWORD_MIN_CHARS,
  PASSWORD_MAX_CHARS,
} from "@/modules/auth/schemas"

export function SignUp() {
  const [isTermsChecked, setIsTermsChecked] = useState(true)
  const [showPasswordValue, setShowPasswordValue] = useState(false)
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false)

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { errors, isSubmitting } = form.formState
  const passwordValue = form.watch("password")

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
                  <div className="flex">
                    <div className="flex-1">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <Popover
                      open={showPasswordCriteria}
                      onOpenChange={setShowPasswordCriteria}
                    >
                      <PopoverTrigger className={cn(
                        "mr-1 text-sm font-medium flex items-center gap-x-1",
                        "text-gray-500 hover:text-gray-700",
                        isSubmitting && "pointer-events-none",
                      )}
                      >
                        Show criteria
                        <LuInfo className="size-4" />
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        align="end"
                        className="w-80 p-0"
                        onFocusOutside={e => e.preventDefault()}
                        onPointerDownOutside={e => e.preventDefault()}
                      >
                        <PasswordCriteria
                          hasError={!!errors.password}
                          password={passwordValue}
                          closePopover={() => setShowPasswordCriteria(() => false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="relative mt-0.5">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPasswordValue ? "text" : "password"}
                        variant={errors.password ? "danger" : "default"}
                        disabled={isSubmitting}
                        placeholder="Enter your password..."
                        className="pr-12"
                      />
                    </FormControl>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <div
                        role="button"
                        onClick={() => setShowPasswordValue(() => !showPasswordValue)}
                        className={cn(
                          "text-gray-300",
                          isSubmitting && "pointer-events-none",
                        )}
                      >
                        {showPasswordValue
                          ? <FaEye className="size-6" />
                          : <FaEyeSlash className="size-6" />
                        }
                      </div>
                    </div>
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

type PasswordCriteriaProps = {
  hasError: boolean
  password: string
  closePopover: () => void
}

type PasswordCriteriaChecks = {
  id: string
  label: string
  isValid: boolean
}

function PasswordCriteria({ hasError, password, closePopover }: PasswordCriteriaProps) {
  const checks: PasswordCriteriaChecks[] = [
    {
      id: "number",
      label: "Contain a number",
      isValid: strings(password).hasNumber(),
    },
    {
      id: "special",
      label: "Contain a special character",
      isValid: strings(password).hasSpecialChar(),
    },
    {
      id: "lowercase",
      label: "Contain a lowercase character",
      isValid: strings(password).hasLowercaseChar(),
    },
    {
      id: "uppercase",
      label: "Contain a uppercase character",
      isValid: strings(password).hasUppercaseChar(),
    },
    {
      id: "length",
      label: `Between ${PASSWORD_MIN_CHARS} and ${PASSWORD_MAX_CHARS} characters long`,
      isValid: password.length >= PASSWORD_MIN_CHARS
        && password.length <= PASSWORD_MAX_CHARS,
    },
  ]

  const isValidCount = checks.filter(check => check.isValid).length
  const passwordStrength = Math.round((isValidCount / checks.length) * 100)

  function getPasswordStrengthLabel() {
    if (passwordStrength === 0) return "Empty"
    if (passwordStrength <= 20) return "Very Weak"
    if (passwordStrength <= 40) return "Weak"
    if (passwordStrength <= 60) return "Medium"
    if (passwordStrength <= 80) return "Strong"
    return "Very Strong"
  }

  function getPasswordStrengthColor() {
    if (passwordStrength === 0) return "bg-gray-200"
    if (passwordStrength <= 20) return "bg-red-500"
    if (passwordStrength <= 40) return "bg-orange-500"
    if (passwordStrength <= 60) return "bg-yellow-500"
    if (passwordStrength <= 80) return "bg-sky-500"
    return "bg-green-500"
  }

  function getPasswordStrengthLabelColor() {
    if (passwordStrength === 0) return "text-gray-500"
    if (passwordStrength <= 20) return "text-red-600"
    if (passwordStrength <= 40) return "text-orange-600"
    if (passwordStrength <= 60) return "text-yellow-600"
    if (passwordStrength <= 80) return "text-sky-600"
    return "text-green-600"
  }

  return (
    <div className="relative grid grid-cols-1 gap-y-4 p-4">
      <div
        role="button"
        className={cn(
          "absolute right-0 top-0 flex size-6 -translate-y-[40%] translate-x-[40%]",
          "items-center justify-center rounded-full border border-gray-300 bg-white",
          "text-gray-400 hover:text-gray-500",
        )}
        onClick={closePopover}
      >
        <FaTimes className="size-3.5" onClick={closePopover} />
        <span className="sr-only">Close popover</span>
      </div>
      <div className="flex items-center py-1">
        <div className="text-sm font-medium text-gray-900">Password Criteria</div>
      </div>
      <div className="-mx-4 bg-gray-50 p-4 pb-[18px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Strength</span>
          <span className={cn(
            "text-sm font-medium",
            getPasswordStrengthLabelColor(),
          )}
          >
            {getPasswordStrengthLabel()}
          </span>
        </div>
        <div className="mt-2">
          <Progress
            value={passwordStrength}
            className="h-3"
            indicatorClassName={getPasswordStrengthColor()}
          />
        </div>
      </div>
      <div className="py-1">
        <div className="text-sm font-medium text-gray-900">
          Your password must have:
        </div>
        <div className="mt-3.5">
          <ul className="grid grid-cols-1 gap-y-1.5">
            {checks.map(check => (
              <li
                key={check.id}
                className="inline-flex items-center gap-x-2 text-sm text-gray-900"
              >
                <span className="flex size-5 items-center justify-center">
                  {check.isValid ? (
                    <FaCheck className="size-4 text-green-500" />
                  ) : hasError ? (
                    <FaTimes className="size-3 h-full text-red-500" />
                  ) : (
                    <FaCircle className="size-3 h-full fill-gray-300 stroke-none" />
                  )}
                </span>
                {check.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
