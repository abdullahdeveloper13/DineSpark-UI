import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../lib/storage";
import { z } from "zod";
import { insertReservationSchema } from "@shared/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Reservation payload:", body);
    
    // Validate input
    console.log("Validating reservation schema...");
    const input = insertReservationSchema.parse(body);
    console.log("Validation passed, creating reservation...");
    
    // Create reservation
    const reservation = await storage.createReservation(input);
    console.log("Reservation created successfully:", reservation);
    
    return NextResponse.json(reservation, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation error:", err.errors);
      return NextResponse.json(
        {
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        },
        { status: 400 }
      );
    }
    
    console.error("Error creating reservation:", err);
    const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
    const errorStack = err instanceof Error ? err.stack : "";
    
    console.error("Full error details:", {
      message: errorMessage,
      stack: errorStack,
      type: typeof err,
    });
    
    return NextResponse.json(
      { message: `Failed to create reservation: ${errorMessage}` },
      { status: 500 }
    );
  }
}
