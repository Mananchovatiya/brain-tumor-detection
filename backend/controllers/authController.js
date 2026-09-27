const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Generates a simple human-readable patient ID like "PAT-0001".
// Only called for role: "patient" — doctors/admins never get one.
const generatePatientId = async () => {
  const count = await User.countDocuments({ role: "patient" });
  return `PAT-${String(count + 1).padStart(4, "0")}`;
};

// @route  POST /api/auth/register
// @access Public
// Patients self-register through this endpoint. Doctor/admin accounts
// would typically be created by an admin later — for now this defaults
// everyone to "patient" unless a role is explicitly passed (kept simple
// for development/testing; lock this down before any real deployment).
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      dateOfBirth,
      gender,
      agreeToTerms,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    if (!agreeToTerms) {
      return res.status(400).json({
        success: false,
        message: "You must agree to the terms and privacy notice to register.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash the password before saving — we never store plain text passwords.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const finalRole = role || "patient";
    const patientId = finalRole === "patient" ? await generatePatientId() : undefined;

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: finalRole,
      phone: phone || "",
      dateOfBirth: dateOfBirth || undefined,
      gender: gender || "",
      patientId,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          patientId: user.patientId,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account has been deactivated.",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          patientId: user.patientId,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/users/me
// @access Private (requires valid token)
const getMe = async (req, res) => {
  // req.user was already attached by the `protect` middleware.
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: { user: req.user },
  });
};

// @route  POST /api/auth/create-staff
// @access Temporary — protected by a shared SETUP_KEY, not a real user role.
// This exists only to bootstrap the first doctor/admin accounts before the
// Admin Module (where real admins create staff through the UI) is built.
// Remove this route once that exists.
const createStaffAccount = async (req, res) => {
  try {
    // Extra safety: this bootstrap endpoint should never work outside
    // local development, even if someone forgets to remove it later.
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        success: false,
        message: "This endpoint is disabled in production.",
      });
    }

    const { name, email, password, role, setupKey } = req.body;

    if (setupKey !== process.env.SETUP_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid setup key.",
      });
    }

    if (!["doctor", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'doctor' or 'admin'.",
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
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

// @route  PUT /api/auth/me
// @access Private
// Lets a logged-in user update their own basic profile fields.
const updateProfile = async (req, res) => {
  try {
    const { name, phone, dateOfBirth, gender, address, city } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth || undefined;
    if (gender !== undefined) user.gender = gender;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          address: user.address,
          city: user.city,
          patientId: user.patientId,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe, createStaffAccount, updateProfile };
