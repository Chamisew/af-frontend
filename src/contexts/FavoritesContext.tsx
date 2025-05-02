import React, { createContext, useContext, useState, useEffect } from 'react';
import { Country } from '../services/countryService';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Country[];
  addFavorite: (country: Country) => void;
  removeFavorite: (countryName: string) => void;
  isFavorite: (countryName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Country[]>([]);
  const { currentUser } = useAuth();

  // Load favorites from localStorage on initial render and when user changes
  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }

    try {
      const storageKey = `favorites_${currentUser.username}`;
      const storedFavorites = localStorage.getItem(storageKey);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        console.log('Loaded favorites for user:', currentUser.username, parsedFavorites);
        setFavorites(parsedFavorites);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  }, [currentUser]);

  const addFavorite = (country: Country) => {
    if (!currentUser) return;

    try {
      console.log('Adding favorite for user:', currentUser.username, country);
      const newFavorites = [...favorites, country];
      setFavorites(newFavorites);
      const storageKey = `favorites_${currentUser.username}`;
      localStorage.setItem(storageKey, JSON.stringify(newFavorites));
      console.log('Updated favorites:', newFavorites);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = (countryName: string) => {
    if (!currentUser) return;

    try {
      console.log('Removing favorite for user:', currentUser.username, countryName);
      const newFavorites = favorites.filter(country => country.name.common !== countryName);
      setFavorites(newFavorites);
      const storageKey = `favorites_${currentUser.username}`;
      localStorage.setItem(storageKey, JSON.stringify(newFavorites));
      console.log('Updated favorites:', newFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorite = (countryName: string) => {
    if (!currentUser) return false;
    const result = favorites.some(country => country.name.common === countryName);
    console.log('Checking if favorite for user:', currentUser.username, countryName, result);
    return result;
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 