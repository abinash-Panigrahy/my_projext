import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HostelCard = ({ hostel }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hostel/${hostel._id}`); // Navigate to hostel details
  };

  return (
    <motion.div
      className="bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={hostel.imageUrl || '/hostel-placeholder.jpg'}
          alt={hostel.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-1">{hostel.name}</h2>
        <p className="text-sm text-gray-400 mb-2">{hostel.city}, {hostel.state}</p>
        <p className="text-gray-300 text-sm line-clamp-3">{hostel.description}</p>
        <p className="text-indigo-400 mt-3 font-semibold">₹{hostel.feeStructure?.monthly || 'N/A'}/month</p>
      </div>
    </motion.div>
  );
};

export default HostelCard;
