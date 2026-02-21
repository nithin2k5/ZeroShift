const nodemailer = require("nodemailer");

const isMailConfigured = !!(process.env.MAIL_USER && process.env.MAIL_PASS &&
    process.env.MAIL_USER !== "your_email@gmail.com");

const transporter = isMailConfigured
    ? nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 587,
        secure: false,
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    })
    : null;

/**
 * Send an email — falls back to console.log if mail is not configured.
 */
const sendEmail = async ({ to, subject, html }) => {
    if (!isMailConfigured) {
        console.log(`\n📧 [DEV — mail not configured] Would send to: ${to}`);
        console.log(`   Subject: ${subject}`);
        // For OTP emails, extract and log the code so dev can use it
        const otpMatch = html.match(/>\s*(\d{6})\s*</);
        if (otpMatch) console.log(`   🔑 OTP Code: ${otpMatch[1]}`);
        console.log("   Configure MAIL_USER + MAIL_PASS in .env to enable real emails.\n");
        return { messageId: "dev-noop" };
    }
    const info = await transporter.sendMail({
        from: process.env.MAIL_FROM || '"ZeroShift" <noreply@zeroshift.com>',
        to, subject, html,
    });
    console.log(`📧 Email sent: ${info.messageId}`);
    return info;
};


// --- Templates ---

const orderConfirmationEmail = (order, items) => ({
    subject: `Your ZeroShift Order ${order.id.slice(0, 8).toUpperCase()} is Confirmed!`,
    html: `
    <div style="font-family: sans-serif; max-width: 560px; margin: auto; padding: 32px; background: #f9f9f9;">
        <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -1px; margin-bottom: 4px;">ZERO<span style="color:#111">SHIFT</span></h1>
        <p style="color: #666; margin-top: 0;">Order Confirmation</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        <h2 style="font-size: 18px; font-weight: 700;">Thanks for your order!</h2>
        <p>We received your order <strong>#${order.id.slice(0, 8).toUpperCase()}</strong> and it's currently being processed.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <thead>
                <tr style="background: #111; color: #fff;">
                    <th align="left" style="padding: 10px 12px;">Item</th>
                    <th align="right" style="padding: 10px 12px;">Qty</th>
                    <th align="right" style="padding: 10px 12px;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                <tr style="border-bottom: 1px solid #e5e5e5;">
                    <td style="padding: 10px 12px;">${item.name} ${item.size ? `<span style="color:#888;">(${item.size})</span>` : ''}</td>
                    <td align="right" style="padding: 10px 12px;">${item.qty}</td>
                    <td align="right" style="padding: 10px 12px;">₹${Number(item.price * item.qty).toFixed(2)}</td>
                </tr>`).join("")}
            </tbody>
        </table>
        <div style="margin-top: 20px; text-align: right;">
            <strong>Total: ₹${Number(order.total_amount).toFixed(2)}</strong>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">© 2026 ZeroShift. All rights reserved.</p>
    </div>`,
});

const welcomeEmail = (name) => ({
    subject: "Welcome to ZeroShift 🖤",
    html: `
    <div style="font-family: sans-serif; max-width: 560px; margin: auto; padding: 32px; background: #f9f9f9;">
        <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -1px;">ZERO<span style="color:#111">SHIFT</span></h1>
        <h2>Welcome, ${name}!</h2>
        <p>Your account has been created. Start exploring our premium collections.</p>
        <a href="http://localhost:3000/categories" style="display:inline-block; margin-top: 16px; padding: 14px 32px; background: #111; color: #fff; font-weight: 700; text-decoration: none;">SHOP NOW</a>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">© 2026 ZeroShift. All rights reserved.</p>
    </div>`,
});

module.exports = { sendEmail, orderConfirmationEmail, welcomeEmail };
