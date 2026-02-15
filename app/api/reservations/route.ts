import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../lib/storage";
import { z } from "zod";
import { insertReservationSchema } from "@shared/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = insertReservationSchema.parse(body);
    const reservation = await storage.createReservation(input);
    return NextResponse.json(reservation, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        },
        { status: 400 }
      );
    }
    console.error("Error creating reservation:", err);
    return NextResponse.json(
      { message: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
