import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Example backend call
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/home'); // customize endpoint
        setMessage(response.data.message);
      } catch (err) {
        console.error(err);
        setMessage('Welcome to HostelHub — Your Comfort, Our Priority.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* 🔥 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/krsnna.mp4" // place your video in `public/background.mp4`
        autoPlay
        loop
        muted
      />

      {/* 🎨 Dark overlay for contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

      {/* 💫 Main content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          HostelHub
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-300 max-w-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {message}
        </motion.p>

        <motion.a
          href="/explore"
          className="mt-8 px-6 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Explore Hostels
        </motion.a>
      </div>
    </div>
  );
};

export default Home;
