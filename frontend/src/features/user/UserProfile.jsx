import React, { useEffect, useState } from 'react';

import { getUserProfile } from '../../services/authService';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const userData = await getLoggedInUser();
        const userData = await getUserProfile();

        setUser(userData.user);
      } catch (error) {
        console.error('Profile Load Error:', error);
        navigate('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800/60 shadow-2xl rounded-2xl p-8 border border-gray-700 backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-4 animate-fade-in">Your Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400">Name</label>
            <p className="text-lg font-medium">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <p className="text-lg font-medium">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400">Role</label>
            <p className="text-lg font-medium capitalize">{user?.role || 'user'}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400">Account Created</label>
            <p className="text-lg font-medium">{new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {/* Future edit functionality */}
        <div className="mt-6">
          <button
            onClick={() => alert('Edit functionality coming soon!')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
