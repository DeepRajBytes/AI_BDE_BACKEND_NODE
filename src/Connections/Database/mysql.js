const mysql = require("mysql2");
const util = require('util')

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rosecar79",
  database: "ai_for_bde",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

async function queryResults(query, values = []) {
  try {
    const [results] = await pool.query(query, values);
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = { pool, queryResults };
