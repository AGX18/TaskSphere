import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { timestamps } from "./schema.helpers";

// Define the enum for task status as per requirements [cite: 53]
export const statusEnum = pgEnum("status", ["todo", "in-progress", "done"]);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),

  // Basic Task Details
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),

  // Status with default 'todo'
  status: statusEnum("status").default("todo").notNull(),

  // Due Date
  dueDate: timestamp("due_date"),

  // Relationships (References to MongoDB ObjectIds)
  // MongoDB ObjectIds are 24-character hex strings
  projectId: varchar("project_id", { length: 24 }).notNull(),
  assignedMemberId: varchar("assigned_member_id", { length: 24 }),

  // Timestamps
  ...timestamps,
});
