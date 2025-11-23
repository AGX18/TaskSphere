// src/routes/projectRoutes.ts
import { Router } from "express";
import { projectController } from "../controllers/projectController";

export const ProjectRouter = Router();

ProjectRouter.post("/", projectController.create);
ProjectRouter.get("/", projectController.getAll);
ProjectRouter.get("/:id", projectController.getOne);
ProjectRouter.patch("/:id", projectController.update);
ProjectRouter.delete("/:id", projectController.delete);

export default ProjectRouter;
