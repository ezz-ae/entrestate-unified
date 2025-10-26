'use client';

import { Inter as FontSans } from "next/font/google";
import { Urbanist } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

// export const metadata: Metadata = {
//   title: "Entrestate",
//   description: "The operating system for real estate entrepreneurs.",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable,
                fontHeading.variable
                )}
            >   
                {children}
                <Toaster />
            </body>
        </html>
    </AppProviders>
  );
}