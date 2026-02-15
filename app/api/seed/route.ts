import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "../../../lib/seed";

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { message: "Failed to seed database" },
      { status: 500 }
    );
  }
}
