import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { getUserProfile } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  return (
    <motion.div
      className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-6 border-b-2 pb-2 border-gray-600">
        Welcome, {profile?.name || 'User'} 👋
      </h1>

      {profile ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Your Info</h2>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
            <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Status</h2>
            <p>You are currently logged in.</p>
            <p>Role: <span className="text-green-400">{profile.role || 'user'}</span></p>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p>Loading profile...</p>
        </div>
      )}
    </motion.div>
  );
};

export default UserDashboard;
