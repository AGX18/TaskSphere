import { env } from "./config/env.js";
import app from "./server.js";

import { connectToMongo } from "./repositories/mongo/db";
import db from "./repositories/sql/connection.js";

const startServer = async () => {
  try {
    console.log("⏳ Initializing database connections...");

    // 1. Connect to MongoDB
    await connectToMongo();

    // 2. Connect to PostgreSQL DB
    await db.execute("select 1");

    // 3. Start Express Server
    app.listen(env.PORT, () => {
      console.log(`\n🚀 TaskSphere Server running!`);
      console.log(`   - URL: http://${env.HOST}:${env.PORT}`);
      console.log(`   - Mode: ${env.APP_STAGE}`);
    });
  } catch (error) {
    console.error("💀 Fatal Error during startup:", error);
    process.exit(1);
  }
};

startServer();
