const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');


// Defines the route for getting referrals for a specific hospital
// The ":hospitalId" is a URL parameter
router.get('/:hospitalId/referrals', hospitalController.getReferralsForHospital);

module.exports = router;