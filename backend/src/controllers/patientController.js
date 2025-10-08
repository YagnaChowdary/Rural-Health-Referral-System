// backend/src/controllers/patientController.js
const pool = require('../config/db'); // Use the db.js you already created

// The function to create a new patient
exports.createPatient = async (req, res) => {
  try {
    // Get patient details from the request body
    const { name, village, phone, dob, aadhar_hash } = req.body;

    // SQL query to insert the new patient into the database
    const newPatient = await pool.query(
      "INSERT INTO patients (name, village, phone, dob, aadhar_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, village, phone, dob, aadhar_hash]
    );

    // Send a success response back with the new patient's ID
    // The .rows[0] gets the first row of the result
    res.status(201).json(newPatient.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};