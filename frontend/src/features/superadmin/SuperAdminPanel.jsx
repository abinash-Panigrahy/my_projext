import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import ProtectedRoute from '../../components/ProtectedRoute';

const SuperAdminPanel = () => {
  const { user } = useAuth(); // Must be Super Admin
  const [hostelRequests, setHostelRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingHostels = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/superadmin/pending-hostels`, {
          withCredentials: true,
        });
        setHostelRequests(res.data.hostels || []);
      } catch (err) {
        setError('Failed to load pending hostels');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'superadmin') fetchPendingHostels();
  }, [user]);

  const handleApproval = async (hostelId, isApproved) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/superadmin/approve-hostel/${hostelId}`,
        { isApproved },
        { withCredentials: true }
      );

      setHostelRequests((prev) =>
        prev.filter((hostel) => hostel._id !== hostelId)
      );
    } catch (err) {
      console.error('Approval error:', err);
      alert('Action failed. Please try again.');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading pending hostels...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <ProtectedRoute allowedRoles={['superadmin']}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Super Admin Panel</h1>
        {hostelRequests.length === 0 ? (
          <p className="text-gray-600">No pending hostel approvals.</p>
        ) : (
          <div className="space-y-4">
            {hostelRequests.map((hostel) => (
              <div
                key={hostel._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{hostel.name}</h2>
                  <p className="text-sm text-gray-500">{hostel.city}, {hostel.ownerEmail}</p>
                </div>
                <div className="mt-3 sm:mt-0 flex gap-3">
                  <button
                    onClick={() => handleApproval(hostel._id, true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(hostel._id, false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default SuperAdminPanel;
