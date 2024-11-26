import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../gql/queries";
import { getAllCountries } from "../services/countryService";
import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";

const Home: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]); // All fetched countries
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]); // Search-filtered countries
  const [searchQuery, setSearchQuery] = useState(""); // Decoupled search input
  const [sortField, setSortField] = useState("name"); // Default sort field
  const navigate = useNavigate();

  const graphqlCountries = useQuery(GET_COUNTRIES, {
    variables: { filter: "" },
  });

  // Fetch REST countries and merge with GraphQL results
  useEffect(() => {
    const fetchData = async () => {
      const restCountries = await getAllCountries();
      
      if (graphqlCountries.data) {
        const mergedCountries = graphqlCountries.data.countries.map((country: any) => {
          const restData = restCountries.find(
            (r: any) => r.code === country.code
          );
          return {
            ...country,
            population: restData?.population || "Unknown",
            area: restData?.area || "Unknown",
            flag: restData?.flag || "",
          };
        });

        setCountries(mergedCountries);
        setFilteredCountries(mergedCountries); // Default filtered list
      }
    };

    fetchData();
  }, [graphqlCountries.data]);

  // Filter countries based on the search query
  useEffect(() => {
    let updatedList = [...countries];

    // Apply search filter
    if (searchQuery) {
      updatedList = updatedList.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sort logic
    switch (sortField) {
      case "name":
        updatedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "population":
        updatedList.sort((a, b) => (a.population || 0) - (b.population || 0));
        break;
      case "area":
        updatedList.sort((a, b) => (a.area || 0) - (b.area || 0));
        break;
      default:
        break;
    }

    setFilteredCountries(updatedList);
  }, [searchQuery, sortField, countries]);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (field: string) => setSortField(field);

  // Loading/Error States
  if (graphqlCountries.loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (graphqlCountries.error) return <p className="text-center text-red-600">Error fetching countries.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto">
        <Filter onSearch={handleSearch} onSort={handleSort} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.name}
              name={country.name}
              capital={country.capital}
              region={country.region.name}
              population={country.population}
              area={country.area}
              flag={country.flag}
              onSelect={() => navigate(`/country/${country.code}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
