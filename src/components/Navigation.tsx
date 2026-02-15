"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/95 backdrop-blur-md py-4 shadow-sm border-border/50" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className={cn(
              "font-serif text-2xl font-bold tracking-tight transition-colors",
              scrolled ? "text-foreground" : "text-foreground mix-blend-difference"
            )}>
              Lumière
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={cn(
                "text-sm font-medium cursor-pointer transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent !text-foreground/60 after:transition-all after:duration-300",
                pathname === link.href 
                  ? "text-accent after:w-full" 
                  : scrolled ? "text-foreground/80 hover:text-foreground after:w-0 hover:after:w-full" : "text-white/90 hover:text-white mix-blend-difference after:w-0 hover:after:w-full"
              )}>
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/reservations">
            <button className={cn(
              "px-5 py-2.5 rounded-full font-semibold text-sm transition-all",
              scrolled 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-white text-black hover:bg-white/90"
            )}>
              Book a Table
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "md:hidden p-2",
            scrolled ? "text-foreground" : "text-white mix-blend-difference"
          )}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-serif text-2xl font-bold">Lumière</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-muted rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-serif text-3xl font-medium cursor-pointer hover:text-accent transition-colors",
                      pathname === link.href ? "text-accent" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/reservations">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium w-full"
                >
                  Book a Table
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
