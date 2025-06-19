import type { Metadata, Viewport } from "next"

import "@/css/globals.css"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"
import { fontGeistSans, fontGeistMono } from "@/lib/fonts"

import { TRPCReactProvider } from "@/trpc/client/provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-primary font-sans text-base text-primary-fg antialiased",
          "selection:bg-selection selection:text-selection-fg",
          fontGeistSans.variable,
          fontGeistMono.variable,
        )}
      >
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  )
}
