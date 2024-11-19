// db.js
const sqlite3 = require("sqlite3");
const path = require("path");

// Set up the SQLite database connection
const db = new sqlite3.Database(
  path.join(process.cwd(), "database.db"),
  (err) => {
    if (err) {
      console.error("Error opening database:", err);
    } else {
      console.log("Database connected!");
    }
  }
);

// Function to create tables (trails and users) if they don't exist
const createTables = () => {
  return new Promise((resolve, reject) => {
    // Drop tables first if they exist (for testing purposes, can be removed later)
    const dropTablesQuery = `
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS trails;
    `;

    db.run(dropTablesQuery, (err) => {
      if (err) {
        return reject("Error dropping tables: " + err);
      }
      console.log("Dropped existing tables if they existed.");

      const trailTableQuery = `
        CREATE TABLE IF NOT EXISTS trails (
          trailID TEXT,
          trailName TEXT,
          length TEXT,
          difficulty TEXT,
          description TEXT,
          location TEXT,
          image_url TEXT
        );
      `;

      const userTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          userId INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          email TEXT,
          firstName TEXT,
          lastName TEXT
        );
      `;

      // Run the table creation queries sequentially
      db.run(trailTableQuery, (err) => {
        if (err) {
          return reject("Error creating trails table: " + err);
        }

        db.run(userTableQuery, (err) => {
          if (err) {
            return reject("Error creating users table: " + err);
          }

          console.log("Users table created or already exists");
          console.log("Trails table created or already exists");
          resolve(); // Resolve promise when tables are created successfully
        });
      });
    });
  });
};

// Export the database object and the createTables function
module.exports = { db, createTables };
