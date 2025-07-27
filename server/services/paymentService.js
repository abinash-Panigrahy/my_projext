const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create an order for subscription
const createSubscriptionOrder = async (amount, currency = "INR") => {
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

// Verify payment signature
const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest("hex");
  return generated_signature === razorpay_signature;
};

module.exports = {
  createSubscriptionOrder,
  verifyPayment,
};
