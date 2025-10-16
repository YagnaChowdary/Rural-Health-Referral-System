/*const cron = require('node-cron');
const pool = require('../config/db');
const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const ANO_PHONE_NUMBER = '+916009642220'; // Replace with the ANO's real number

console.log('Escalation worker started. Will check for overdue referrals.');

// Schedule a task to run every minute for testing.
// For production, you might change this to '*//*5 * * * *' (every 5 minutes).
cron.schedule('* * * * *', async () => {
  console.log('Running scheduled job: Checking for overdue referrals...');
  try {
    // Find referrals that are still 'REFERRED' and past their urgency window
    const overdueReferrals = await pool.query(`
      SELECT r.id, p.name as patient_name
      FROM referrals r
      JOIN visits v ON r.visit_id = v.id
      JOIN patients p ON v.patient_id = p.id
      WHERE r.status = 'REFERRED'
        AND now() > r.referral_date + (r.urgency_hours * interval '1 hour')
    `);

    if (overdueReferrals.rows.length === 0) {
      console.log('No overdue referrals found.');
      return;
    }

    // Process each overdue referral
    for (const referral of overdueReferrals.rows) {
      console.log(`Processing overdue referral for patient: ${referral.patient_name} (ID: ${referral.id})`);

      // 1. Send SMS Alert
      await client.messages.create({
        body: `ALERT: Patient ${referral.patient_name} (Referral ID: ${referral.id}) is overdue. Please follow up.`,
        from: process.env.TWILIO_PHONE,
        to: ANO_PHONE_NUMBER
      });
      console.log(`SMS sent for referral ID: ${referral.id}`);

      // 2. Update status to ESCALATED in the database
      await pool.query(
        "UPDATE referrals SET status = 'ESCALATED' WHERE id = $1",
        [referral.id]
      );
      console.log(`Referral ID ${referral.id} status updated to ESCALATED.`);
    }
  } catch (err) {
    console.error('Error in scheduled job:', err);
  }
});*/


const cron = require('node-cron');
const twilio = require('twilio');

// ❌ REMOVE THIS LINE - We will pass the pool in.
// const pool = require('../config/db');

// ✅ WRAP the entire cron logic in an exported function
module.exports = (pool) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  const ANO_PHONE_NUMBER = '+916009642220'; // Replace with the ANO's real number

  console.log('Escalation worker started. Will check for overdue referrals.');

  cron.schedule('* * * * *', async () => {
    console.log('Running scheduled job: Checking for overdue referrals...');
    try {
      // This will now use the pool passed into the function
      const overdueReferrals = await pool.query(`
        SELECT r.id, p.name as patient_name
        FROM referrals r
        JOIN visits v ON r.visit_id = v.id
        JOIN patients p ON v.patient_id = p.id
        WHERE r.status = 'REFERRED'
          AND now() > r.referral_date + (r.urgency_hours * interval '1 hour')
      `);

      if (overdueReferrals.rows.length === 0) {
        console.log('No overdue referrals found.');
        return;
      }

      for (const referral of overdueReferrals.rows) {
        console.log(`Processing overdue referral for patient: ${referral.patient_name} (ID: ${referral.id})`);
        
        await client.messages.create({
          body: `ALERT: Patient ${referral.patient_name} (Referral ID: ${referral.id}) is overdue. Please follow up.`,
          from: process.env.TWILIO_PHONE,
          to: ANO_PHONE_NUMBER
        });
        console.log(`SMS sent for referral ID: ${referral.id}`);

        await pool.query(
          "UPDATE referrals SET status = 'ESCALATED' WHERE id = $1",
          [referral.id]
        );
        console.log(`Referral ID ${referral.id} status updated to ESCALATED.`);
      }
    } catch (err) {
      console.error('Error in scheduled job:', err);
    }
  });
};
