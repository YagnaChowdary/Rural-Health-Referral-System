const pool = require('../config/db');

exports.getReferralsForHospital = async (req, res) => {
  try {
    // Get the hospital's ID from the URL parameter
    const { hospitalId } = req.params;

    // This query JOINS referrals, visits, and patients tables
    // to get the referral details along with the patient's name and phone
    const referrals = await pool.query(
      `SELECT r.id, r.reason, r.status, r.referral_date, p.name as patient_name, p.phone as patient_phone
       FROM referrals r
       JOIN visits v ON r.visit_id = v.id
       JOIN patients p ON v.patient_id = p.id
       WHERE r.referred_to_hospital_id = $1
       ORDER BY r.referral_date DESC`,
      [hospitalId]
    );

    res.status(200).json(referrals.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};