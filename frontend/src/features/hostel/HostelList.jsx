import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHostelById } from '../../services/hostelService'; // or '@/services/hostelService' if alias works
import RatingStars from '../../components/RatingStars';

const HostelDetails = () => {
  const { id } = useParams(); // URL param for hostel ID
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const data = await getHostelById(id);
        setHostel(data.hostel || data); // support both formats
      } catch (err) {
        console.error('Error loading hostel details:', err);
        setError('Unable to load hostel details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse">Loading hostel details...</p>
      </div>
    );
  }

  if (error || !hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        <p className="text-lg">{error || 'Hostel not found.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h1 className="text-4xl font-bold mb-4">{hostel.name}</h1>
        <p className="text-gray-400 mb-6">{hostel.description || 'No description available.'}</p>

        <div className="mb-6">
          <RatingStars rating={hostel.rating || 4.2} />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 text-lg">
          <div>
            <h3 className="font-semibold text-blue-400">City</h3>
            <p>{hostel.city}</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Location</h3>
            <p>{hostel.location}</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Available Rooms</h3>
            <p>{hostel.availableRooms || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Monthly Fee</h3>
            <p>₹{hostel.feeStructure?.monthly || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Food Menu</h3>
            <ul className="list-disc list-inside">
              {hostel.foodMenu?.map((item, index) => (
                <li key={index}>{item}</li>
              )) || <li>No food menu listed.</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Rules</h3>
            <ul className="list-disc list-inside">
              {hostel.rules?.map((rule, index) => (
                <li key={index}>{rule}</li>
              )) || <li>No rules listed.</li>}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            onClick={() => alert('Booking feature coming soon!')}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
