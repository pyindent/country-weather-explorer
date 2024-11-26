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

export const GET_COUNTRY_DETAILS = gql`  
  query GetCountryDetails($code: ID!) {  
    country(code: $code) {
      name
      native
      capital
      currency
      languages {
        name
      }
    }  
  }  
`;