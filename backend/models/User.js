const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },
    // Human-readable ID shown to the patient (e.g. "PAT-0001").
    // Only generated for role: "patient" — doctors/admins don't need one.
    // sparse: true lets multiple docs have patientId: undefined without
    // violating the unique index (only patients ever get a value here).
    patientId: { type: String, unique: true, sparse: true },
    phone: { type: String, default: "" },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("User", userSchema);
