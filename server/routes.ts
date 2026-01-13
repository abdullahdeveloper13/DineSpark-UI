import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: any,
  app: Express
): Promise<Server> {
  // Menu Routes
  app.get(api.menu.categories.path, async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get(api.menu.list.path, async (_req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  // Reservation Routes
  app.post(api.reservations.create.path, async (req, res) => {
    try {
      const input = api.reservations.create.input.parse(req.body);
      const reservation = await storage.createReservation(input);
      res.status(201).json(reservation);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.reservations.get.path, async (req, res) => {
    const reservation = await storage.getReservation(Number(req.params.id));
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  });

  // Contact Routes
  app.post(api.contact.send.path, async (req, res) => {
    try {
      const input = api.contact.send.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Initialize seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingCategories = await storage.getCategories();
  if (existingCategories.length === 0) {
    const starters = await storage.createCategory({ name: "Starters", slug: "starters" });
    const mains = await storage.createCategory({ name: "Mains", slug: "mains" });
    const desserts = await storage.createCategory({ name: "Desserts", slug: "desserts" });
    const drinks = await storage.createCategory({ name: "Drinks", slug: "drinks" });

    // Starters
    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Truffle Arancini",
      description: "Crispy risotto balls infused with black truffle, served with garlic aioli.",
      price: 1400,
      imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800",
      isPopular: true,
      dietary: ["vegetarian"],
      available: true
    });
    
    await storage.createMenuItem({
      categoryId: starters.id,
      name: "Wagyu Beef Carpaccio",
      description: "Thinly sliced raw wagyu beef, parmesan shavings, capers, and truffle oil.",
      price: 2200,
      imageUrl: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=800",
      isPopular: false,
      dietary: ["gluten-free"],
      available: true
    });

    // Mains
    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Pan-Seared Scallops",
      description: "Jumbo scallops with cauliflower purée, crispy pancetta, and herb oil.",
      price: 3200,
      imageUrl: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800",
      isPopular: true,
      dietary: ["gluten-free"],
      available: true
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Herb-Crusted Lamb Rack",
      description: "Served pink with fondant potatoes, seasonal greens, and red wine jus.",
      price: 3800,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
      isPopular: true,
      dietary: ["gluten-free"],
      available: true
    });

    await storage.createMenuItem({
      categoryId: mains.id,
      name: "Wild Mushroom Risotto",
      description: "Arborio rice with porcini mushrooms, finished with mascarpone and parmesan.",
      price: 2600,
      imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
      isPopular: false,
      dietary: ["vegetarian", "gluten-free"],
      available: true
    });

    // Desserts
    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Dark Chocolate Fondant",
      description: "Warm chocolate cake with a molten center, served with vanilla bean ice cream.",
      price: 1600,
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&q=80&w=800",
      isPopular: true,
      dietary: ["vegetarian"],
      available: true
    });

    await storage.createMenuItem({
      categoryId: desserts.id,
      name: "Lemon Basil Tart",
      description: "Zesty lemon curd in a buttery pastry shell, topped with Italian meringue.",
      price: 1400,
      imageUrl: "https://images.unsplash.com/photo-1519915093129-60d21a48d897?auto=format&fit=crop&q=80&w=800",
      isPopular: false,
      dietary: ["vegetarian"],
      available: true
    });

    // Drinks
    await storage.createMenuItem({
      categoryId: drinks.id,
      name: "Signature Old Fashioned",
      description: "Bourbon, smoked maple syrup, angostura bitters, orange peel.",
      price: 1800,
      imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
      isPopular: true,
      dietary: ["vegan", "gluten-free"],
      available: true
    });
  }
}
