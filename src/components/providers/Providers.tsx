"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgb(var(--bg-card-rgb))",
              color: "rgb(var(--text-heading-rgb))",
              border: "1px solid rgb(var(--border-rgb))",
            },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
