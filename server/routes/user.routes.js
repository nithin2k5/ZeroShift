const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile, addAddress, deleteAddress, getAllUsers } = require("../controllers/user.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/addresses", protect, addAddress);
router.delete("/addresses/:addressId", protect, deleteAddress);
router.get("/", protect, adminOnly, getAllUsers);

module.exports = router;
