import type React from "react"
import "./globals.css"
import "./prism-theme.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import  Script  from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blog",
  description: "A modern blog built with Next.js and MDX",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <Script async src="https://plausible.io/js/pa-s-ef3BSOItwjLT6cueUqs.js"></Script>
        <Script dangerouslySetInnerHTML={{ __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()` }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
