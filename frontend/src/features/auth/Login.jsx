import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
// import GoogleAuth from '../../components/auth/GoogleAuth';

// Inside your return
<GoogleAuth />


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      setUser(res.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm animate-fade-in">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
