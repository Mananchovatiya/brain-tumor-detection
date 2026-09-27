const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: String, required: true, unique: true }, // human-readable ID, e.g. "PAT-0001"
    dateOfBirth: { type: Date },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    contactNumber: { type: String },
    address: { type: String },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      relationship: { type: String },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
