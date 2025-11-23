import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { taskSchema } from "../utils/validators";
import { AppError } from "src/utils/AppError";
import { taskFilterSchema } from "../utils/validators";

export const taskController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = taskSchema.parse(req.body);
      const task = await taskService.createTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Optional: Allow filtering by ?projectId=... and ?status=...
      const result = taskFilterSchema.safeParse(req.query);
      if (!result.success) {
        const errorMessage = result.error.issues
          .map((e) => e.message)
          .join(", ");
        throw new AppError(errorMessage, 400);
      }
      const tasks = await taskService.getAllTasks(result.data);
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const task = await taskService.getTaskById(id);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = taskSchema.partial().parse(req.body);
      const task = await taskService.updateTask(id, validatedData);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
