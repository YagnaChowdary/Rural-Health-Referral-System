//require('dotenv').config();
/*const { Pool } = require('pg');
console.log("Attempting to create database pool...")
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
console.log("Database pool created successfully.")
module.exports = pool;*/
// Load environment variables first
require('dotenv').config();

const { Pool } = require('pg');

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not defined! Check your .env or Render environment variables.");
  process.exit(1);
}

// Create a Postgres pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  
  // Force IPv4 (Render sometimes cannot reach IPv6)
  host: process.env.DATABASE_URL.split('@')[1].split(':')[0], // Extract hostname
  port: 6543, // Use Supabase pooler port
  ssl: { rejectUnauthorized: false },
  family: 4 // IPv4 only
});

// Optional: Test connection immediately
pool.connect()
  .then(client => {
    console.log("✅ Database pool created successfully!");
    client.release();
  })
  .catch(err => {
    console.error("❌ Error connecting to database:", err);
    process.exit(1);
  });

module.exports = pool;

