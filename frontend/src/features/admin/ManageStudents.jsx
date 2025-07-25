import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const ManageStudents = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/students/${user._id}`,
          { withCredentials: true }
        );
        setStudents(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch students.');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchStudents();
  }, [user]);

  const handleDelete = async (studentId) => {
    const confirm = window.confirm('Are you sure you want to remove this student?');
    if (!confirm) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/student/${studentId}`,
        { withCredentials: true }
      );
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete student.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading students...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Students</h1>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 border dark:border-gray-700">Name</th>
                <th className="px-4 py-2 border dark:border-gray-700">Email</th>
                <th className="px-4 py-2 border dark:border-gray-700">Room</th>
                <th className="px-4 py-2 border dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="text-center">
                  <td className="px-4 py-2 border dark:border-gray-700">{student.name}</td>
                  <td className="px-4 py-2 border dark:border-gray-700">{student.email}</td>
                  <td className="px-4 py-2 border dark:border-gray-700">
                    {student.room?.roomNumber || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border dark:border-gray-700">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
