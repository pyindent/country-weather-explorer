// src/__tests__/queries.test.ts
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../../gql/queries';

// Test Component to Use the Query
const TestComponent: React.FC<{ filter: string }> = ({ filter }) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: { filter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.countries.map((country: any) => (
        <li key={country.code}>
          {country.name} - {country.capital}
        </li>
      ))}
    </ul>
  );
};

describe('GET_COUNTRIES Query', () => {
  const mocks = [
    {
      request: {
        query: GET_COUNTRIES,
        variables: { filter: '' },
      },
      result: {
        data: {
          countries: [
            {
              name: 'United States',
              code: 'US',
              capital: 'Washington, D.C.',
              region: { name: 'Americas' },
              languages: [{ name: 'English' }],
              currencies: ['USD'],
            },
            {
              name: 'Canada',
              code: 'CA',
              capital: 'Ottawa',
              region: { name: 'Americas' },
              languages: [{ name: 'English' }, { name: 'French' }],
              currencies: ['CAD'],
            },
          ],
        },
      },
    },
    {
      request: {
        query: GET_COUNTRIES,
        variables: { filter: 'Can' },
      },
      result: {
        data: {
          countries: [
            {
              name: 'Canada',
              code: 'CA',
              capital: 'Ottawa',
              region: { name: 'Americas' },
              languages: [{ name: 'English' }, { name: 'French' }],
              currencies: ['CAD'],
            },
          ],
        },
      },
    },
  ];

  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestComponent filter="" />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders data correctly for no filter', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestComponent filter="" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('United States - Washington, D.C.')).toBeInTheDocument();
      expect(screen.getByText('Canada - Ottawa')).toBeInTheDocument();
    });
  });

  it('renders data correctly for a specific filter', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestComponent filter="Can" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Canada - Ottawa')).toBeInTheDocument();
      expect(screen.queryByText('United States - Washington, D.C.')).not.toBeInTheDocument();
    });
  });

  it('renders error state on failure', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_COUNTRIES,
          variables: { filter: '' },
        },
        error: new Error('GraphQL error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <TestComponent filter="" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: GraphQL error')).toBeInTheDocument();
    });
  });
});
