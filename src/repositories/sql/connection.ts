import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
// import * as schema from './schema.ts';
import { env, isProd } from "../../config/env.js";
import { remember } from "@epic-web/remember";

const createPool = () => {
  return new Pool({
    connectionString: env.DB_URL,
  });
};

let client;

if (isProd()) {
  client = createPool();
} else {
  client = remember("dbPool", () => createPool());
}

export const db = drizzle({ client });
export default db;
