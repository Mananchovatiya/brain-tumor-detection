const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportId: { type: String, required: true, unique: true }, // e.g. "REP-0001"
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    scanId: { type: mongoose.Schema.Types.ObjectId, ref: "Scan", required: true },
    predictionId: { type: mongoose.Schema.Types.ObjectId, ref: "Prediction", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctorNotes: { type: String },
    recommendation: { type: String },
    reportUrl: { type: String }, // link to generated PDF, once we build that
    reportStatus: {
      type: String,
      enum: ["draft", "final"],
      default: "draft",
    },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.model("Report", reportSchema);
