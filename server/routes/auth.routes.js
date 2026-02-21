const express = require("express");
const router = express.Router();
const { register, login, requestOTP, verifyOTPLogin, getMe, forgotPassword, resetPassword } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);          // password login (admin/fallback)
router.post("/request-otp", requestOTP);    // Step 1: send OTP to email
router.post("/verify-otp", verifyOTPLogin); // Step 2: verify OTP → JWT
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;
