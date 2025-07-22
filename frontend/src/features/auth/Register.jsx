import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({});

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMsg({ type: 'success', text: 'Registered successfully!' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const error = err.response?.data?.message || 'Registration failed.';
      setMsg({ type: 'error', text: error });
    } finally {
      setLoading(false);
    }
  };

  // 👇 Google Sign-In handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const googleData = {
        fullName: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
        profilePicture: decoded.picture,
      };

      const res = await axios.post('http://localhost:5000/api/auth/google', googleData);

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      console.error('Google Login Failed', error);
      setMsg({ type: 'error', text: 'Google Login Failed' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Create an Account</h2>

        {msg.text && (
          <div
            className={`text-sm px-4 py-2 rounded text-center ${
              msg.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="user">User</option>
            <option value="hostelAdmin">Hostel Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold hover:scale-105 transition-transform"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-4">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setMsg({ type: 'error', text: 'Google login failed' })} />
        </div>

        <p className="text-gray-400 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-purple-400 hover:underline">
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
