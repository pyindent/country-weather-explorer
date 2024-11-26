// vitest.setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';
vi.stubGlobal('import.meta', {
    env: {
        VITE_WEATHER_API_KEY: 'mock-api-key', // Replace with your test API key
    },
});