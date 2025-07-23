import React, { useState } from 'react';
import { verifyOtp } from '../../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email) {
      setError('Email not provided for verification.');
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOtp({ email, otp });
      alert('OTP Verified! Logging you in...');
      navigate('/user/dashboard'); // or wherever you want
    } catch (err) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-800/60 p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-700 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">OTP Verification</h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Please enter the OTP sent to <span className="font-medium text-white">{email || 'your email'}</span>
        </p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 text-white font-semibold"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/auth/login')}
            className="text-blue-400 hover:underline text-sm"
          >
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
