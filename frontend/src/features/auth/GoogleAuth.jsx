// src/components/auth/GoogleAuth.jsx
import React, { useEffect, useContext } from 'react';
import {jwtDecode }from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin'),
        {
          theme: 'outline',
          size: 'large',
        }
      );
    }
  }, []);

  const handleCallbackResponse = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      console.log('Google user:', decoded);

      // Send to backend to create/login user
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google-login`,
        { token: response.credential },
        { withCredentials: true }
      );

      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  return <div id="google-signin"></div>;
};

export default GoogleAuth;
