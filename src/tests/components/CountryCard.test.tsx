// src/tests/components/CountryCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../../components/CountryCard';
import { vi } from 'vitest';

describe('CountryCard Component', () => {
  const mockProps = {
    name: 'United States',
    capital: 'Washington, D.C.',
    region: 'Americas',
    population: 331000000,
    area: 9833520,
    flag: 'us-flag.png',
    onSelect: vi.fn(), // Mock the onSelect handler
  };

  it('renders the component with correct values', () => {
    render(<CountryCard {...mockProps} />);

    // Check flag image
    const flagImage = screen.getByAltText('United States flag');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'us-flag.png');

    // Check text content
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('331,000,000')).toBeInTheDocument();
    expect(screen.getByText('9,833,520 km²')).toBeInTheDocument();
  });

  it('displays "N/A" for missing values', () => {
    const propsWithMissingValues = {
      ...mockProps,
      capital: '',
      region: '',
      population: 'N/A',
      area: 'N/A',
    };

    render(<CountryCard {...propsWithMissingValues} />);

    expect(screen.getByText(/Capital:/i)).toBeInTheDocument();
    expect(screen.getByText(/Region:/i)).toBeInTheDocument();
    expect(screen.getByText(/Population:/i)).toBeInTheDocument();
    expect(screen.getByText(/Area:/i)).toBeInTheDocument();
  });

  it('calls onSelect handler when clicked', () => {
    render(<CountryCard {...mockProps} />);

    // Click the card
    const card = screen.getByText('United States').closest('div');
    fireEvent.click(card!);

    // Check if onSelect was called
    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });
});
