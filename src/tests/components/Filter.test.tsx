// src/__tests__/Filter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../../components/Filter';
import { vi } from 'vitest';

describe('Filter Component', () => {
  const mockOnSearch = vi.fn();
  const mockOnSort = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input and select elements', () => {
    render(<Filter onSearch={mockOnSearch} onSort={mockOnSort} />);

    // Check for input element
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    expect(searchInput).toBeInTheDocument();

    // Check for select element
    const sortSelect = screen.getByRole('combobox');
    expect(sortSelect).toBeInTheDocument();

    // Check for sort options
    expect(screen.getByText('Sort by Name')).toBeInTheDocument();
    expect(screen.getByText('Sort by Population')).toBeInTheDocument();
    expect(screen.getByText('Sort by Area')).toBeInTheDocument();
  });

  it('calls onSearch handler when typing in the search input', () => {
    render(<Filter onSearch={mockOnSearch} onSort={mockOnSort} />);

    // Simulate typing in the search input
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Canada' } });

    // Check if onSearch was called with the correct value
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Canada');
  });

  it('calls onSort handler when selecting a sort option', () => {
    render(<Filter onSearch={mockOnSearch} onSort={mockOnSort} />);

    // Simulate selecting an option in the dropdown
    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'population' } });

    // Check if onSort was called with the correct value
    expect(mockOnSort).toHaveBeenCalledTimes(1);
    expect(mockOnSort).toHaveBeenCalledWith('population');
  });

  it('updates search query state when typing', () => {
    render(<Filter onSearch={mockOnSearch} onSort={mockOnSort} />);

    // Simulate typing in the search input
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Germany' } });

    // Check if the input value is updated
    expect(searchInput).toHaveValue('Germany');
  });
});
