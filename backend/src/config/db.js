//require('dotenv').config();
const { Pool } = require('pg');
console.log("Attempting to create database pool...")
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
console.log("Database pool created successfully.")
module.exports = pool;

