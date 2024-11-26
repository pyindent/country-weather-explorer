import React from "react";

interface CountryDetailsProps {
  countryInfo: {
    name: string;
    flag: string;
    population: string | number;
    region: string;
    subregion: string;
    capital: string;
    currencies: string[];
    languages: string[];
  };
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ countryInfo }) => (
  <>
    <h1 className="text-4xl font-bold text-gray-900">{countryInfo.name}</h1>
    <div className="flex flex-col md:flex-row gap-10">
      <img
        src={countryInfo.flag}
        alt={`${countryInfo.name} flag`}
        className="w-full md:w-1/3 rounded-lg shadow-md"
      />
      <ul className="flex-1 bg-white rounded-lg shadow-md p-6 space-y-4">
        <li className="text-lg text-gray-700">
          <strong className="font-semibold">Population:</strong> {countryInfo.population.toLocaleString()}
        </li>
        <li className="text-lg text-gray-700">
          <strong className="font-semibold">Region:</strong> {countryInfo.region}
        </li>
        <li className="text-lg text-gray-700">
          <strong className="font-semibold">Sub Region:</strong> {countryInfo.subregion}
        </li>
        <li className="text-lg text-gray-700">
          <strong className="font-semibold">Capital:</strong> {countryInfo.capital}
        </li>
        <li className="text-lg text-gray-700">
          <strong className="font-semibold">Currencies:</strong> {countryInfo.currencies}
        </li>
        <li className="text-lg text-gray-700">
          <strong className="font-semibold">Languages:</strong> {countryInfo.languages.join(", ")}
        </li>
      </ul>
    </div>
  </>
);

export default CountryDetails;
