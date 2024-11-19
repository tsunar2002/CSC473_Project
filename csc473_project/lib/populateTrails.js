const xlsx = require("xlsx");
const path = require("path");
const { db, createTables } = require("./db");

// Function to read data from the Excel file
const readExcelFile = (filePath) => {
  // Read the Excel file and parse it
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Get the first sheet (change if necessary)
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet to JSON data
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
};

// Example function to populate the trails table
const populateTrails = (excelData) => {
  console.log("Data read from Excel file: ", excelData);

  excelData.forEach((trail) => {
    const query = `
    INSERT INTO trails (trailID, trailName,  length, difficulty, description, location, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    db.run(
      query,
      [
        trail.trailID,
        trail.trailName,
        trail.length,
        trail.difficulty,
        trail.description,
        trail.location,
        trail.image_url,
      ],
      function (err) {
        if (err) {
          console.error("Error inserting trail:", err);
        } else {
          console.log(`Trail ${trail.trailName} added with ID ${this.lastID}`);
        }
      }
    );
  });
};

// Path to the Excel file (make sure this is correct)
const excelFilePath = path.join(process.cwd(), "./constant/trails.xlsx");

// Call createTables to ensure tables are created first
createTables()
  .then(() => {
    console.log("Tables created successfully.");

    // Read the data from the Excel file after ensuring tables are created
    const trailsData = readExcelFile(excelFilePath);

    // Populate the database with the trail data
    populateTrails(trailsData);
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });
