import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payments'; // Update based on your backend route

// Make a payment (for students)
export const makePayment = async (paymentData) => {
  const res = await axios.post(`${API_URL}/pay`, paymentData, {
    withCredentials: true,
  });
  return res.data;
};

// Get all payments for the logged-in student
export const getMyPayments = async () => {
  const res = await axios.get(`${API_URL}/my`, {
    withCredentials: true,
  });
  return res.data;
};

// Get all payments (for hostel admins)
export const getPaymentsByHostel = async (hostelId) => {
  const res = await axios.get(`${API_URL}/hostel/${hostelId}`, {
    withCredentials: true,
  });
  return res.data;
};

// Admin: mark payment as received
export const markPaymentReceived = async (paymentId) => {
  const res = await axios.patch(`${API_URL}/mark-received/${paymentId}`, {}, {
    withCredentials: true,
  });
  return res.data;
};

// Super Admin: get all transactions on platform
export const getAllTransactions = async () => {
  const res = await axios.get(`${API_URL}/all`, {
    withCredentials: true,
  });
  return res.data;
};
