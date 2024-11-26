// src/__tests__/Country.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Country from '../../pages/Country';
import { getCountryInfo } from '../../services/countryService';
import { getWeatherInfo } from '../../services/weatherService';

// Mock the services
vi.mock('../../services/countryService', () => ({
    getCountryInfo: vi.fn(),
}));

vi.mock('../../services/weatherService', () => ({
    getWeatherInfo: vi.fn(),
}));

vi.mock('../../components/CountryDetails', () => ({
    default: ({ countryInfo }: { countryInfo: any }) => (
        <div data-testid="country-details">
            {countryInfo?.name ? <div>{countryInfo.name}</div> : <div>No Country Info</div>}
        </div>
    ),
}));

vi.mock('../../components/WeatherCard', () => ({
    default: ({ weatherInfo }: { weatherInfo: any }) => (
        <div data-testid="weather-card">
            {weatherInfo?.weather?.main ? <div>{weatherInfo.weather.main}</div> : <div>No Weather Info</div>}
        </div>
    ),
}));

vi.mock('../../components/Map', () => ({
    default: ({ coord }: { coord: { lat: string; lon: string } }) => (
        <div data-testid="map">
            {coord?.lat && coord?.lon ? (
                <>
                    <div>{coord.lat}</div>
                    <div>{coord.lon}</div>
                </>
            ) : (
                <div>No Map Info</div>
            )}
        </div>
    ),
}));


describe('Country Page', () => {
    const mockCountryData = [
        {
            name: { official: 'United States of America' },
            flags: { svg: 'us-flag.svg', png: 'us-flag.png' },
            population: 331000000,
            region: 'Americas',
            subregion: 'Northern America',
            capital: ['Washington, D.C.'],
            currencies: { USD: { name: 'United States Dollar' } },
            languages: { eng: 'English' },
        },
    ];

    const mockWeatherData = {
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        main: { temp: 25, humidity: 40 },
        clouds: { all: 5 },
        wind: { speed: 10 },
        coord: { lat: '38.9072', lon: '-77.0369' },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(getCountryInfo).mockResolvedValue(mockCountryData);
        vi.mocked(getWeatherInfo).mockResolvedValue(mockWeatherData);
    });

    it('renders country details and weather card', async () => {
        render(
            <MemoryRouter initialEntries={['/country/US']}>
                <Routes>
                    <Route path="/country/:code" element={<Country />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for country details to be displayed
        await waitFor(() => {
            expect(screen.getByTestId('country-details')).toBeInTheDocument();
            expect(screen.getByText('United States of America')).toBeInTheDocument();
        });

        // Wait for weather card to be displayed
        await waitFor(() => {
            expect(screen.getByTestId('weather-card')).toBeInTheDocument();
            expect(screen.getByText('Clear')).toBeInTheDocument();
        });

        // Assert map rendering with coordinates
        await waitFor(() => {
            expect(screen.getByTestId('map')).toBeInTheDocument();
            expect(screen.getByText('38.9072')).toBeInTheDocument();
            expect(screen.getByText('-77.0369')).toBeInTheDocument();
        });
    });
});
