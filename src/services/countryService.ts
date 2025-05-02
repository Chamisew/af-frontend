import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        common: string;
        official: string;
      };
    };
  };
  population: number;
  area: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms?: {
    png: string;
    svg: string;
  };
  languages: {
    [key: string]: string;
  };
  cca3: string;
  subregion?: string;
  tld?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  borders?: string[];
  timezones: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
}

export const countryService = {
  getAllCountries: async (): Promise<Country[]> => {
    try {
      console.log('Fetching all countries...');
      const response = await axios.get(`${BASE_URL}/all`);
      console.log('All countries fetched successfully:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw error;
    }
  },

  getCountryByName: async (name: string): Promise<Country[]> => {
    try {
      console.log('Searching country by name:', name);
      const response = await axios.get(`${BASE_URL}/name/${name}`);
      console.log('Country search results:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('Error searching country by name:', error);
      throw error;
    }
  },

  getCountriesByRegion: async (region: string): Promise<Country[]> => {
    try {
      console.log('Fetching countries by region:', region);
      const response = await axios.get(`${BASE_URL}/region/${region}`);
      console.log('Region results:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries by region:', error);
      throw error;
    }
  },

  getCountryByCode: async (code: string): Promise<Country> => {
    try {
      console.log('Fetching country by code:', code);
      const response = await axios.get(`${BASE_URL}/alpha/${code}`);
      console.log('Country details fetched:', response.data[0]?.name.common);
      return response.data[0];
    } catch (error) {
      console.error('Error fetching country by code:', error);
      throw error;
    }
  },

  getCountriesByLanguage: async (language: string): Promise<Country[]> => {
    try {
      console.log('Fetching countries by language:', language);
      const response = await axios.get(`${BASE_URL}/lang/${language}`);
      console.log('Language results:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries by language:', error);
      throw error;
    }
  }
}; 