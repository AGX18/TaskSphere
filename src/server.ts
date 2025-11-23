import express from "express";
import { httpLogger } from "./middlewares/httpLogger";
import { errorHandler } from "./utils/errorHandler";
import { Teamrouter } from "./routes/teamRoutes";
import { ProjectRouter } from "./routes/projectRoutes";
import { TaskRouter } from "./routes/taskRoutes";
const app = express();

app.use(express.json());
app.use(httpLogger);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "task-sphere",
  });
});

app.use("/api/teams", Teamrouter);
app.use("/api/projects", ProjectRouter);
app.use("/api/tasks", TaskRouter);

app.use(errorHandler);

export { app };

// Default export for convenience
export default app;
