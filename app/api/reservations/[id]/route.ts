import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../../lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reservation = await storage.getReservation(Number(id));
    if (!reservation) {
      return NextResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return NextResponse.json(
      { message: "Failed to fetch reservation" },
      { status: 500 }
    );
  }
}
