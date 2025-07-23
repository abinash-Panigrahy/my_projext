import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getHostelById } from '../../services/hostelService';
import RatingStars from '../../components/RatingStars';
import ReviewSection from './ReviewSection';

const HostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const res = await getHostelById(id);
        setHostel(res.data);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Failed to fetch hostel data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [id]);

  if (loading) return <div className="text-white text-center py-8">Loading...</div>;
  if (errorMsg) return <div className="text-red-500 text-center py-8">{errorMsg}</div>;
  if (!hostel) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-md p-6 space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={hostel.imageUrl || '/default-hostel.jpg'}
            alt={hostel.name}
            className="rounded-xl w-full md:w-1/2 object-cover h-72"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-purple-400">{hostel.name}</h1>
            <p className="text-gray-300">{hostel.description}</p>
            <RatingStars rating={hostel.rating || 4.2} />
            <p className="text-sm text-gray-400">Location: {hostel.location}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-purple-300">Food Menu</h2>
            <ul className="list-disc list-inside text-gray-300">
              {hostel.foodMenu?.map((item, i) => <li key={i}>{item}</li>) || <li>No menu available</li>}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-purple-300">Rules</h2>
            <ul className="list-disc list-inside text-gray-300">
              {hostel.rules?.map((rule, i) => <li key={i}>{rule}</li>) || <li>No rules provided</li>}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-300 mb-2">Room Types & Pricing</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {hostel.rooms?.map((room, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-white">{room.type}</h3>
                <p className="text-sm text-gray-300">₹{room.price}/month</p>
                <p className="text-sm text-gray-400">Beds: {room.beds}</p>
                <p className="text-sm text-gray-400">Available: {room.available ? 'Yes' : 'No'}</p>
              </div>
            )) || <p>No room data</p>}
          </div>
        </div>

        <ReviewSection hostelId={id} />
      </motion.div>
    </div>
  );
};

export default HostelDetails;
