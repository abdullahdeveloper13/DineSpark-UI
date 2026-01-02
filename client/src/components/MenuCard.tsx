import { motion } from "framer-motion";
import { type MenuItem } from "@shared/schema";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  // Format price from cents to display string
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price / 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group flex flex-col md:flex-row gap-6 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-border/50",
        !item.available && "opacity-60 grayscale"
      )}
    >
      <div className="shrink-0 w-full md:w-32 h-32 rounded-xl overflow-hidden bg-muted">
        {/* Descriptive alt text for accessibility */}
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors">
            {item.name}
          </h3>
          <span className="font-semibold text-lg text-primary">{formattedPrice}</span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          {item.description}
        </p>
        
        <div className="flex gap-2">
          {item.isPopular && (
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium uppercase tracking-wider">
              Popular
            </span>
          )}
          {(item.dietary as string[]).map((diet) => (
            <span key={diet} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider">
              {diet}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
