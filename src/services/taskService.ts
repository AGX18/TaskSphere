import { eq, and } from "drizzle-orm";
import { db } from "../repositories/sql/connection";
import { tasks } from "../models/sql/schema"; // Drizzle schema
import { Project } from "../models/mongo/Project"; // Mongoose model
import { AppError } from "../utils/AppError";
import { CreateTaskInput, TaskFilterInput } from "../utils/validators";

export const taskService = {
  // Create Task (Hybrid: Checks Mongo, Writes to SQL)
  async createTask(data: CreateTaskInput) {
    // Verify Project exists in MongoDB first
    const projectExists = await Project.findById(data.projectId);
    if (!projectExists) {
      throw new AppError("Project not found in MongoDB", 404);
    }

    const [newTask] = await db.insert(tasks).values(data).returning();
    return newTask;
  },

  async getAllTasks({ projectId, status }: TaskFilterInput) {
    const conditions = [];

    if (projectId) {
      conditions.push(eq(tasks.projectId, projectId));
    }

    // Add status filter if provided
    if (status) {
      // We cast status to 'any' here to satisfy the enum type,
      // or you can validate it against the 'todo'|'in-progress'|'done' types
      conditions.push(eq(tasks.status, status));
    }

    if (conditions.length > 0) {
      // Use 'and' to combine all conditions
      return await db
        .select()
        .from(tasks)
        .where(and(...conditions));
    }

    return await db.select().from(tasks);
  },

  async getTaskById(id: number) {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  },

  async updateTask(id: number, data: Partial<CreateTaskInput>) {
    const [updatedTask] = await db
      .update(tasks)
      .set({ ...data })
      .where(eq(tasks.id, id))
      .returning();

    if (!updatedTask) {
      throw new AppError("Task not found", 404);
    }
    return updatedTask;
  },

  async deleteTask(id: number) {
    const [deleted] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    if (!deleted) {
      throw new AppError("Task not found", 404);
    }
  },
};
