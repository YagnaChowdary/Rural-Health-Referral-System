const cron = require('node-cron');
const pool = require('../config/db');
const { sendSms } = require('../utils/sms');

cron.schedule('*/5 * * * *', async () => {
  const result = await pool.query(`
    SELECT r.id, p.name, p.phone, r.reason, r.referral_date, r.urgency_hours
    FROM referrals r
    JOIN visits v ON v.id = r.visit_id
    JOIN patients p ON p.id = v.patient_id
    WHERE r.status='REFERRED' 
    AND now() > r.referral_date + (r.urgency_hours || ' hours')::interval
  `);

  for (const row of result.rows) {
    await sendSms(row.phone, `ALERT: ${row.name} not checked in for ${row.reason}`);
    await pool.query("UPDATE referrals SET status='ESCALATED' WHERE id=$1", [row.id]);
  }
});
