// src/services/countryService.ts  
import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

export const getCountryInfo = async (code: String) => {
    try {
        const response = await axios.get(`${BASE_URL}/alpha/${code}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching country details from RestCountries API:", error);
        return null;
    }
}

export const getAllCountries = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data.map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            capital: country.capital,
            population: country.population,
            area: country.area,
            region: country.region,
            flag: country.flags.svg,
        }));
    } catch (error) {
        console.error("Error fetching countries list", error);
        return [];
    }
};