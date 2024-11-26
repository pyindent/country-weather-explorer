import React from "react";

interface WeatherCardProps {
  weatherInfo: {
    weather: {
      main: string;
      description: string;
      icon: string;
    };
    temperature: string;
    huminity: string;
    cloudness: string;
    windspeed: string;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherInfo }) => (
  <div className="bg-blue-100 rounded-lg shadow-md p-6 flex-1">
    <div className="flex items-center gap-4">
      <img
        src={`http://openweathermap.org/img/wn/${weatherInfo.weather.icon}@2x.png`}
        alt={`${weatherInfo.weather.main} weather`}
        className="w-16 h-16"
      />
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{weatherInfo.weather.main}</h3>
        <p className="text-gray-600 italic">{weatherInfo.weather.description}</p>
      </div>
    </div>
    <ul className="mt-4 space-y-2">
      <li className="text-lg text-gray-700">
        <strong className="font-semibold">Temperature:</strong> {weatherInfo.temperature} °C
      </li>
      <li className="text-lg text-gray-700">
        <strong className="font-semibold">Humidity:</strong> {weatherInfo.huminity} %
      </li>
      <li className="text-lg text-gray-700">
        <strong className="font-semibold">Cloudiness:</strong> {weatherInfo.cloudness} %
      </li>
      <li className="text-lg text-gray-700">
        <strong className="font-semibold">Wind Speed:</strong> {weatherInfo.windspeed} m/s
      </li>
    </ul>
  </div>
);

export default WeatherCard;
