// src/gql/queries.ts  
import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries($filter: String) {
    countries(filter: { name: { regex: $filter } }) {
      name
      code
      capital
      region: continent {
        name
      }
      languages {
        name
      }
      currencies
    }
  }
`;