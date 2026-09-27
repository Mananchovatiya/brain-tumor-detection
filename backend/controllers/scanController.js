const Scan = require("../models/Scan");
const Prediction = require("../models/Prediction");

// Generates a simple human-readable scan ID like "SCAN-0001".
// Good enough for a college project; not guaranteed collision-proof
// under heavy concurrent load, but fine here.
const generateScanId = async () => {
  const count = await Scan.countDocuments();
  return `SCAN-${String(count + 1).padStart(4, "0")}`;
};

// @route  POST /api/scans/upload
// @access Private (patient)
const uploadScan = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a valid MRI image.",
      });
    }

    const scanId = await generateScanId();

    const scan = await Scan.create({
      scanId,
      patientId: req.body.patientId || req.user._id, // simple case: patient uploads for themself
      uploadedBy: req.user._id,
      imageUrl: `/uploads/${req.file.filename}`,
      originalFileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      status: "uploaded",
    });

    res.status(201).json({
      success: true,
      message: "MRI uploaded successfully",
      data: { scan },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/scans
// @access Private
const getScans = async (req, res) => {
  try {
    // Patients see their own scans; doctors/admins could see more later.
    const scans = await Scan.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Scans fetched", data: { scans } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/scans/:id
// @access Private
const getScanById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) {
      return res.status(404).json({ success: false, message: "Scan not found" });
    }
    res.status(200).json({ success: true, message: "Scan fetched", data: { scan } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/scans/:id/analyze
// @access Private
// MOCK AI SERVICE — returns a fake prediction so the frontend can be fully
// built and tested before the real FastAPI model is ready. This will be
// swapped for a real call to AI_SERVICE_URL in a later step, and nothing
// on the frontend will need to change when that happens.
const analyzeScan = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) {
      return res.status(404).json({ success: false, message: "Scan not found" });
    }

    scan.status = "processing";
    scan.analysisStartedAt = new Date();
    await scan.save();

    // Simulate model output.
    const mockClasses = ["Glioma", "Meningioma", "Pituitary Tumor", "No Tumor"];
    const mockClass = mockClasses[Math.floor(Math.random() * mockClasses.length)];
    const mockConfidence = +(0.75 + Math.random() * 0.24).toFixed(2); // 0.75–0.99

    const prediction = await Prediction.create({
      scanId: scan._id,
      predictedClass: mockClass,
      confidence: mockConfidence,
      heatmapUrl: "/sample/heatmap.jpg", // placeholder image, per spec's mock example
      modelName: "Mock Model",
      modelVersion: "v1.0",
      processingTime: 1200,
    });

    scan.status = "completed";
    scan.analysisCompletedAt = new Date();
    await scan.save();

    res.status(200).json({
      success: true,
      message: "Analysis complete",
      data: { scan, prediction },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/scans/:id/result
// @access Private
const getScanResult = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) {
      return res.status(404).json({ success: false, message: "Scan not found" });
    }

    const prediction = await Prediction.findOne({ scanId: scan._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Result fetched",
      data: { scan, prediction },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadScan, getScans, getScanById, analyzeScan, getScanResult };
