import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-800 rounded-2xl px-4 py-2 w-full max-w-xl shadow-md transition-all focus-within:ring-2 focus-within:ring-blue-400"
    >
      <Search className="text-gray-400 mr-3" size={20} />
      <input
        type="text"
        placeholder="Search for PGs in your city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent flex-grow outline-none text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl transition duration-300 text-sm"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
