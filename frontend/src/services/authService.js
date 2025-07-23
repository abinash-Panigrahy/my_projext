import axios from 'axios';

// Set up axios instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  withCredentials: true, // allow sending cookies if your backend uses them
});

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Register Error:', error);
    throw error.response?.data || error.message;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await API.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout Error:', error);
    throw error.response?.data || error.message;
  }
};

// Get logged-in user's profile
export const getUserProfile = async () => {
  try {
    const response = await API.get('/me');
    return response.data;
  } catch (error) {
    console.error('Get User Profile Error:', error);
    throw error.response?.data || error.message;
  }
  
};
// OTP verification
export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await API.post('/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('OTP Verification Error:', error);
    throw error.response?.data || error.message;
  }
};
