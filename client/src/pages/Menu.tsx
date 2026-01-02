import { useState } from "react";
import { useMenu, useCategories } from "@/hooks/use-restaurant";
import { motion, AnimatePresence } from "framer-motion";
import { MenuCard } from "@/components/MenuCard";
import { Loader2 } from "lucide-react";

export default function MenuPage() {
  const { data: menuItems, isLoading: loadingMenu } = useMenu();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Set initial category when loaded
  if (categories && categories.length > 0 && selectedCategory === null) {
    setSelectedCategory(categories[0].id);
  }

  const filteredItems = menuItems?.filter(
    item => selectedCategory === null || item.categoryId === selectedCategory
  );

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-6 mb-12">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
          >
            Our Menu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            A curated selection of seasonal dishes, crafted with passion and precision.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* Category Tabs */}
        {loadingCategories ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid */}
        {loadingMenu ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems?.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loadingMenu && filteredItems?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
