import React from "react";
import { Link } from "react-router-dom";

const Recommendation = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-20">
      {/* Background video (optional) */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-30"
        src="/bg.mp4"
      />

      <div className="text-center space-y-6 max-w-3xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 drop-shadow-lg">
          Personalized PG Recommendations for You
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Based on your preferences, location, and budget, here are some top PGs you might like. 
          You can explore or refine your search anytime!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* PG Card Example */}
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-gray-900 rounded-2xl shadow-md p-6 transform hover:scale-105 transition duration-300 border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-blue-300">PG Heaven {id}</h2>
              <p className="text-sm text-gray-400 mt-2">
                Located in Hyderabad · ₹6,000/month · 4.5★ rating
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium rounded-lg">
                View Details
              </button>
            </div>
          ))}
        </div>

        <Link
          to="/explore"
          className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white text-lg transition-all duration-300"
        >
          Explore More PGs
        </Link>
      </div>
    </div>
  );
};

export default Recommendation;
