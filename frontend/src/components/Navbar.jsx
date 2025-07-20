import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-400 hover:text-white transition">
          PGFinder
        </Link>

        {/* Hamburger icon (mobile) */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Menu items */}
        <ul className={`md:flex md:space-x-6 md:static absolute top-full left-0 w-full bg-gray-900 md:w-auto md:bg-transparent flex-col md:flex-row transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden'}`}>
          <li className="px-4 py-2 md:py-0">
            <Link to="/" className="hover:text-blue-400 transition duration-200">Home</Link>
          </li>
          <li className="px-4 py-2 md:py-0">
            <Link to="/explore" className="hover:text-blue-400 transition duration-200">Explore</Link>
          </li>

          {user?.role === 'user' && (
            <li className="px-4 py-2 md:py-0">
              <Link to="/dashboard/user" className="hover:text-blue-400 transition duration-200">User Dashboard</Link>
            </li>
          )}

          {user?.role === 'hostel-admin' && (
            <li className="px-4 py-2 md:py-0">
              <Link to="/dashboard/hostel-admin" className="hover:text-blue-400 transition duration-200">Admin Dashboard</Link>
            </li>
          )}

          {user?.role === 'superadmin' && (
            <li className="px-4 py-2 md:py-0">
              <Link to="/dashboard/superadmin" className="hover:text-blue-400 transition duration-200">SuperAdmin</Link>
            </li>
          )}

          <li className="px-4 py-2 md:py-0">
            <Link to="/about" className="hover:text-blue-400 transition duration-200">About</Link>
          </li>

          <li className="px-4 py-2 md:py-0">
            <Link to="/contact" className="hover:text-blue-400 transition duration-200">Contact</Link>
          </li>

          <li className="px-4 py-2 md:py-0">
            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl w-full md:w-auto"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-white transition duration-300 block text-center w-full md:w-auto"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
