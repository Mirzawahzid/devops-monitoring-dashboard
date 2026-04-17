const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;

async function connectDB() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log("✅ SQL Server Connected");
    }
    return pool;
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    throw error;
  }
}

module.exports = {
  sql,
  connectDB
};