const mysql = require("mysql2/promise");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function runMigration() {
  try {
    // 1. Read the SQL file
     const sql = await fs.readFile(
       path.join(__dirname, "tables-creation.sql"),
       "utf8"
     );

    // 2. Connect without specifying DB (we're creating it)
    const connection = await mysql.createConnection({
      host: process.env.LOCAL_HOST,
      user: process.env.LOCAL_USER,
      password: process.env.LOCAL_PASSWORD,
      multipleStatements: true,
    });

    // 3. Execute the SQL script
    await connection.query(sql);

    console.log("✅ Migration completed successfully.");
    await connection.end();
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  }
}

runMigration();
