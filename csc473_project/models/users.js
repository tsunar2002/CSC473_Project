// users.js
import sqlite3 from "sqlite3";

// Open the SQLite database
const db = new sqlite3.Database("./database.db");

// Function to create a new user
export const createUser = (username, password, email, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (username, password, email, firstName, lastName) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.run(
      query,
      [username, password, email, firstName, lastName],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // Return the last inserted ID
        }
      }
    );
  });
};

// Function to get all users
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users`;
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows); // Return the list of users
      }
    });
  });
};

// Function to get a user by their ID
export const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE userId = ?`;
    db.get(query, [userId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Return the user found by ID
      }
    });
  });
};

// Function to get a user by their username (e.g., for login)
export const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Return the user found by username
      }
    });
  });
};
