const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  createOrUpdateReport,
  getReportByScan,
  getMyReports,
} = require("../controllers/reportController");

// Patients viewing their own report list — must come before "/:scanId"
// so Express doesn't treat "reports" itself as a scanId param.
router.get("/", protect, getMyReports);

// Only doctors can write reports; both patients and doctors can read one by scan.
router.post("/:scanId", protect, authorizeRoles("doctor"), createOrUpdateReport);
router.get("/:scanId", protect, getReportByScan);

module.exports = router;
