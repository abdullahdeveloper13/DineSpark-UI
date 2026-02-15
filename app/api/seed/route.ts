import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { menuItems, categories } from "@shared/schema";
import { storage } from "../../../lib/storage";

export async function GET() {
  try {
    // Delete existing data to allow re-seeding
    console.log("Clearing existing menu items...");
    await db.delete(menuItems);
    console.log("Cleared menu items");
    
    console.log("Clearing existing categories...");
    await db.delete(categories);
    console.log("Cleared categories");
    
    // Now seed
    await seedDatabase();
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { message: `Failed to seed database: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

async function seedDatabase() {
  console.log("Starting database seed...");
  
  const starters = await storage.createCategory({ name: "Starters", slug: "starters" });
  console.log("✓ Created Starters category:", starters.id);
  
  const mains = await storage.createCategory({ name: "Mains", slug: "mains" });
  console.log("✓ Created Mains category:", mains.id);
  
  const desserts = await storage.createCategory({ name: "Desserts", slug: "desserts" });
  console.log("✓ Created Desserts category:", desserts.id);
  
  const drinks = await storage.createCategory({ name: "Drinks", slug: "drinks" });
  console.log("✓ Created Drinks category:", drinks.id);

  // Starters
  console.log("\nCreating starter menu items...");
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
  console.log("✓ Pan Seared Scallops");

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
  console.log("✓ Truffle Mushroom Soup");

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
  console.log("✓ Foie Gras Torchon");

  // Mains
  console.log("\nCreating main course menu items...");
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
  console.log("✓ Wagyu Ribeye");

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
  console.log("✓ Pan-Roasted Halibut");

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
  console.log("✓ Lobster Thermidor");

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
  console.log("✓ Duck Confit");

  // Desserts
  console.log("\nCreating dessert menu items...");
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
  console.log("✓ Chocolate Soufflé");

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
  console.log("✓ Crème Brûlée");

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
  console.log("✓ Lemon Tart");

  // Drinks
  console.log("\nCreating drink menu items...");
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
  console.log("✓ House Red Wine");

  await storage.createMenuItem({
    categoryId: drinks.id,
    name: "Signature Cocktail",
    description: "Our Chef's special cocktail  with premium spirits.",
    price: 1500,
    imageUrl: "/signature.png",
    isPopular: true,
    dietary: ["vegan", "gluten-free"],
    available: true,
  });
  console.log("✓ Signature Cocktail");

  console.log("\n✅ Database seeded successfully!");
}
