const { db, createTables } = require("./db");

// Array of dummy users to insert into the database
const dummyUsers = [
  { username: "john_doe", email: "john@example.com", password: "password123" },
  { username: "jane_doe", email: "jane@example.com", password: "password456" },
  { username: "bob_smith", email: "bob@example.com", password: "password789" },
  {
    username: "alice_jones",
    email: "alice@example.com",
    password: "password000",
  },
];

// Function to populate the database with dummy users
const populateUsers = () => {
  createTables()
    .then(() => {
      dummyUsers.forEach((user) => {
        const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

        db.run(
          query,
          [user.username, user.email, user.password],
          function (err) {
            if (err) {
              console.error("Error inserting user:", err);
            } else {
              console.log(`User ${user.username} added with ID ${this.lastID}`);
            }
          }
        );
      });
    })
    .catch((err) => {
      console.error("Error creating tables:", err);
    });
};

// Run the function to populate the users
populateUsers();
