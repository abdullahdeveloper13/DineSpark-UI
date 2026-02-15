"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Clock } from "lucide-react";
import Link from "next/link";
import { useMenu } from "@/hooks/use-restaurant";
import { MenuCard } from "@/components/MenuCard";

export default function Home() {
  const { data: menuItems, isLoading } = useMenu();

  // Filter for featured items (popular)
  const featuredItems = menuItems?.filter(item => item.isPopular).slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Dark restaurant interior ambience */}
          <img 
            src="/bg.png" 
            alt="Elegant restaurant interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative z-10 px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
              Fine Dining Experience
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Taste the <span className="text-accent italic">Extraordinary</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light">
              Experience a culinary journey where tradition meets innovation in the heart of the city.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservations">
                <button className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20">
                  Book a Table
                </button>
              </Link>
              <Link href="/menu">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all">
                  View Menu
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">
                A Symphony of <br /> Flavors
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Founded in 2010, Lumière has established itself as a beacon of culinary excellence. Our chefs meticulously source local ingredients to craft dishes that not only satiate hunger but inspire the soul.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether you're here for a romantic dinner, a business lunch, or a family celebration, we promise an atmosphere of warmth and elegance.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/5 p-3 rounded-full text-primary">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Michelin Rated</h4>
                    <p className="text-sm text-muted-foreground">Recognized for excellence since 2018.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/5 p-3 rounded-full text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Fresh Daily</h4>
                    <p className="text-sm text-muted-foreground">Ingredients sourced every morning.</p>
                  </div>
                </div>
              </div>

              <Link href="/">
                <span className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors cursor-pointer group">
                  Learn Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl rotate-3" />
              {/* Chef plating dish */}
              <img 
                src="/chefplating2.png" 
                alt="Chef plating a dish" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-sm font-bold tracking-widest uppercase block mb-3">On The Menu</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Chef's Favorites</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Skeleton loaders
              [1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />
              ))
            ) : (
              featuredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                View Full Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready for an Unforgettable Night?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
            Book your table now and let us take care of the rest. Limited seating available for our weekend chef's table.
          </p>
          <Link href="/reservations">
            <button className="px-10 py-4 bg-accent text-accent-foreground rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all shadow-xl shadow-black/20">
              Make a Reservation
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
