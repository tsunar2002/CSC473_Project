// trails.js
import sqlite3 from "sqlite3";

// Open the SQLite database
const db = new sqlite3.Database("./database.db");

// Function to create a new trail
export const createTrail = (
  trailName,
  image_url,
  location,
  length,
  difficulty,
  description
) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO trails (trailName, image_url, location, length, difficulty, description) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(
      query,
      [trailName, image_url, location, length, difficulty, description],
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

// Function to get all trails
export const getAllTrails = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM trails`;
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows); // Return the list of trails
      }
    });
  });
};

// Function to get a trail by its ID
export const getTrailById = (trailId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM trails WHERE trailId = ?`;
    db.get(query, [trailId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Return the trail found by ID
      }
    });
  });
};

// Function to get a trail by location
export const getTrailsByLocation = (location) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM trails WHERE location = ?`;
    db.all(query, [location], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows); // Return the trails found at the specified location
      }
    });
  });
};
