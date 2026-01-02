import { 
  menuItems, categories, reservations, messages,
  type MenuItem, type InsertMenuItem,
  type Category, type InsertCategory,
  type Reservation, type InsertReservation,
  type Message, type InsertMessage
} from "@shared/schema";

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
    const item: MenuItem = { 
      ...insertItem, 
      id,
      dietary: insertItem.dietary || [], 
      isPopular: insertItem.isPopular || false,
      available: insertItem.available || true
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

export const storage = new MemStorage();
