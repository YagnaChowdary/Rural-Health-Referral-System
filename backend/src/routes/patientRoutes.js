// backend/src/routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
// When a POST request comes to '/', run the createPatient function
//router.post('/', patientController.createPatient);
router.post('/', authenticateToken, checkRole(['PHC_STAFF']), patientController.createPatient);
// You can add more routes here later (e.g., get all patients)
// router.get('/', patientController.getAllPatients);

module.exports = router;