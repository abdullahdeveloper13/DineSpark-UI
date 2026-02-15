import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Providers } from "./providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "DineSpark - Restaurant Management System",
  description: "Discover dining excellence with DineSpark",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
