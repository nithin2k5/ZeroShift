// In-memory OTP store: { email -> { otp, expiresAt } }
// For production, replace with Redis or a DB table
const otpStore = new Map();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Generate and store a 6-digit OTP for an email.
 */
const generateOTP = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email.toLowerCase(), {
        otp,
        expiresAt: Date.now() + OTP_EXPIRY_MS,
    });
    return otp;
};

/**
 * Verify an OTP for a given email. Returns true/false and clears the OTP on success.
 */
const verifyOTP = (email, otp) => {
    const record = otpStore.get(email.toLowerCase());
    if (!record) return { valid: false, reason: "No OTP found. Please request a new one." };
    if (Date.now() > record.expiresAt) {
        otpStore.delete(email.toLowerCase());
        return { valid: false, reason: "OTP has expired. Please request a new one." };
    }
    if (record.otp !== otp.toString()) {
        return { valid: false, reason: "Invalid OTP. Please try again." };
    }
    otpStore.delete(email.toLowerCase()); // Single use
    return { valid: true };
};

module.exports = { generateOTP, verifyOTP };
