import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const isVercel = process.env.VERCEL === '1'; 
const { Pool } = pg;

export const pool = new Pool({
  user: isVercel ? process.env.SUPABASE_DB_USER : process.env.DB_USER,
  host: isVercel ? process.env.SUPABASE_DB_HOST : process.env.DB_HOST,
  database: isVercel ? process.env.SUPABASE_DB_NAME : process.env.DB_NAME,
  password: isVercel ? process.env.SUPABASE_DB_PASSWORD : process.env.DB_PASSWORD,
  port: isVercel ? process.env.SUPABASE_DB_PORT : process.env.DB_PORT,
  ssl: isVercel ? { rejectUnauthorized: false } : false, 
});

