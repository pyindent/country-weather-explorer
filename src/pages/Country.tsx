import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryInfo } from "../services/countryService";
import { getWeatherInfo } from "../services/weatherService";
import CountryDetails from "../components/CountryDetails";
import WeatherCard from "../components/WeatherCard";
import Map from "../components/Map";

const Country: React.FC = () => {
  const { code } = useParams();
  const [countryInfo, setCountryInfo] = useState<any>({
    name: "",
    flag: "",
    population: "",
    region: "",
    subregion: "",
    capital: "",
    currencies: "",
    languages: [],
  });

  const [weatherInfo, setWeatherInfo] = useState<any>({
    weather: {
      main: "",
      description: "",
      icon: "",
    },
    temperature: "",
    huminity: "",
    cloudness: "",
    windspeed: "",
    coord: {
      lat: "",
      lon: "",
    },
  });

  const fetchDetails = async () => {
    try {
      const countryData = await getCountryInfo(code || "");
      setCountryInfo({
        name: countryData[0]?.name?.official || "Unknown",
        flag: countryData[0]?.flags?.svg || countryData[0]?.flags?.png || "",
        population: countryData[0]?.population || 0,
        region: countryData[0]?.region || "Unknown",
        subregion: countryData[0]?.subregion || "Unknown",
        capital: countryData[0]?.capital?.[0] || "N/A",
        currencies: countryData[0]?.currencies.name || "N/A",
        languages: Object.values(countryData[0]?.languages || []) || [],
      });

      const weatherData = await getWeatherInfo(countryData[0]?.capital[0]);
      setWeatherInfo({
        weather: weatherData.weather[0],
        temperature: weatherData.main.temp,
        huminity: weatherData.main.humidity,
        cloudness: weatherData.clouds.all,
        windspeed: weatherData.wind.speed,
        coord: weatherData.coord,
      });
    } catch (error) {
      console.error("Failed to fetch country details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [code]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <CountryDetails countryInfo={countryInfo} />
      <div className="flex flex-col lg:flex-row gap-10">
        <WeatherCard weatherInfo={weatherInfo} />
        <Map coord={weatherInfo.coord} name={countryInfo.name} />
      </div>
    </div>
  );
};

export default Country;
