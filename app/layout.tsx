import type { Metadata } from "next"
import { Outfit, Fira_Code } from "next/font/google"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import { PostHogProvider } from "@/components/posthog-provider"
import { PostHogPageview } from "@/components/posthog-pageview"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jsdeveloper.cloud"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jeet Shah – Senior Full Stack & Platform Engineer",
    template: "%s | Jeet Shah",
  },
  description:
    "Senior Full Stack / Platform Engineer with 2.5+ years experience. Specializing in React, Next.js, Go, Node.js, and AWS cloud-native systems.",
  keywords: [
    "Jeet Shah",
    "Full Stack Engineer",
    "Platform Engineer",
    "Go Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "AWS",
    "Vadodara",
    "India",
    "Freelance Developer",
  ],
  authors: [{ name: "Jeet Shah", url: siteUrl }],
  creator: "Jeet Shah",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Jeet Shah – Portfolio",
    title: "Jeet Shah – Senior Full Stack & Platform Engineer",
    description:
      "Senior Full Stack / Platform Engineer. React, Next.js, Go, Node.js, AWS. Available for freelance and full-time opportunities.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jeet Shah Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeet Shah – Senior Full Stack & Platform Engineer",
    description: "React, Next.js, Go, Node.js, AWS. 2.5+ years building scalable production systems.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jeet Shah",
  url: siteUrl,
  email: "jeetshahajwa@gmail.com",
  jobTitle: "Senior Full Stack Engineer",
  worksFor: { "@type": "Organization", name: "Vayana Network" },
  address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
  sameAs: [
    "https://www.linkedin.com/in/jeetworks4/",
    "https://github.com/jeetshah47",
    "https://www.jsdeveloper.cloud",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <PostHogProvider>
            <Suspense>
              <PostHogPageview />
            </Suspense>
            {children}
            <Toaster />
          </PostHogProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
