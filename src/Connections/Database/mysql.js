const mysql = require("mysql2");
const util = require("util");
const path = require("path");

const pool = mysql
  .createPool({
    host: process.env.LOCAL_HOST,
    user: process.env.LOCAL_USER,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

async function queryResults(query, values = []) {
  try {
    const [results] = await pool.query(query, values);
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = { pool, queryResults };
