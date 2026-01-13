import { 
  menuItems, categories, reservations, messages,
  type MenuItem, type InsertMenuItem,
  type Category, type InsertCategory,
  type Reservation, type InsertReservation,
  type Message, type InsertMessage
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
    return db.select().from(categories);
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return db.select().from(menuItems);
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return db.select().from(menuItems).where(eq(menuItems.categoryId, categoryId));
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [created] = await db.insert(categories).values(insertCategory).returning();
    return created;
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const dietary = normalizeStringArray((insertItem as any).dietary);

    const [created] = await db
      .insert(menuItems)
      .values({
        ...insertItem,
        dietary,
        isPopular: (insertItem as any).isPopular ?? false,
        available: (insertItem as any).available ?? true,
      })
      .returning();

    return created;
  }

  // Reservations
  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const [created] = await db
      .insert(reservations)
      .values({
        ...insertReservation,
        message: (insertReservation as any).message ?? null,
      })
      .returning();

    return created;
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    const [reservation] = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, id))
      .limit(1);
    return reservation;
  }

  // Contact
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [created] = await db.insert(messages).values(insertMessage).returning();
    return created;
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
      available: (insertItem as any).available ?? true
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
      message: insertReservation.message || null 
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
      createdAt: new Date() 
    };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new DbStorage();
