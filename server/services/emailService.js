// services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Ensure dotenv is configured for services too

const transporter = nodemailer.createTransport({
  service: "gmail", // Or your preferred SMTP provider (e.g., SendGrid, Mailgun)
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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
    // You might want to re-throw or handle more gracefully based on your needs
    throw new Error("Email sending failed.");
  }
};

export const sendOtpEmail = async (to, otp) => {
  const html = `
    <h2>OTP Verification</h2>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This OTP is valid for 10 minutes.</p>
  `;
  await sendEmail({ to, subject: "OTP Verification", html });
};

export const sendAdminApprovalEmail = async (to, name) => {
  const html = `
    <h2>🎉 Account Approved!</h2>
    <p>Hello <b>${name}</b>, your hostel admin account has been approved!</p>
    <p>You can now log in and manage your hostel.</p>
  `;
  await sendEmail({ to, subject: "Hostel Admin Approval", html });
};

// You can export sendEmail as well if you need it generically
export default sendEmail;