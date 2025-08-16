// services/paymentService.js
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from 'dotenv'; // Import dotenv here too for consistency

dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createSubscriptionOrder = async (amount, currency = "INR") => {
  const options = {
    amount: amount * 100, // amount in paisa
    currency,
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };
  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    throw new Error("Payment order creation failed");
  }
};

export const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest("hex");
  return generated_signature === razorpay_signature;
};