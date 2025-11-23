import { z } from "zod";
import mongoose from "mongoose";
import { createInsertSchema } from "drizzle-zod";
import { tasks } from "../models/sql/schema";
export const teamMemberSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }).trim(),
  role: z.string().min(1, { error: "Role is required" }).trim(),
  email: z.email({ error: "Invalid email address" }).trim(),
});

export type CreateTeamMemberInput = z.infer<typeof teamMemberSchema>;

// Helper to validate MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required"),
  deadline: z.coerce.date(), // Coerce string input to Date object
  teamMembers: z.array(objectIdSchema).optional(), // Array of Team IDs
});

export type CreateProjectInput = z.infer<typeof projectSchema>;

// Task Validation Schema
export const taskSchema = createInsertSchema(tasks, {
  // validation logic Drizzle doesn't know about
  projectId: (schema) => schema.length(24, "Invalid Project ID"),
  assignedMemberId: (schema) =>
    schema.length(24, "Invalid Team Member ID").optional(),
  title: (schema) => schema.min(1, "Title is required").trim(),
}).omit({
  // Fields that user shouldn't provide
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTaskInput = z.infer<typeof taskSchema>;
