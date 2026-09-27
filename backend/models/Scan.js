const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    scanId: { type: String, required: true, unique: true }, // e.g. "SCAN-0001"
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    originalFileName: { type: String },
    fileType: { type: String },
    fileSize: { type: Number },
    scanType: { type: String, default: "MRI" },
    bodyPart: { type: String, default: "Brain" },
    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
    uploadDate: { type: Date, default: Date.now },
    analysisStartedAt: { type: Date },
    analysisCompletedAt: { type: Date },
    errorMessage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scan", scanSchema);
