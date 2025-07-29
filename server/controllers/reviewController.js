const Review = require("../models/Review");
const Hostel = require("../models/Hostel");
const asyncHandler = require("express-async-handler");

// @desc    Create a review for a hostel
// @route   POST /api/reviews/:hostelId
// @access  Private (user, student)
exports.createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { hostelId } = req.params;

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  const existingReview = await Review.findOne({
    user: req.user._id,
    hostel: hostelId,
  });

  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this hostel");
  }

  const review = await Review.create({
    user: req.user._id,
    hostel: hostelId,
    rating,
    comment,
  });

  res.status(201).json(review);
});

// @desc    Get all reviews for a specific hostel
// @route   GET /api/reviews/hostel/:hostelId
// @access  Public
exports.getHostelReviews = asyncHandler(async (req, res) => {
  const { hostelId } = req.params;

  const reviews = await Review.find({ hostel: hostelId }).populate("user", "name");
  res.status(200).json(reviews);
});

// @desc    Update a review
// @route   PUT /api/reviews/:reviewId
// @access  Private (user, student)
exports.updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this review");
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  const updatedReview = await review.save();
  res.status(200).json(updatedReview);
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:reviewId
// @access  Private (user, student, admin, superAdmin)
exports.deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    !["admin", "superAdmin"].includes(req.user.role)
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this review");
  }

  await review.remove();
  res.status(200).json({ message: "Review deleted successfully" });
});

// @desc    Get all reviews (for superAdmin panel)
// @route   GET /api/reviews/
// @access  Private (superAdmin)
exports.getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate("user", "name email")
    .populate("hostel", "name city");

  res.status(200).json(reviews);
});
