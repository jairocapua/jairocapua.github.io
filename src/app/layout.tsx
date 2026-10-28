import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ClaudePet } from "@/components/claude-pet";
import { CustomCursor } from "@/components/custom-cursor";
import { KeyboardSound } from "@/components/keyboard-sound";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Navbar from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { chatEnabled } from "@/lib/chat-client";
import { cn } from "@/lib/utils";

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
    "AI Software Engineer",
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
    icon: "/jairo-icon-192.png",
    apple: "/jairo-icon-192.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased relative">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <ClaudePet />
            <Navbar />
            {chatEnabled && <ChatPanel />}
            <CustomCursor />
            <KeyboardSound />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
