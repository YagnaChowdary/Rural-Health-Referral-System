const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');


// Defines the route for creating a new referral
router.post('/', referralController.createReferral);
// Defines the route for updating a referral's status to CHECKED_IN
router.post(
  '/:referralId/notes',
  authenticateToken,
  checkRole(['ANO']),
  referralController.addNoteToReferral
);
router.put(
  '/:referralId/checkin',
  authenticateToken,
  checkRole(['DISTRICT_STAFF']), // <-- Add the role check here
  referralController.checkinReferral
);

//router.put('/:referralId/checkin', referralController.checkinReferral);
module.exports = router;