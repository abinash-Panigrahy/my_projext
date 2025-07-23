import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const RatingStars = ({ hostelId, userId }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user's rating from backend
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ratings/${hostelId}/user/${userId}`, {
          withCredentials: true,
        });
        setRating(res.data.rating);
      } catch (err) {
        console.error('Fetch rating error:', err);
      }
    };

    if (hostelId && userId) fetchRating();
  }, [hostelId, userId]);

  const submitRating = async (value) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ratings`,
        { hostelId, userId, rating: value },
        { withCredentials: true }
      );
      setRating(value);
    } catch (err) {
      console.error('Submit rating error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            key={value}
            onClick={() => submitRating(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            disabled={loading}
            className="transition-transform duration-200 hover:scale-125"
          >
            <FaStar
              size={24}
              className={
                (hovered || rating) >= value ? 'text-yellow-400' : 'text-gray-400'
              }
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
