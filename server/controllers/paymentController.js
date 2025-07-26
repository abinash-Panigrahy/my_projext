const Razorpay = require("razorpay");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const Subscription = require("../models/Subscription");
const User = require("../models/User");

// Razorpay instance (use .env values)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private (Hostel Admin)
exports.createOrder = asyncHandler(async (req, res) => {
  const { amount, plan } = req.body;

  if (!amount || !plan) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const options = {
    amount: amount * 100, // INR in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.status(201).json({
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
  });
});

// @desc    Verify payment and activate subscription
// @route   POST /api/payments/verify
// @access  Private (Hostel Admin)
exports.verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    plan,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
    res.status(400);
    throw new Error("Incomplete payment details");
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    res.status(400);
    throw new Error("Payment verification failed");
  }

  const duration = getPlanDuration(plan);

  const subscription = new Subscription({
    user: req.user._id,
    plan,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amount: getPlanAmount(plan),
    validTill: new Date(Date.now() + duration),
  });

  await subscription.save();

  // Update user's subscription status
  await User.findByIdAndUpdate(req.user._id, { subscription: subscription._id });

  res.status(200).json({ success: true, message: "Payment verified, subscription active" });
});

// Utility functions
function getPlanDuration(plan) {
  switch (plan) {
    case "monthly":
      return 30 * 24 * 60 * 60 * 1000; // 30 days
    case "bimonthly":
      return 60 * 24 * 60 * 60 * 1000; // 60 days
    case "yearly":
      return 365 * 24 * 60 * 60 * 1000; // 1 year
    default:
      throw new Error("Invalid plan");
  }
}

function getPlanAmount(plan) {
  switch (plan) {
    case "monthly":
      return 339;
    case "bimonthly":
      return 679;
    case "yearly":
      return 8000;
    default:
      throw new Error("Invalid plan");
  }
}
