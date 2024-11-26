// src/tests/pages/Home.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { GET_COUNTRIES } from '../../gql/queries';
import Home from '../../pages/Home';
import { getAllCountries } from '../../services/countryService';

// Mock getAllCountries REST service
vi.mock('../../services/countryService', () => ({
    getAllCountries: vi.fn(),
}));

// Mock CountryCard and Filter components
vi.mock('../../components/CountryCard', () => ({
    default: ({ name }: { name: string }) => <div data-testid="country-card">{name}</div>,
}));

vi.mock('../../components/Filter', () => ({
    default: ({ onSearch, onSort }: { onSearch: (q: string) => void; onSort: (field: string) => void }) => (
        <div>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => onSearch(e.target.value)}
                data-testid="search-input"
            />
            <button onClick={() => onSort('name')} data-testid="sort-name">
                Sort by Name
            </button>
            <button onClick={() => onSort('population')} data-testid="sort-population">
                Sort by Population
            </button>
            <button onClick={() => onSort('area')} data-testid="sort-area">
                Sort by Area
            </button>
        </div>
    ),
}));

describe('Home Page', () => {
    const graphqlMock = {
        request: {
            query: GET_COUNTRIES,
            variables: { filter: '' },
        },
        result: {
            data: {
                countries: [
                    { name: 'United States', code: 'US', capital: 'Washington, D.C.', region: { name: 'Americas' } },
                    { name: 'Canada', code: 'CA', capital: 'Ottawa', region: { name: 'Americas' } },
                ],
            },
        },
    };

    const restCountriesMock = [
        { code: 'US', population: 331000000, area: 9833520, flag: 'us-flag.png' },
        { code: 'CA', population: 37700000, area: 9984670, flag: 'ca-flag.png' },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(getAllCountries).mockResolvedValue(restCountriesMock);
    });

    it('renders loading state initially', () => {
        render(
            <MockedProvider mocks={[graphqlMock]} addTypename={false}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </MockedProvider>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders error state on GraphQL error', async () => {
        render(
            <MockedProvider mocks={[{ ...graphqlMock, error: new Error('GraphQL Error') }]} addTypename={false}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/error fetching countries/i)).toBeInTheDocument();
        });
    });

    it('renders countries and filters them based on search input', async () => {
        render(
            <MockedProvider mocks={[graphqlMock]} addTypename={false}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </MockedProvider>
        );

        // Wait for countries to load
        await waitFor(() => expect(screen.getAllByTestId('country-card')).toHaveLength(2));

        // Assert initial render
        expect(screen.getByText('United States')).toBeInTheDocument();
        expect(screen.getByText('Canada')).toBeInTheDocument();

        // Filter countries using search
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'canada' } });

        await waitFor(() => {
            expect(screen.getByText('Canada')).toBeInTheDocument();
            expect(screen.queryByText('United States')).not.toBeInTheDocument();
        });
    });

    it('sorts countries by population and area', async () => {
        render(
            <MockedProvider mocks={[graphqlMock]} addTypename={false}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </MockedProvider>
        );

        // Wait for countries to load
        await waitFor(() => expect(screen.getAllByTestId('country-card')).toHaveLength(2));

        // Sort by population
        fireEvent.click(screen.getByTestId('sort-population'));
        await waitFor(() => {
            const countryCards = screen.getAllByTestId('country-card');
            expect(countryCards[0]).toHaveTextContent('Canada'); // Smaller population
            expect(countryCards[1]).toHaveTextContent('United States');
        });

        // Sort by area
        fireEvent.click(screen.getByTestId('sort-area'));
        await waitFor(() => {
            const countryCards = screen.getAllByTestId('country-card');
            expect(countryCards[0]).toHaveTextContent('United States'); // Smaller area
            expect(countryCards[1]).toHaveTextContent('Canada');
        });
    });
});
