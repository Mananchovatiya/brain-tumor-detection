const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  getStats,
  getUsers,
  createUser,
  toggleUserActive,
} = require("../controllers/adminController");

// Every route here requires a logged-in user with role "admin".
router.use(protect, authorizeRoles("admin"));

router.get("/stats", getStats);
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id/toggle-active", toggleUserActive);

module.exports = router;
