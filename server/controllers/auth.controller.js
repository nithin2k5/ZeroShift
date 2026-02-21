const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
const { sendEmail, welcomeEmail } = require("../config/mailer");
const { generateOTP, verifyOTP } = require("../utils/otp");

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

// @desc   Register User
// @route  POST /api/auth/register
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ success: false, message: "All fields are required" });

        const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
        if (existing.rows.length)
            return res.status(400).json({ success: false, message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 12);
        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role",
            [name, email, hashed]
        );
        const user = result.rows[0];

        sendEmail({ to: email, ...welcomeEmail(name) }).catch(console.error);

        res.status(201).json({ success: true, token: generateToken(user.id), user });
    } catch (error) { next(error); }
};

// @desc   Step 1 — Request OTP for login
// @route  POST /api/auth/request-otp
const requestOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ success: false, message: "Email is required" });

        const result = await pool.query("SELECT id, name FROM users WHERE email = $1", [email]);
        if (!result.rows.length)
            return res.status(404).json({ success: false, message: "No account found with this email" });

        const user = result.rows[0];
        const otp = generateOTP(email);

        await sendEmail({
            to: email,
            subject: "Your ZeroShift Login Code",
            html: `
            <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9f9f9;">
                <h1 style="font-size:22px;font-weight:900;letter-spacing:-1px;margin-bottom:4px;">ZERO<span style="color:#111">SHIFT</span></h1>
                <p style="color:#666;margin-top:0;font-size:13px;">Login Verification</p>
                <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0;">
                <p style="font-size:15px;">Hey <strong>${user.name}</strong>, here is your login code:</p>
                <div style="background:#111;color:#fff;font-size:36px;font-weight:900;letter-spacing:12px;padding:24px;text-align:center;border-radius:4px;margin:20px 0;">
                    ${otp}
                </div>
                <p style="color:#888;font-size:12px;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
                <p style="color:#888;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
            </div>`,
        });

        res.json({ success: true, message: "OTP sent to your email address" });
    } catch (error) { next(error); }
};

// @desc   Step 2 — Verify OTP and return JWT
// @route  POST /api/auth/verify-otp
const verifyOTPLogin = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp)
            return res.status(400).json({ success: false, message: "Email and OTP are required" });

        const check = verifyOTP(email, otp);
        if (!check.valid)
            return res.status(401).json({ success: false, message: check.reason });

        const result = await pool.query(
            "SELECT id, name, email, phone, role FROM users WHERE email = $1",
            [email]
        );
        const user = result.rows[0];
        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, token: generateToken(user.id), user });
    } catch (error) { next(error); }
};

// @desc   Legacy password login (kept for admin/seed)
// @route  POST /api/auth/login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: "Please provide email and password" });

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ success: false, message: "Invalid email or password" });

        const { password: _, ...safeUser } = user;
        res.json({ success: true, token: generateToken(user.id), user: safeUser });
    } catch (error) { next(error); }
};

// @desc   Get current user
// @route  GET /api/auth/me
const getMe = async (req, res) => {
    res.json({ success: true, user: req.user });
};

// @desc   Request Password Reset
// @route  POST /api/auth/forgot-password
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email is required" });

        const result = await pool.query("SELECT id, name FROM users WHERE email = $1", [email]);
        if (!result.rows.length) return res.status(404).json({ success: false, message: "No account found with this email" });

        const user = result.rows[0];
        const otp = generateOTP(email);

        await sendEmail({
            to: email,
            subject: "Reset your ZeroShift Password",
            html: `
            <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9f9f9;">
                <h1 style="font-size:22px;font-weight:900;letter-spacing:-1px;margin-bottom:4px;">ZERO<span style="color:#111">SHIFT</span></h1>
                <p style="color:#666;margin-top:0;font-size:13px;">Password Reset</p>
                <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0;">
                <p style="font-size:15px;">Hey <strong>${user.name}</strong>, here is your password reset code:</p>
                <div style="background:#111;color:#fff;font-size:36px;font-weight:900;letter-spacing:12px;padding:24px;text-align:center;border-radius:4px;margin:20px 0;">
                    ${otp}
                </div>
                <p style="color:#888;font-size:12px;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
                <p style="color:#888;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
            </div>`,
        });

        res.json({ success: true, message: "Password reset OTP sent to your email" });
    } catch (error) { next(error); }
};

// @desc   Verify OTP and Reset Password
// @route  POST /api/auth/reset-password
const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) return res.status(400).json({ success: false, message: "Email, OTP and new password are required" });

        const check = verifyOTP(email, otp);
        if (!check.valid) return res.status(401).json({ success: false, message: check.reason });

        const hashed = await bcrypt.hash(newPassword, 12);
        const result = await pool.query("UPDATE users SET password = $1 WHERE email = $2 RETURNING id, name, email, role", [hashed, email]);

        if (!result.rows.length) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) { next(error); }
};

module.exports = { register, login, requestOTP, verifyOTPLogin, getMe, forgotPassword, resetPassword };
