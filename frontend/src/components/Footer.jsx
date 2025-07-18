import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-8 px-4 md:px-16"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-cyan-400">PGFinder</h2>
          <p className="mt-2 text-sm text-gray-400">
            Your go-to platform to explore, compare, and manage hostels and PGs in major Indian cities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link to="/explore" className="hover:text-cyan-400 transition">Explore</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
          <div className="flex space-x-4">
            <a href="mailto:contact@pgfinder.in" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
              <FaEnvelope size={20} />
            </a>
            <a href="https://github.com/yourgithub" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com/yourhandle" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PGFinder. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
