import { eq } from "drizzle-orm";
import { db } from "../repositories/sql/connection";
import { tasks } from "../models/sql/schema"; // Drizzle schema
import { Project } from "../models/mongo/Project"; // Mongoose model
import { AppError } from "../utils/AppError";
import { CreateTaskInput } from "../utils/validators";

export const taskService = {
  // 1. Create Task (Hybrid: Checks Mongo, Writes to SQL)
  async createTask(data: CreateTaskInput) {
    // Verify Project exists in MongoDB first
    const projectExists = await Project.findById(data.projectId);
    if (!projectExists) {
      throw new AppError("Project not found in MongoDB", 404);
    }

    // Insert into PostgreSQL
    const [newTask] = await db.insert(tasks).values(data).returning();
    return newTask;
  },

  // 2. Get All Tasks (Optional: Filter by Project ID)
  async getAllTasks(projectId?: string) {
    if (projectId) {
      return await db
        .select()
        .from(tasks)
        .where(eq(tasks.projectId, projectId));
    }
    return await db.select().from(tasks);
  },

  // 3. Get Single Task
  async getTaskById(id: number) {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  },

  // 4. Update Task
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

  // 5. Delete Task
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
