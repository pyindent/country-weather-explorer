// src/__tests__/countryService.test.ts
import axios from 'axios';
import { getCountryInfo, getAllCountries } from '../../services/countryService';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('countryService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getCountryInfo', () => {
    it('fetches country details successfully', async () => {
      const mockResponse = {
        data: [
          {
            name: { official: 'United States of America' },
            flags: { svg: 'us-flag.svg' },
            population: 331000000,
            region: 'Americas',
            subregion: 'Northern America',
            capital: ['Washington, D.C.'],
            currencies: { USD: { name: 'United States Dollar' } },
            languages: { eng: 'English' },
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getCountryInfo('US');
      expect(mockedAxios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/US');
      expect(result).toEqual(mockResponse.data);
    });

    it('returns null on API failure', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

      const result = await getCountryInfo('US');
      expect(mockedAxios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/US');
      expect(result).toBeNull();
    });
  });

  describe('getAllCountries', () => {
    it('fetches all countries successfully', async () => {
      const mockResponse = {
        data: [
          {
            name: { common: 'United States' },
            cca2: 'US',
            capital: ['Washington, D.C.'],
            population: 331000000,
            area: 9833520,
            region: 'Americas',
            flags: { svg: 'us-flag.svg' },
          },
          {
            name: { common: 'Canada' },
            cca2: 'CA',
            capital: ['Ottawa'],
            population: 37700000,
            area: 9984670,
            region: 'Americas',
            flags: { svg: 'ca-flag.svg' },
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getAllCountries();
      expect(mockedAxios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
      expect(result).toEqual([
        {
          name: 'United States',
          code: 'US',
          capital: ['Washington, D.C.'],
          population: 331000000,
          area: 9833520,
          region: 'Americas',
          flag: 'us-flag.svg',
        },
        {
          name: 'Canada',
          code: 'CA',
          capital: ['Ottawa'],
          population: 37700000,
          area: 9984670,
          region: 'Americas',
          flag: 'ca-flag.svg',
        },
      ]);
    });

    it('returns an empty array on API failure', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

      const result = await getAllCountries();
      expect(mockedAxios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
      expect(result).toEqual([]);
    });
  });
});
