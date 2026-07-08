// const express = require("express");
// const {
//   registerUser,
//   loginUser,
//   getUsers,
// } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");
// const { admin } = require("../middleware/adminMiddleware");
// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/users", protect, admin, getUsers);

// module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  verifyEmail,
  resendOtp,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail); // 👈 naya route
router.post("/resend-otp", resendOtp); // 👈 naya route
router.get("/users", protect, admin, getUsers);

module.exports = router;
