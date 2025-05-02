import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { countryService, Country } from '../services/countryService';
import { useFavorites } from '../contexts/FavoritesContext';

interface DetailRowProps {
  label: string;
  value: string | number;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">{label}</span>
      <span className="text-lg font-medium text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}

export const CountryDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchCountry = async () => {
      if (!code) return;
      try {
        setLoading(true);
        const data = await countryService.getCountryByCode(code);
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  const handleFavoriteClick = () => {
    if (!country) return;
    if (isFavorite(country.name.common)) {
      removeFavorite(country.name.common);
    } else {
      addFavorite(country);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600 dark:text-gray-300">Country not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mb-10 flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg rounded-xl hover:bg-slate-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold transition-all duration-200"
    >
      <span className="text-xl">←</span> Back
    </button>
  
    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Flag & Coat of Arms Card */}
      <div className="flex flex-col items-center">
        <div className="w-full rounded-3xl shadow-2xl bg-white dark:bg-gray-900 p-8 flex flex-col items-center transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-100 dark:hover:shadow-blue-900">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-full max-w-xs h-auto rounded-2xl shadow-lg border-4 border-slate-100 dark:border-gray-800 transition-all duration-300 hover:scale-105"
          />
          {country.coatOfArms?.png && (
            <div className="mt-8 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300 tracking-wide">Coat of Arms</h3>
              <div className="bg-gradient-to-tr from-slate-50 to-slate-200 dark:from-gray-800 dark:to-gray-900 p-4 rounded-2xl shadow-md">
                <img
                  src={country.coatOfArms.png}
                  alt={`${country.name.common} Coat of Arms`}
                  className="w-40 h-40 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Details Card */}
      <div className="space-y-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-2 tracking-tight">
              {country.name.common}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 italic">
              {Object.values(country.name.nativeName || {})[0]?.common || ''}
            </p>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="p-3 bg-gradient-to-br from-white to-slate-100 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="Toggle Favorite"
          >
            {isFavorite(country.name.common) ? (
              <span className="text-red-500 text-2xl">❤️</span>
            ) : (
              <span className="text-gray-400 text-2xl">🤍</span>
            )}
          </button>
        </div>
  
        {/* Info Grid */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <DetailRow label="Population" value={country.population.toLocaleString()} />
            <DetailRow label="Area" value={`${country.area.toLocaleString()} km²`} />
            <DetailRow label="Region" value={country.region} />
            <DetailRow label="Sub Region" value={country.subregion || 'N/A'} />
            <DetailRow label="Capital" value={country.capital?.[0] || 'N/A'} />
          </div>
          <div className="space-y-4">
            <DetailRow label="Top Level Domain" value={country.tld?.[0] || 'N/A'} />
            <DetailRow
              label="Currencies"
              value={
                Object.values(country.currencies || {})
                  .map((currency) => `${currency.name} (${currency.symbol})`)
                  .join(', ') || 'N/A'
              }
            />
            <DetailRow
              label="Languages"
              value={Object.values(country.languages || {}).join(', ') || 'N/A'}
            />
            <DetailRow label="Time Zones" value={country.timezones.join(', ')} />
          </div>
        </div>
  
        {/* Borders */}
        {country.borders && country.borders.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-300">Border Countries:</h2>
            <div className="flex flex-wrap gap-2">
              {country.borders.map((border) => (
                <button
                  key={border}
                  onClick={() => navigate(`/country/${border}`)}
                  className="px-4 py-2 bg-gradient-to-r from-slate-100 to-white dark:from-gray-800 dark:to-gray-900 shadow rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                >
                  {border}
                </button>
              ))}
            </div>
          </div>
        )}
  
        {/* Maps */}
        {country.maps && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-300">Maps:</h2>
            <div className="flex gap-4">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow"
              >
                Google Maps
              </a>
              <a
                href={country.maps.openStreetMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow"
              >
                OpenStreetMap
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  
 
  
  
  );
}; 