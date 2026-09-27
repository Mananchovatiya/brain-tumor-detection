const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Scan = require("../models/Scan");
const Prediction = require("../models/Prediction");

const getStats = async (req, res) => {
  try {
    const [totalUsers, totalDoctors, totalPatients, totalScans] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "doctor" }),
      User.countDocuments({ role: "patient" }),
      Scan.countDocuments(),
    ]);

    const predictionDistribution = await Prediction.aggregate([
      { $group: { _id: "$predictedClass", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      message: "Stats fetched",
      data: {
        totalUsers,
        totalDoctors,
        totalPatients,
        totalScans,
        predictionDistribution,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const filter = req.query.role ? { role: req.query.role } : {};
    const users = await User.find(filter).select("-passwordHash").sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Users fetched", data: { users } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and role are required.",
      });
    }

    if (!["doctor", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'doctor' or 'admin'.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, passwordHash, role });

    res.status(201).json({
      success: true,
      message: `${role} account created successfully`,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStats, getUsers, createUser, toggleUserActive };
