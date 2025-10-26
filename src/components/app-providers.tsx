"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="dark"
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
