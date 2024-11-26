// src/components/Filter.tsx
import React, { useState } from "react";

interface FilterProps {
  onSearch: (search: string) => void;
  onSort: (field: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onSearch, onSort }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 shadow rounded-md">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        onChange={(e) => onSort(e.target.value)}
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="name">Sort by Name</option>
        <option value="population">Sort by Population</option>
        <option value="area">Sort by Area</option>
      </select>
    </div>
  );
};

export default Filter;
