import { createContext, useContext, useState } from 'react';
import { logoutUser } from '../services/authService'; // ✅ You forgot this

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // Stores logged-in user info
  const [loading, setLoading] = useState(true);   // Tracks auth loading state

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();     // API call to backend
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuthContext = () => useContext(AuthContext);
