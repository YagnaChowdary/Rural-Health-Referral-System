const pool = require('../config/db');

exports.createReferral = async (req, res) => {
  try {
    const { visit_id, referred_to_hospital_id, reason, urgency_hours } = req.body;

    // First, find the hospital ID from the original visit
    const visitResult = await pool.query("SELECT hospital_id FROM visits WHERE id = $1", [visit_id]);

    if (visitResult.rows.length === 0) {
      return res.status(404).send("Visit not found");
    }
    const referred_from_hospital_id = visitResult.rows[0].hospital_id;

    // Now, create the referral with all the info
    const newReferral = await pool.query(
      "INSERT INTO referrals (visit_id, referred_from_hospital_id, referred_to_hospital_id, reason, urgency_hours) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [visit_id, referred_from_hospital_id, referred_to_hospital_id, reason, urgency_hours]
    );

    res.status(201).json(newReferral.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};






exports.checkinReferral = async (req, res) => {
  try {
    const { referralId } = req.params;

    // This query updates the status and sets the check-in time to now
    const updatedReferral = await pool.query(
      "UPDATE referrals SET status = 'CHECKED_IN', checkin_date = now() WHERE id = $1 RETURNING *",
      [referralId]
    );

    if (updatedReferral.rows.length === 0) {
      return res.status(404).send("Referral not found");
    }

    res.status(200).json(updatedReferral.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// ... (existing code, including pool require)

// ... (existing createReferral and checkinReferral functions)

// Add this new function
exports.addNoteToReferral = async (req, res) => {
  try {
    const { referralId } = req.params;
    const { note } = req.body;
    const userId = req.user.id; // Get user ID from the authenticated token

    if (!note) {
      return res.status(400).json({ msg: "Note text is required" });
    }

    const newNote = await pool.query(
      "INSERT INTO notes (referral_id, user_id, note) VALUES ($1, $2, $3) RETURNING *",
      [referralId, userId, note]
    );

    res.status(201).json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};