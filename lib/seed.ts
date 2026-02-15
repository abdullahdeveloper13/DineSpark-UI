import { storage } from "../lib/storage";

export async function seedDatabase() {
  const existingCategories = await storage.getCategories();
  if (existingCategories.length === 0) {
    const starters = await storage.createCategory({ name: "Starters", slug: "starters" });
    const mains = await storage.createCategory({ name: "Mains", slug: "mains" });
    const desserts = await storage.createCategory({ name: "Desserts", slug: "desserts" });
    const drinks = await storage.createCategory({ name: "Drinks", slug: "drinks" });

    // Starters
    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Pan Seared Scallops",
      description: "Fresh scallops with a hint of lemon and herbs, served on a bed of risotto.",
      price: 1800,
      imageUrl: "https://images.unsplash.com/photo-1606787620884-c0dec3dee471?q=80&w=1000&auto=format&fit=crop",
      isPopular: true,
      dietary: ["gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Truffle Mushroom Soup",
      description: "Creamy wild mushroom soup with black truffle oil and crispy herbs.",
      price: 1200,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop",
      isPopular: false,
      dietary: ["vegetarian", "gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Foie Gras Torchon",
      description: "Silky foie gras torchon served with brioche and fig jam.",
      price: 2200,
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
      isPopular: true,
      dietary: [],
      available: true,
    });

    // Mains
    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Wagyu Ribeye",
      description: "Japanese A5 Wagyu ribeye, perfectly seared, with roasted garlic and seasonal vegetables.",
      price: 5500,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
      isPopular: true,
      dietary: ["gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Pan-Roasted Halibut",
      description: "Fresh Atlantic halibut with brown butter, capers, and lemon.",
      price: 3800,
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1000&auto=format&fit=crop",
      isPopular: false,
      dietary: ["gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Lobster Thermidor",
      description: "Classic French preparation with brandy, cream, and herbs.",
      price: 4200,
      imageUrl: "https://images.unsplash.com/photo-1625662296316-3a6b0e2fb89e?q=80&w=1000&auto=format&fit=crop",
      isPopular: true,
      dietary: [],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Duck Confit",
      description: "Slow-cooked duck leg with a crispy skin, served with cherry gastrique.",
      price: 3200,
      imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1000&auto=format&fit=crop",
      isPopular: false,
      dietary: ["gluten-free"],
      available: true,
    });

    // Desserts
    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Chocolate Soufflé",
      description: "Light and airy chocolate soufflé with a molten center, served with vanilla ice cream.",
      price: 900,
      imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      isPopular: true,
      dietary: ["vegetarian"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Crème Brûlée",
      description: "Classic French custard with caramelized sugar crust.",
      price: 800,
      imageUrl: "https://images.unsplash.com/photo-1470521598919-7ceb22441e81?q=80&w=1000&auto=format&fit=crop",
      isPopular: false,
      dietary: ["vegetarian"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Lemon Tart",
      description: "Tangy lemon curd in a buttery pastry shell, topped with meringue.",
      price: 750,
      imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1000&auto=format&fit=crop",
      isPopular: false,
      dietary: ["vegetarian"],
      available: true,
    });

    // Drinks
    await storage.createMenuItem({
      categoryId: drinks.id,
      name: "House Red Wine",
      description: "A fine selection of French Bordeaux blend.",
      price: 1200,
      imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2cab2707d?q=80&w=1000&auto=format&fit=crop",
      isPopular: false,
      dietary: ["vegan", "gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: drinks.id,
      name: "Signature Cocktail",
      description: "Our Chef's special cocktail with premium spirits.",
      price: 1500,
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561854?q=80&w=1000&auto=format&fit=crop",
      isPopular: true,
      dietary: ["vegan", "gluten-free"],
      available: true,
    });

    console.log("Database seeded successfully!");
  }
}
