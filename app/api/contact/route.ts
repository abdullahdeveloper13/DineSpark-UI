import { storage } from "../../../lib/storage";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Contact payload:", body);
    
    // Validate input
    console.log("Validating message schema...");
    const input = insertMessageSchema.parse(body);
    console.log("Validation passed, creating message...");
    
    // Create message in database
    const message = await storage.createMessage(input);
    console.log("Message created successfully:", message);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: message,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return NextResponse.json(
        {
          message: error.errors[0].message,
          field: error.errors[0].path.join("."),
        },
        { status: 400 }
      );
    }
    
    console.error("Contact API Error:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    const errorStack = error instanceof Error ? error.stack : "";
    
    console.error("Full error details:", {
      message: errorMessage,
      stack: errorStack,
      type: typeof error,
    });
    
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve messages (admin only)
export async function GET(req: NextRequest) {
  try {
    // This endpoint is for admin purposes - would need authentication
    // For now, just return a warning
    return NextResponse.json(
      { message: "Not implemented - requires authentication" },
      { status: 403 }
    );
  } catch (error) {
    console.error("Get Messages Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}