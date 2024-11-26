// src/__tests__/CountryDetails.test.tsx
import { render, screen } from '@testing-library/react';
import CountryDetails from '../../components/CountryDetails';

describe('CountryDetails Component', () => {
  const mockCountryInfo = {
    name: 'United States',
    flag: 'us-flag.png',
    population: 331000000,
    region: 'Americas',
    subregion: 'Northern America',
    capital: 'Washington, D.C.',
    currencies: ['USD'],
    languages: ['English'],
  };

  it('renders all details correctly', () => {
    render(<CountryDetails countryInfo={mockCountryInfo} />);

    // Assert the main details are rendered
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByAltText('United States flag')).toHaveAttribute('src', 'us-flag.png');
    expect(screen.getByText(/331,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Americas/i)).toBeInTheDocument();
    expect(screen.getByText(/Northern America/i)).toBeInTheDocument();
    expect(screen.getByText(/Washington, D.C./i)).toBeInTheDocument();
    expect(screen.getByText(/USD/i)).toBeInTheDocument();
    expect(screen.getByText(/English/i)).toBeInTheDocument();
  });
});
