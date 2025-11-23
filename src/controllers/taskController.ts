import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { Types } from "mongoose";
import { taskSchema } from "../utils/validators";
import { AppError } from "src/utils/AppError";

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
      // Optional: Allow filtering by ?projectId=...
      const rawId = req.query.projectId;
      const projectId = typeof rawId === "string" ? rawId : undefined;
      if (projectId && !Types.ObjectId.isValid(projectId)) {
        throw new AppError("Invalid projectId", 400);
      }
      const tasks = await taskService.getAllTasks(projectId);
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
