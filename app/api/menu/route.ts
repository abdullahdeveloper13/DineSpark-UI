import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../lib/storage";
import { db } from "../../../lib/db";
import { menuItems } from "@shared/schema";

export async function GET() {
  try {
    console.log("Fetching menu items via storage...");
    const items = await storage.getMenuItems();
    console.log("Menu items fetched via storage:", items.length, "items");
    
    if (items.length === 0) {
      console.log("No items found via storage, trying direct Drizzle query...");
      const directItems = await db.select().from(menuItems);
      console.log("Direct Drizzle query returned:", directItems.length, "items");
      if (directItems.length > 0) {
        console.log("First direct item:", JSON.stringify(directItems[0], null, 2));
      }
    }
    
    if (items.length > 0) {
      console.log("First item sample:", JSON.stringify(items[0], null, 2));
    }
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    const errorStack = error instanceof Error ? error.stack : "";
    
    console.error("Full error details:", {
      message: errorMessage,
      stack: errorStack,
      type: typeof error,
    });
    
    return NextResponse.json(
      { message: `Failed to fetch menu items: ${errorMessage}` },
      { status: 500 }
    );
  }
}
