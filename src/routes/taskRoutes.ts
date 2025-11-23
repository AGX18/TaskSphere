import { Router } from "express";
import { taskController } from "../controllers/taskController";

export const TaskRouter = Router();

TaskRouter.post("/", taskController.create);
TaskRouter.get("/", taskController.getAll); // Supports ?projectId=...
TaskRouter.get("/:id", taskController.getOne);
TaskRouter.patch("/:id", taskController.update);
TaskRouter.delete("/:id", taskController.delete);

export default TaskRouter;
