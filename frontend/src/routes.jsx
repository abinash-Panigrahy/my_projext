import { Routes, Route } from 'react-router-dom';

// Auth
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import GoogleAuth from './features/auth/GoogleAuth';
import OtpVerification from './features/auth/otpVerification';

// User
import UserDashboard from './features/user/UserDashboard';
import UserProfile from './features/user/UserProfile';
import Recommendations from './features/user/Recommendations';

// Hostel
import HostelList from './features/hostel/HostelList';
import HostelDetails from './features/hostel/HostelDetails';
import ReviewSection from './features/hostel/ReviewSection';

// Admin
import HostelAdminDashboard from './features/admin/HostelAdminDashboard';
import ManageStudents from './features/admin/ManageStudents';

// Super Admin
import SuperAdminPanel from './features/superadmin/SuperAdminPanel';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import About from './pages/About';
import Contact from './pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/google-auth" element={<GoogleAuth />} />
      <Route path="/verify-otp" element={<OtpVerification />} />

      {/* User Routes */}
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/recommendations" element={<Recommendations />} />

      {/* Hostel Routes */}
      <Route path="/hostels" element={<HostelList />} />
      <Route path="/hostel/:id" element={<HostelDetails />} />
      <Route path="/hostel/:id/reviews" element={<ReviewSection />} />

      {/* Hostel Admin Routes */}
      <Route path="/dashboard/hostel-admin" element={<HostelAdminDashboard />} />
      <Route path="/manage-students" element={<ManageStudents />} />

      {/* Super Admin */}
      <Route path="/dashboard/superadmin" element={<SuperAdminPanel />} />
    </Routes>
  );
};

export default AppRoutes;
