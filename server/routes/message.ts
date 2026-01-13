import { Router } from "express";
import { insertMessageSchema, messages } from "@shared/schema";
import { db } from "../db";

export const messagesRouter = Router();

messagesRouter.post("/messages", async (req, res) => {
  const parsed = insertMessageSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation error",
      issues: parsed.error.issues,
    });
  }

  try {
    const [created] = await db.insert(messages).values(parsed.data).returning();
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({
      message: "Failed to save message",
      error: err?.message ?? String(err),
    });
  }
});