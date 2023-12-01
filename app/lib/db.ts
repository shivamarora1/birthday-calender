import { Pool } from "pg";

export const conn = new Pool({
  connectionString:process.env.POSTGRES_URL
})