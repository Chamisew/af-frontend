import React from 'react';
import { Country } from '../services/countryService';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
  isFavorite?: boolean;
  onFavoriteClick?: (e: React.MouseEvent<Element>) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({ 
  country, 
  onClick, 
  isFavorite, 
  onFavoriteClick 
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Flag Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        {onFavoriteClick && (
          <button
            onClick={onFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-neutral-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-colors z-10"
          >
            <span className={`text-2xl ${isFavorite ? 'text-error-500' : 'text-neutral-400'}`}>
              {isFavorite ? '❤️' : '🤍'}
            </span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {country.name.common}
        </h2>
        
        <div className="space-y-2">
          <div className="flex items-center text-neutral-600 dark:text-neutral-300">
            <span className="w-6 h-6 mr-2">👥</span>
            <span className="font-medium">Population:</span>
            <span className="ml-2">{country.population.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center text-neutral-600 dark:text-neutral-300">
            <span className="w-6 h-6 mr-2">🌍</span>
            <span className="font-medium">Region:</span>
            <span className="ml-2">{country.region}</span>
          </div>
          
          <div className="flex items-center text-neutral-600 dark:text-neutral-300">
            <span className="w-6 h-6 mr-2">🏛️</span>
            <span className="font-medium">Capital:</span>
            <span className="ml-2">{country.capital?.[0] || 'N/A'}</span>
          </div>
          
          {country.languages && (
            <div className="flex items-center text-neutral-600 dark:text-neutral-300">
              <span className="w-6 h-6 mr-2">💬</span>
              <span className="font-medium">Languages:</span>
              <span className="ml-2">{Object.values(country.languages).join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500 dark:group-hover:border-primary-400 rounded-xl transition-colors duration-300" />
    </div>
  );
}; 