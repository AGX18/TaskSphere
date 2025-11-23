import express from "express";
import { httpLogger } from "./middlewares/httpLogger";
import { errorHandler } from "./utils/errorHandler";
import { Teamrouter } from "./routes/teamRoutes";
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

app.use(errorHandler);

// Export the app for use in other modules (like tests)
export { app };

// Default export for convenience
export default app;
