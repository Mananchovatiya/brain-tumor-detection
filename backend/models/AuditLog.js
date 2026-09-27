const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true }, // e.g. "LOGIN", "MRI_UPLOAD", "REPORT_GENERATED"
    entityType: { type: String }, // e.g. "Scan", "Report"
    entityId: { type: mongoose.Schema.Types.ObjectId },
    description: { type: String },
    ipAddress: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
