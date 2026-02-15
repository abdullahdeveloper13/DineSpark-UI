import { UtensilsCrossed, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">Lumière</span>
            </div>
            <p className="text-white/60 leading-relaxed mb-6">
              Experience the finest culinary artistry in a warm, elegant atmosphere. Modern cuisine rooted in tradition.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Our Menu</Link></li>
              <li><Link href="/reservations" className="hover:text-white transition-colors">Reservations</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-white/70">
              <li>123 Culinary Avenue<br />Metropolis, NY 10012</li>
              <li>+1 (555) 123-4567</li>
              <li>reservations@lumiere.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-accent">Hours</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex justify-between"><span>Mon - Thu</span> <span>17:00 - 22:00</span></li>
              <li className="flex justify-between"><span>Fri - Sat</span> <span>17:00 - 23:00</span></li>
              <li className="flex justify-between"><span>Sun</span> <span>16:00 - 21:00</span></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Lumière Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
