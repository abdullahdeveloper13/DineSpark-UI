import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ReactNode } from "react";

export default function PagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
