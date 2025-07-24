import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hotels'; // Adjust as per your backend route

// Create a new hostel (for hostel admin)
export const createHostel = async (hostelData) => {
  const res = await axios.post(`${API_URL}/create`, hostelData, {
    withCredentials: true,
  });
  return res.data;
};

// Get all hostels (for users to explore)
export const getAllHostels = async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
};

// Get hostel by ID (detailed view)
export const getHostelById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Update hostel (admin panel)
export const updateHostel = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData, {
    withCredentials: true,
  });
  return res.data;
};

// Delete hostel (admin panel)
export const deleteHostel = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// Get hostels by current hostel admin
export const getMyHostels = async () => {
  const res = await axios.get(`${API_URL}/my-hostels`, {
    withCredentials: true,
  });
  return res.data;
};
// Get reviews
export const getReviewsByHostelId = async (hostelId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/hostels/${hostelId}/reviews`);
  return res.data;
};

// Submit review
export const submitReview = async (hostelId, reviewData) => {
  const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/hostels/${hostelId}/reviews`, reviewData, {
    withCredentials: true,
  });
  return res.data;
};
