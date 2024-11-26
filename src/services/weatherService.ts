// src/services/weatherService.ts  
import axios from 'axios';  

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;  

export const getWeatherInfo = async (city: string) => {  
  const response = await axios.get(  
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`  
  );
  return response.data;
};