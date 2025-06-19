import type { Config } from "tailwindcss"

import tailwindcssForms from "@tailwindcss/forms"
import tailwindcssAnimate from "tailwindcss-animate"

import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        "primary": {
          DEFAULT: "hsl(var(--primary-bg))",
          fg: "hsl(var(--primary-fg))",
          ring: "hsl(var(--primary-ring))",
        },
        "selection": {
          DEFAULT: "hsl(var(--selection-bg))",
          fg: "hsl(var(--selection-fg))",
        },
        "btn-primary": {
          DEFAULT: "hsl(var(--btn-primary))",
          fg: "hsl(var(--btn-primary-fg))",
          ring: "hsl(var(--btn-primary-ring))",
          hover: "hsl(var(--btn-primary-hover))",
          disabled: "hsl(var(--btn-primary-disabled))",
        },
      },
      keyframes: {
        "soft-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "soft-spin": "soft-spin 1s ease infinite",
      },
    },
  },
  plugins: [tailwindcssForms, tailwindcssAnimate],
} satisfies Config
