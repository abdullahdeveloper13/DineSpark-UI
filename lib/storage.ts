import {
  menuItems,
  categories,
  reservations,
  messages,
  type MenuItem,
  type InsertMenuItem,
  type Category,
  type InsertCategory,
  type Reservation,
  type InsertReservation,
  type Message,
  type InsertMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Menu
  getCategories(): Promise<Category[]>;
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;

  // Reservations
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getReservation(id: number): Promise<Reservation | undefined>;

  // Contact
  createMessage(message: InsertMessage): Promise<Message>;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export class DbStorage implements IStorage {
  // Menu
  async getCategories(): Promise<Category[]> {
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.error("DbStorage.getCategories failed:", error);
      throw error;
    }
  }

  async getMenuItems(): Promise<MenuItem[]> {
    try {
      return await db.select().from(menuItems);
    } catch (error) {
      console.error("DbStorage.getMenuItems failed:", error);
      throw error;
    }
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    try {
      return await db.select().from(menuItems).where(eq(menuItems.categoryId, categoryId));
    } catch (error) {
      console.error("DbStorage.getMenuItemsByCategory failed:", error);
      throw error;
    }
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    try {
      const now = new Date();
      const [created] = await db
        .insert(categories)
        .values({
          ...insertCategory,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
      return created;
    } catch (error) {
      console.error("DbStorage.createCategory failed:", error);
      throw error;
    }
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    try {
      const now = new Date();
      const dietary = normalizeStringArray((insertItem as any).dietary);

      const [created] = await db
        .insert(menuItems)
        .values({
          name: insertItem.name,
          description: insertItem.description,
          price: insertItem.price,
          categoryId: insertItem.categoryId,
          imageUrl: insertItem.imageUrl,
          dietary,
          isPopular: (insertItem as any).isPopular ?? false,
          available: (insertItem as any).available ?? true,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      return created;
    } catch (error) {
      console.error("DbStorage.createMenuItem failed:", error);
      throw error;
    }
  }

  // Reservations
  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    try {
      const now = new Date();
      const [created] = await db
        .insert(reservations)
        .values({
          ...insertReservation,
          message: (insertReservation as any).message ?? null,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      return created;
    } catch (error) {
      console.error("DbStorage.createReservation failed:", error);
      throw error;
    }
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    try {
      const [reservation] = await db
        .select()
        .from(reservations)
        .where(eq(reservations.id, id))
        .limit(1);
      return reservation;
    } catch (error) {
      console.error("DbStorage.getReservation failed:", error);
      throw error;
    }
  }

  // Contact
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    try {
      const now = new Date();
      const [created] = await db
        .insert(messages)
        .values({
          ...insertMessage,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
      return created;
    } catch (error) {
      console.error("DbStorage.createMessage failed:", error);
      throw error;
    }
  }
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private menuItems: Map<number, MenuItem>;
  private reservations: Map<number, Reservation>;
  private messages: Map<number, Message>;
  private categoryId: number;
  private menuItemId: number;
  private reservationId: number;
  private messageId: number;

  constructor() {
    this.categories = new Map();
    this.menuItems = new Map();
    this.reservations = new Map();
    this.messages = new Map();
    this.categoryId = 1;
    this.menuItemId = 1;
    this.reservationId = 1;
    this.messageId = 1;

    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add mock categories
    const mockCategories: InsertCategory[] = [
      { name: "Appetizers", slug: "appetizers" },
      { name: "Main Course", slug: "main-course" },
      { name: "Desserts", slug: "desserts" },
    ];

    mockCategories.forEach((cat) => {
      const id = this.categoryId++;
      this.categories.set(id, { ...cat, id });
    });

    // Add mock menu items
    const mockMenuItems: (InsertMenuItem & { isPopular?: boolean })[] = [
      { 
        name: "Bruschetta", 
        description: "Crispy bread with tomatoes", 
        price: 12, 
        categoryId: 1, 
        imageUrl: "/menuimg1.png", 
        isPopular: true 
      },
      { 
        name: "Calamari Fritti", 
        description: "Tender squid, perfectly fried", 
        price: 14, 
        categoryId: 1, 
        imageUrl: "/menuimg2.png", 
        isPopular: false 
      },
      { 
        name: "Grilled Salmon", 
        description: "Fresh Atlantic salmon", 
        price: 32, 
        categoryId: 2, 
        imageUrl: "/menuimg3.png", 
        isPopular: true 
      },
      { 
        name: "Ribeye Steak", 
        description: "Prime cut, perfectly seared", 
        price: 38, 
        categoryId: 2, 
        imageUrl: "/menuimg4.png", 
        isPopular: true 
      },
      { 
        name: "Tiramisu", 
        description: "Classic Italian dessert", 
        price: 10, 
        categoryId: 3, 
        imageUrl: "/menuimg5.png", 
        isPopular: false 
      },
      { 
        name: "Panna Cotta", 
        description: "Creamy vanilla delight", 
        price: 11, 
        categoryId: 3, 
        imageUrl: "/menuimg6.png", 
        isPopular: false 
      },
    ];

    mockMenuItems.forEach((item) => {
      const id = this.menuItemId++;
      this.menuItems.set(id, {
        ...item,
        id,
        dietary: [],
        isPopular: item.isPopular ?? false,
        available: true,
      });
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      (item) => item.categoryId === categoryId
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.menuItemId++;
    const dietary = normalizeStringArray((insertItem as any).dietary);
    const item: MenuItem = {
      ...insertItem,
      id,
      dietary,
      isPopular: (insertItem as any).isPopular ?? false,
      available: (insertItem as any).available ?? true,
    };
    this.menuItems.set(id, item);
    return item;
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.reservationId++;
    const reservation: Reservation = {
      ...insertReservation,
      id,
      status: "pending",
      createdAt: new Date(),
      message: insertReservation.message || null,
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }
}

// Initialize storage
let storageInstance: IStorage | undefined;
let initialized = false;

const initPromise = (async () => {
  try {
    // Test database connection
    await db.select().from(categories).limit(1);
    console.log("✅ Database connected, using DbStorage");
    storageInstance = new DbStorage();
  } catch (error) {
    console.warn("⚠️  Database unavailable, using in-memory MemStorage");
    console.warn("Error:", (error as Error).message);
    storageInstance = new MemStorage();
  }
  initialized = true;
})();

// Create a proxy that waits for initialization
class StorageProxy {
  private async ensureInitialized() {
    if (!initialized) {
      await initPromise;
    }
    if (!storageInstance) {
      throw new Error("Storage failed to initialize");
    }
  }

  async getCategories() {
    await this.ensureInitialized();
    return storageInstance!.getCategories();
  }

  async getMenuItems() {
    await this.ensureInitialized();
    return storageInstance!.getMenuItems();
  }

  async getMenuItemsByCategory(categoryId: number) {
    await this.ensureInitialized();
    return storageInstance!.getMenuItemsByCategory(categoryId);
  }

  async createCategory(category: InsertCategory) {
    await this.ensureInitialized();
    return storageInstance!.createCategory(category);
  }

  async createMenuItem(item: InsertMenuItem) {
    await this.ensureInitialized();
    return storageInstance!.createMenuItem(item);
  }

  async createReservation(reservation: InsertReservation) {
    await this.ensureInitialized();
    return storageInstance!.createReservation(reservation);
  }

  async getReservation(id: number) {
    await this.ensureInitialized();
    return storageInstance!.getReservation(id);
  }

  async createMessage(message: InsertMessage) {
    await this.ensureInitialized();
    return storageInstance!.createMessage(message);
  }
}

export const storage = new StorageProxy() as IStorage;