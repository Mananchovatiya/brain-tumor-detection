// Restricts a route to specific roles. Use AFTER `protect` middleware,
// since it relies on req.user being already set.
//
// Example usage in a route file:
//   router.get("/admin/stats", protect, authorizeRoles("admin"), getStats);
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission for this action.",
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
