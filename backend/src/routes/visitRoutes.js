const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');


// Defines the route for creating a new visit
//router.post('/', visitController.createVisit);

router.post('/', authenticateToken, checkRole(['PHC_STAFF']), visitController.createVisit);

module.exports = router;