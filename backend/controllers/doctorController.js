const User = require("../models/User");
const Scan = require("../models/Scan");
const Prediction = require("../models/Prediction");

// @route  GET /api/doctor/patients
// @access Private (doctor)
// For simplicity, every doctor can currently see every patient — there's
// no "assigned patients" relationship yet. That could be added later via
// a doctorId field, but keeping it simple for now per the project's
// "avoid unnecessary complexity" rule.
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-passwordHash");
    res.status(200).json({
      success: true,
      message: "Patients fetched",
      data: { patients },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/doctor/patients/:patientId
// @access Private (doctor)
const getPatientById = async (req, res) => {
  try {
    const patient = await User.findOne({
      _id: req.params.patientId,
      role: "patient",
    }).select("-passwordHash");

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({ success: true, message: "Patient fetched", data: { patient } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/doctor/patients/:patientId/scans
// @access Private (doctor)
const getPatientScans = async (req, res) => {
  try {
    const scans = await Scan.find({ uploadedBy: req.params.patientId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, message: "Scans fetched", data: { scans } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPatients, getPatientById, getPatientScans };
