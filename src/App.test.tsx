// src/App.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the Home and Country components
vi.mock('./pages/Home', () => ({
    default: () => <div>Mocked Home Page</div>,
}));

vi.mock('./pages/Country', () => ({
    default: () => <div>Mocked Country Page</div>,
}));

describe('App Routing', () => {
    it('renders the mocked Home component for default route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        // Assert the mocked Home page is rendered
        expect(screen.getByText('Mocked Home Page')).toBeInTheDocument();
    });

    it('renders the mocked Country component for /country/:code route', () => {
        render(
            <MemoryRouter initialEntries={['/country/US']}>
                <App />
            </MemoryRouter>
        );

        // Assert the mocked Country page is rendered
        expect(screen.getByText('Mocked Country Page')).toBeInTheDocument();
    });
});
