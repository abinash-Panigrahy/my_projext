import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, setUser, loading } = useAuthContext();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isHostelAdmin = user?.role === 'hostel';

  return {
    user,
    setUser,
    loading,
    isAuthenticated,
    isAdmin,
    isHostelAdmin,
  };
};
