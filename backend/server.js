require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB before the server starts accepting requests.
connectDB();

// Security middleware
app.use(helmet()); // sets secure HTTP headers (X-Frame-Options, etc.)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" })); // cap JSON body size — MRI files go through multer, not this
app.use(mongoSanitize()); // strips $ and . from user input to prevent NoSQL injection

// Simple health check route — useful to confirm the server is alive.
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Route mounting
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/scans", require("./routes/scanRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/patients", require("./routes/patientRoutes"));

// Serve uploaded MRI files statically so the frontend can display them
// via the imageUrl stored on each Scan (e.g. /uploads/171234-abc.png).
// helmet() sets Cross-Origin-Resource-Policy: same-origin by default, which
// blocks the frontend (a different origin/port) from actually rendering
// these images even though the request succeeds — so we relax it here,
// just for this route, while keeping helmet's stricter default everywhere else.
app.use(
  "/uploads",
  (req, res, next) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static("uploads")
);

// 404 handler — for any route that doesn't match above.
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Basic error handler — catches anything thrown in routes/controllers.
// Also catches Multer file-validation errors (e.g. wrong file type/size).
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
