import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Try again.');
    }
  };

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/background.mp4"
        autoPlay
        loop
        muted
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center py-16 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Contact Us
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-gray-800 bg-opacity-80 p-8 rounded-2xl shadow-2xl space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div>
            <label className="block text-sm text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-pink-500 hover:to-yellow-500 text-white rounded-lg transition duration-300 font-semibold"
          >
            Send Message
          </button>

          {status && <p className="text-center text-sm mt-4">{status}</p>}
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
