import React, { useEffect, useState } from 'react';
// import { getReviewsByHostelId, submitReview } from '../services/hostelService';
import { getReviewsByHostelId, submitReview } from '../../services/hostelService';

  import RatingStars from '../../components/RatingStars';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';

const ReviewSection = () => {
  const { id } = useParams(); // hostel ID from route
  const { user } = useAuth(); // current logged-in user
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      const data = await getReviewsByHostelId(id);
      setReviews(data.reviews || []);
    } catch (err) {
      setError('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleSubmit = async () => {
    if (!newReview.trim()) return;
    try {
      await submitReview(id, { review: newReview, rating: newRating });
      setNewReview('');
      setNewRating(4);
      fetchReviews();
    } catch (err) {
      console.error(err);
      setError('Error submitting review.');
    }
  };

  return (
    <div className="bg-gray-900 text-white mt-10 rounded-xl p-6 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading reviews...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-400">{review.user?.name || 'Anonymous'}</span>
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="text-gray-300 mt-2">{review.review}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {user?.role === 'user' && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your experience..."
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
            rows={4}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1 items-center">
              <label className="text-gray-300">Rating:</label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(parseInt(e.target.value))}
                className="bg-gray-700 text-white px-3 py-1 rounded-md border border-gray-600"
              >
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>
                    {val} ⭐
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
