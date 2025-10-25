import { db } from "./db.js";

async function testConnection() {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Conectado ao PostgreSQL", result.rows);
  } catch (err) {
    console.error("Erro ao conectar", err);
  }
  
}

testConnection();

