import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../lib/storage";

export async function GET() {
  try {
    const items = await storage.getMenuItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { message: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}
