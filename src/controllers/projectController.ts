// src/controllers/projectController.ts
import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/projectService";
import { projectSchema } from "../utils/validators";

export const projectController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = projectSchema.parse(req.body);
      const project = await projectService.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = projectSchema.partial().parse(req.body);
      const project = await projectService.updateProject(
        req.params.id,
        validatedData,
      );
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await projectService.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
