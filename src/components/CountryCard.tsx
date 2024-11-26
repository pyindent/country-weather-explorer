import React from "react";

interface CountryCardProps {
  name: string;
  capital: string;
  region: string;
  population: number | string;
  area: number | string;
  flag: string;
  onSelect: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  capital,
  region,
  population,
  area,
  flag,
  onSelect,
}) => {
  return (
    <div
      className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-300"
      onClick={onSelect}
    >
      {/* Flag Section */}
      <img
        src={flag}
        alt={`${name} flag`}
        className="w-full h-40 object-cover"
      />

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Capital:</strong> {capital || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Region:</strong> {region || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Population:</strong> {population.toLocaleString() || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Area:</strong> {area ? `${area.toLocaleString()} km²` : "N/A"}
        </p>
      </div>

      {/* Action Section */}
      <div className="absolute bottom-2 right-2">
        <div className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
