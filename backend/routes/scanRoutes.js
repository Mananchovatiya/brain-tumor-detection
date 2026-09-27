const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadScan,
  getScans,
  getScanById,
  analyzeScan,
  getScanResult,
} = require("../controllers/scanController");

router.post("/upload", protect, upload.single("mriImage"), uploadScan);
router.get("/", protect, getScans);
router.get("/:id", protect, getScanById);
router.post("/:id/analyze", protect, analyzeScan);
router.get("/:id/result", protect, getScanResult);

module.exports = router;
