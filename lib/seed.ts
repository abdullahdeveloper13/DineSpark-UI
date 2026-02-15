import { storage } from "../lib/storage";

export async function seedDatabase() {
  console.log("Starting database seed...");
  
  const existingCategories = await storage.getCategories();
  console.log("Found existing categories:", existingCategories.length);
  
  if (existingCategories.length === 0) {
    console.log("No categories found, creating seed data...");
    const starters = await storage.createCategory({ name: "Starters", slug: "starters" });
    console.log("Created Starters category:", starters.id);
    
    const mains = await storage.createCategory({ name: "Mains", slug: "mains" });
    console.log("Created Mains category:", mains.id);
    
    const desserts = await storage.createCategory({ name: "Desserts", slug: "desserts" });
    console.log("Created Desserts category:", desserts.id);
    
    const drinks = await storage.createCategory({ name: "Drinks", slug: "drinks" });
    console.log("Created Drinks category:", drinks.id);

    // Starters
    console.log("Creating starter menu items...");
    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Pan Seared Scallops",
      description: "Fresh scallops with a hint of lemon and herbs, served on a bed of risotto.",
      price: 1800,
      imageUrl: "/panseard.png",
      isPopular: true,
      dietary: ["gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Truffle Mushroom Soup",
      description: "Creamy wild mushroom soup with black truffle oil and crispy herbs.",
      price: 1200,
      imageUrl: "/trufflemashroom.png",
      isPopular: false,
      dietary: ["vegetarian", "gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Foie Gras Torchon",
      description: "Silky foie gras torchon served with brioche and fig jam.",
      price: 2200,
      imageUrl: "/foietorchon.png",
      isPopular: true,
      dietary: [],
      available: true,
    });

    // Mains
    console.log("Creating main course menu items...");
    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Wagyu Ribeye",
      description: "Japanese A5 Wagyu ribeye, perfectly seared, with roasted garlic and seasonal vegetables.",
      price: 5500,
      imageUrl: "/wagyuribeye.png",
      isPopular: true,
      dietary: ["gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Pan-Roasted Halibut",
      description: "Fresh Atlantic halibut with brown butter, capers, and lemon.",
      price: 3800,
      imageUrl: "/panroasted.png",
      isPopular: false,
      dietary: ["gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Lobster Thermidor",
      description: "Classic French preparation with brandy, cream, and herbs.",
      price: 4200,
      imageUrl: "/lobster.png",
      isPopular: true,
      dietary: [],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Duck Confit",
      description: "Slow-cooked duck leg with a crispy skin, served with cherry gastrique.",
      price: 3200,
      imageUrl: "/duck.png",
      isPopular: false,
      dietary: ["gluten-free"],
      available: true,
    });

    // Desserts
    console.log("Creating dessert menu items...");
    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Chocolate Soufflé",
      description: "Light and airy chocolate soufflé with a molten center, served with vanilla ice cream.",
      price: 900,
      imageUrl: "/chocolate.png",
      isPopular: true,
      dietary: ["vegetarian"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Crème Brûlée",
      description: "Classic French custard with caramelized sugar crust.",
      price: 800,
      imageUrl: "/creme.png",
      isPopular: false,
      dietary: ["vegetarian"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Lemon Tart",
      description: "Tangy lemon curd in a buttery pastry shell, topped with meringue.",
      price: 750,
      imageUrl: "/lemon.png",
      isPopular: false,
      dietary: ["vegetarian"],
      available: true,
    });

    // Drinks
    console.log("Creating drink menu items...");
    await storage.createMenuItem({
      categoryId: drinks.id,
      name: "House Red Wine",
      description: "A fine selection of French Bordeaux blend.",
      price: 1200,
      imageUrl: "/housered.png",
      isPopular: false,
      dietary: ["vegan", "gluten-free"],
      available: true,
    });

    await storage.createMenuItem({
      categoryId: drinks.id,
      name: "Signature Cocktail",
      description: "Our Chef's special cocktail with premium spirits.",
      price: 1500,
      imageUrl: "/signature.png",
      isPopular: true,
      dietary: ["vegan", "gluten-free"],
      available: true,
    });

    console.log("Database seeded successfully!");
  } else {
    console.log("Database already seeded, skipping...");
  }
}
