const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protects routes — checks for a valid JWT in the Authorization header
// (format: "Bearer <token>"). If valid, attaches the user to req.user
// so controllers can access who's making the request.
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user fresh from DB (excluding passwordHash) so we always
    // have up-to-date info (e.g. if isActive was changed by an admin).
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found or inactive",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }
};

module.exports = { protect };
