const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    scanId: { type: mongoose.Schema.Types.ObjectId, ref: "Scan", required: true },
    predictedClass: {
      type: String,
      enum: ["Glioma", "Meningioma", "Pituitary Tumor", "No Tumor"],
      required: true,
    },
    confidence: { type: Number, required: true }, // stored as decimal, e.g. 0.91
    heatmapUrl: { type: String },
    modelName: { type: String, default: "Mock Model" },
    modelVersion: { type: String, default: "v1.0" },
    processingTime: { type: Number }, // in milliseconds
    reviewedByDoctor: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Prediction", predictionSchema);
