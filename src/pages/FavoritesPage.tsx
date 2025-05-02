import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleCountryClick = (countryCode: string) => {
    navigate(`/country/${countryCode}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent, countryName: string) => {
    e.stopPropagation();
    removeFavorite(countryName);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 dark:from-gray-900 dark:via-blue-900 dark:to-black">
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-14 border border-white/20 flex flex-col items-center">
          <span className="text-6xl mb-4 animate-pulse">🤍</span>
          <h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-2">No Favorites Yet</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-center">
            You haven't added any countries to your favorites. Start exploring and tap the heart to save your favorite nations!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Browse Countries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 dark:from-gray-900 dark:via-blue-900 dark:to-black py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-8 text-center">My Favorite Countries</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((country) => (
            <div
              key={country.cca3}
              onClick={() => handleCountryClick(country.cca3)}
              className="group bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105 relative"
            >
              {/* Flag Image */}
              <div className="relative">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-full h-48 object-cover"
                />
                {/* Animated Heart Button */}
                <button
                  onClick={(e) => handleFavoriteClick(e, country.name.common)}
                  className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 rounded-full shadow-md p-2 hover:bg-red-100 dark:hover:bg-red-900 transition"
                  aria-label="Remove from favorites"
                >
                  <span className="text-red-500 text-2xl animate-pulse">❤️</span>
                </button>
              </div>
              {/* Country Info */}
              <div className="p-6 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-1">{country.name.common}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {country.languages &&
                    Object.values(country.languages).slice(0, 2).map((lang, idx) => (
                      <span
                        key={lang + idx}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  {country.languages && Object.values(country.languages).length > 2 && (
                    <span className="text-xs text-blue-400">+{Object.values(country.languages).length - 2} more</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Region:</span> {country.region}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
