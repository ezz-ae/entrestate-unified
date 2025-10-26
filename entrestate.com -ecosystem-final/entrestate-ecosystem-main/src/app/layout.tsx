
'use client';

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/components/theme-switcher';
import { usePathname } from 'next/navigation';
import { MasterHeader } from '@/components/master-header';
import { MasterFooter } from '@/components/master-footer';
import { WorkspaceLayout } from '@/app/(workspace)/layout';

const fontSans = PT_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});
const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isWorkspace = pathname.startsWith('/me');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
        fontHeading.variable
      )}>
        <AuthProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
                {isWorkspace ? (
                    <WorkspaceLayout>{children}</WorkspaceLayout>
                ) : (
                    <div className="flex flex-col min-h-screen">
                        <MasterHeader />
                        <main className="flex-grow">{children}</main>
                        <MasterFooter />
                    </div>
                )}
                <Toaster />
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
