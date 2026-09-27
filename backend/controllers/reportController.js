const Report = require("../models/Report");
const Prediction = require("../models/Prediction");
const Scan = require("../models/Scan");

const generateReportId = async () => {
  const count = await Report.countDocuments();
  return `REP-${String(count + 1).padStart(4, "0")}`;
};

// @route  POST /api/reports/:scanId
// @access Private (doctor)
// Creates (or updates, if one already exists for this scan) a report with
// the doctor's notes and recommendation, linked to the scan's latest prediction.
const createOrUpdateReport = async (req, res) => {
  try {
    const { doctorNotes, recommendation } = req.body;
    const scan = await Scan.findById(req.params.scanId);

    if (!scan) {
      return res.status(404).json({ success: false, message: "Scan not found" });
    }

    const prediction = await Prediction.findOne({ scanId: scan._id }).sort({
      createdAt: -1,
    });

    if (!prediction) {
      return res.status(400).json({
        success: false,
        message: "This scan has no analysis result yet.",
      });
    }

    let report = await Report.findOne({ scanId: scan._id });

    if (report) {
      report.doctorNotes = doctorNotes;
      report.recommendation = recommendation;
      report.doctorId = req.user._id;
      report.reportStatus = "final";
      await report.save();
    } else {
      const reportId = await generateReportId();
      report = await Report.create({
        reportId,
        patientId: scan.uploadedBy,
        scanId: scan._id,
        predictionId: prediction._id,
        doctorId: req.user._id,
        doctorNotes,
        recommendation,
        reportStatus: "final",
      });
    }

    // Mark the prediction as reviewed now that a doctor has weighed in.
    prediction.reviewedByDoctor = true;
    await prediction.save();

    res.status(200).json({
      success: true,
      message: "Report saved successfully",
      data: { report },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/reports/:scanId
// @access Private
const getReportByScan = async (req, res) => {
  try {
    const report = await Report.findOne({ scanId: req.params.scanId })
      .populate("doctorId", "name")
      .populate("predictionId");

    if (!report) {
      return res.status(404).json({ success: false, message: "No report found for this scan" });
    }

    res.status(200).json({ success: true, message: "Report fetched", data: { report } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/reports
// @access Private (patient) — lists all reports belonging to the logged-in patient.
const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.user._id })
      .populate("doctorId", "name")
      .populate("scanId", "scanId uploadDate")
      .sort({ generatedAt: -1 });

    res.status(200).json({ success: true, message: "Reports fetched", data: { reports } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrUpdateReport, getReportByScan, getMyReports };
