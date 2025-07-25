// server.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Secure headers
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // Parse cookies
app.use(xss()); // Prevent XSS attacks
app.use(mongoSanitize()); // Prevent NoSQL Injection

// Rate Limiting to prevent brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Test route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// =========================
// ✅ ROUTE MOUNTING POINTS
// =========================
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import hostelRoutes from './routes/hostelRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

app.use('/api/auth', authRoutes); // Login, Register, OTP, Role-based auth
app.use('/api/users', userRoutes); // User profile, dashboard, preferences
app.use('/api/hostels', hostelRoutes); // Hostels, floors, rooms
app.use('/api/reviews', reviewRoutes); // Review/Rating APIs
app.use('/api/admin', adminRoutes); // Hostel Admin specific actions
app.use('/api/superadmin', superAdminRoutes); // Approvals, ban, analytics
app.use('/api/subscription', subscriptionRoutes); // Plan, status, expiry
app.use('/api/students', studentRoutes); // Add/view/manage students
app.use('/api/payments', paymentRoutes); // Rent payments and history

// Global error handler
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
