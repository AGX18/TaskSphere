import { Router } from "express";
import { teamController } from "../controllers/teamController";

export const Teamrouter = Router();

// CRUD Endpoints for Team Management
Teamrouter.post("/", teamController.create);
Teamrouter.get("/", teamController.getAll);
Teamrouter.get("/:id", teamController.getOne);
Teamrouter.patch("/:id", teamController.update); // Using PATCH for partial updates
Teamrouter.delete("/:id", teamController.delete);
