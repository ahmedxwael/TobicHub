import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import ToTopButton from "@/modules/layout/components/to-top-button";
import Footer from "@/modules/layout/footer/footer";
import Navbar from "@/modules/layout/nav-bar/Navbar";
import NexAuthSessionProvider from "@/providers/next-auth-session-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
  session: any;
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "TopicHub",
  description: "The home page for this TopicHub application.",
};

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "relative bg-background")}>
        <NexAuthSessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="container mx-auto flex min-h-[calc(100vh-72px)] flex-col px-8 pb-24">
              {children}
            </main>
            <Toaster />
            <ToTopButton />
            <Footer />
          </ThemeProvider>
        </NexAuthSessionProvider>
      </body>
    </html>
  );
}
