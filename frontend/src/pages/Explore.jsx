import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Explore = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    // Fetch explore data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/explore');
        setHostels(response.data);
      } catch (error) {
        console.error('Failed to fetch explore data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/background.mp4"
        autoPlay
        loop
        muted
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10" />

      {/* Content */}
      <div className="relative z-20 py-16 px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore Hostels in Top Cities
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          {hostels.map((hostel, index) => (
            <motion.div
              key={hostel._id || index}
              className="bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-lg hover:shadow-pink-600 transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-cyan-400">{hostel.name}</h2>
              <p className="text-gray-300 mt-2">{hostel.city}</p>
              <p className="text-sm text-gray-400 mt-4">{hostel.description}</p>
            </motion.div>
          ))}
        </div>

        {hostels.length === 0 && (
          <motion.p
            className="text-center mt-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading hostel listings or none available at the moment.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Explore;
