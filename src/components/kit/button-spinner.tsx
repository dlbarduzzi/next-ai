"use client"

import type { ButtonProps } from "@/components/ui/button"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/lib/utils"

type ButtonSpinnerProps = ButtonProps & {
  title: string
  isLoading: boolean
}

export const ButtonSpinner = React.forwardRef<HTMLButtonElement, ButtonSpinnerProps>(
  ({ title, isLoading, className, ...props }, ref) => {
    return (
      <Button
        type="button"
        disabled={isLoading}
        className={cn(className, "relative overflow-hidden")}
        ref={ref}
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isLoading ? (
            <motion.div
              key="spinner"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Spinner size="xs" className="duration-500 ease-linear" />
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    )
  },
)

ButtonSpinner.displayName = "ButtonSpinner"
