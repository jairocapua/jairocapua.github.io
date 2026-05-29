import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Chat } from "@/components/chat";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { ManilaClock } from "@/components/layout/manila-clock";
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

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: { default: `${DATA.name} — ${DATA.role}`, template: `%s | ${DATA.name}` },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name} — ${DATA.role}`,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: DATA.name },
  icons: { icon: "/jairo-pfp-dark-nowatermark-1x1.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
