import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Chat } from "@/components/chat";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { ManilaClock } from "@/components/layout/manila-clock";
import { StructuredData } from "@/components/seo/structured-data";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

const fontSans = localFont({
  src: [
    { path: "./fonts/OpenRunde-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenRunde-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/OpenRunde-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/OpenRunde-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = `${DATA.name} — ${DATA.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: { default: TITLE, template: `%s | ${DATA.name}` },
  description: DATA.description,
  applicationName: DATA.name,
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  keywords: [
    DATA.name,
    DATA.username,
    "AI Engineer",
    "AI automation",
    "software engineer",
    "web developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "automation specialist",
    "GoHighLevel",
    "n8n",
    "Zapier",
    "Make.com",
    "OpenAI",
    "Claude",
    "Philippines",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    title: TITLE,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "profile",
    firstName: "Jairo",
    lastName: "Capua",
    username: DATA.username,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DATA.description,
    creator: `@${DATA.username}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/jairo-pfp-dark-nowatermark-1x1.png",
    apple: "/jairo-pfp-dark-nowatermark-1x1.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#18191a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
            <ManilaClock />
            <ModeToggle />
          </div>
          {children}
          <Footer />
          <Chat />
        </ThemeProvider>
      </body>
    </html>
  );
}
