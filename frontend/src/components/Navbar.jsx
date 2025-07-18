import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-white transition duration-300">
        PGFinder
      </Link>

      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
        </li>
        <li>
          <Link to="/explore" className="hover:text-blue-400 transition duration-300">Explore</Link>
        </li>
        {user && user.role === 'user' && (
          <li>
            <Link to="/dashboard/user" className="hover:text-blue-400 transition duration-300">User Dashboard</Link>
          </li>
        )}
        {user && user.role === 'hostel-admin' && (
          <li>
            <Link to="/dashboard/hostel-admin" className="hover:text-blue-400 transition duration-300">Admin Dashboard</Link>
          </li>
        )}
        {user && user.role === 'superadmin' && (
          <li>
            <Link to="/dashboard/superadmin" className="hover:text-blue-400 transition duration-300">SuperAdmin</Link>
          </li>
        )}
        <li>
          <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
        </li>
      </ul>

      <div>
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-white transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
