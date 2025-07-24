import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

const RatingStars = ({ hostelId, userId }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the current user's rating for the hostel
  useEffect(() => {
    const fetchUserRating = async () => {
      if (!hostelId || !userId) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/ratings/${hostelId}/user/${userId}`,
          { withCredentials: true }
        );
        if (response?.data?.rating) {
          setRating(response.data.rating);
        }
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    fetchUserRating();
  }, [hostelId, userId]);

  // Submit a new rating
  const submitRating = async (value) => {
    if (!hostelId || !userId) return;

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ratings`,
        { hostelId, userId, rating: value },
        { withCredentials: true }
      );
      setRating(value);
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        const isActive = (hovered || rating) >= value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => submitRating(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            disabled={loading}
            className="transition-transform duration-150 ease-in-out hover:scale-110"
          >
            <FaStar
              size={22}
              className={isActive ? 'text-yellow-400' : 'text-gray-400'}
            />
          </button>
        );
      })}
    </div>
  );
};

RatingStars.propTypes = {
  hostelId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default RatingStars;
