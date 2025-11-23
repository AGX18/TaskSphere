import { Request, Response, NextFunction } from "express";
import { teamService } from "../services/teamService";
import { teamMemberSchema } from "../utils/validators";

export const teamController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate input using Zod
      const validatedData = teamMemberSchema.parse(req.body);

      const member = await teamService.createMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      next(error); // Pass to global error handler
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await teamService.getAllMembers();
      res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await teamService.getMemberById(req.params.id);
      res.status(200).json(member);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Allow partial updates, but validate fields that are present
      const validatedData = teamMemberSchema.partial().parse(req.body);

      const updatedMember = await teamService.updateMember(
        req.params.id,
        validatedData,
      );
      res.status(200).json(updatedMember);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await teamService.deleteMember(req.params.id);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  },
};
