const pool = require('../config/db');

exports.createVisit = async (req, res) => {
  try {
    const { patient_id, hospital_id, symptoms, diagnosis } = req.body;

    const newVisit = await pool.query(
      "INSERT INTO visits (patient_id, hospital_id, symptoms, diagnosis) VALUES ($1, $2, $3, $4) RETURNING id",
      [patient_id, hospital_id, symptoms, diagnosis]
    );

    res.status(201).json(newVisit.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};