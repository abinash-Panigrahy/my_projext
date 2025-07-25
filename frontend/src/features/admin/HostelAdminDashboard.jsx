import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const HostelAdminDashboard = () => {
  const { user } = useAuth(); // assuming user contains hostelAdmin's _id
  const [hostelData, setHostelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminHostels = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/hostels/${user._id}`,
          { withCredentials: true }
        );
        setHostelData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load hostel data.');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchAdminHostels();
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Hostel Admin Dashboard</h1>

      {hostelData.length === 0 ? (
        <p>No hostels found under your account.</p>
      ) : (
        hostelData.map((hostel) => (
          <div
            key={hostel._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-6"
          >
            <h2 className="text-xl font-semibold text-blue-600">{hostel.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">{hostel.location}</p>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Floors:</p>
                <p className="text-lg font-bold">{hostel.floors?.length || 0}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Rooms:</p>
                <p className="text-lg font-bold">
                  {hostel.floors?.reduce((acc, floor) => acc + floor.rooms.length, 0) || 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Students:</p>
                <p className="text-lg font-bold">{hostel.students?.length || 0}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                Add Student
              </button>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                Edit Hostel Info
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HostelAdminDashboard;
