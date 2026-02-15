"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-background px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <h1 className="font-serif text-8xl font-bold text-accent mb-4">404</h1>
        <h2 className="font-serif text-4xl font-bold text-primary mb-4">Page Not Found</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Sorry, the page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link href="/">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all">
            Go Back Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
