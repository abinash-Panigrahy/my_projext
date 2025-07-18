import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const About = () => {
  const [info, setInfo] = useState('Loading...');

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/about'); // Backend API endpoint
        setInfo(res.data.message);
      } catch (error) {
        console.error(error);
        setInfo('HostelHub is a platform built to connect students with the best hostels across India. Our mission is to provide reliable, transparent, and updated hostel listings.');
      }
    };

    fetchAbout();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/background.mp4"
        autoPlay
        loop
        muted
      />

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About HostelHub
        </motion.h2>

        <motion.p
          className="text-lg md:text-2xl text-gray-300 max-w-3xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {info}
        </motion.p>
      </div>
    </div>
  );
};

export default About;
