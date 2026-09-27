const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  getPatients,
  getPatientById,
  getPatientScans,
} = require("../controllers/doctorController");

// Every route here requires a logged-in user with role "doctor".
router.use(protect, authorizeRoles("doctor"));

router.get("/patients", getPatients);
router.get("/patients/:patientId", getPatientById);
router.get("/patients/:patientId/scans", getPatientScans);

module.exports = router;
