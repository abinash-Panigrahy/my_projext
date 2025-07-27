const nodemailer = require("nodemailer");

// Use your actual credentials or store securely in .env
const transporter = nodemailer.createTransport({
  service: "gmail", // Or use 'ethereal' or SMTP provider
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generic reusable function
const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"PG-Hostel Platform" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    throw new Error("Email sending failed.");
  }
};

// Example for OTP
const sendOtpEmail = async (to, otp) => {
  const html = `
    <h2>OTP Verification</h2>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This OTP is valid for 10 minutes.</p>
  `;
  await sendEmail({ to, subject: "OTP Verification", html });
};

// Example for approval
const sendAdminApprovalEmail = async (to, name) => {
  const html = `
    <h2>🎉 Account Approved!</h2>
    <p>Hello <b>${name}</b>, your hostel admin account has been approved!</p>
    <p>You can now log in and manage your hostel.</p>
  `;
  await sendEmail({ to, subject: "Hostel Admin Approval", html });
};

module.exports = {
  sendEmail,
  sendOtpEmail,
  sendAdminApprovalEmail,
};
