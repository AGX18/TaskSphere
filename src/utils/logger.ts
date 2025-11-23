// src/utils/logger.ts
import fs from "fs";
import path from "path";

class LoggerService {
  private logDir: string;
  private requestLogPath: string;
  private errorLogPath: string;

  constructor() {
    // Define paths
    this.logDir = path.join(process.cwd(), "logs");
    this.requestLogPath = path.join(this.logDir, "request.log");
    this.errorLogPath = path.join(this.logDir, "error.log");

    // Ensure logs directory exists synchronously on startup
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  private writeLog(filePath: string, message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    // Asynchronously append to file to avoid blocking the event loop
    fs.appendFile(filePath, logEntry, (err) => {
      if (err) {
        console.error("❌ Failed to write to log file:", err);
      }
    });
  }

  // Log incoming requests [cite: 64]
  public logRequest(method: string, url: string, status: number) {
    this.writeLog(
      this.requestLogPath,
      `METHOD: ${method} - URL: ${url} - STATUS: ${status}`,
    );
  }

  // Log system errors [cite: 65]
  public logError(message: string, stack?: string) {
    // Log to file
    this.writeLog(
      this.errorLogPath,
      `ERROR: ${message}\nSTACK: ${stack || "N/A"}`,
    );

    // Also print to console for development visibility
    console.error(`❌ ${message}`);
  }
}

export const logger = new LoggerService();
