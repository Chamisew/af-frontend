import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { countryService, Country } from '../services/countryService';
import { useFavorites } from '../contexts/FavoritesContext';
import { LanguageFilter } from '../components/LanguageFilter';

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const HomePage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Helper to update URL query parameters
  const updateQueryParams = (params: { search?: string; region?: string; language?: string }) => {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.region && params.region !== 'All') query.set('region', params.region);
    if (params.language) query.set('language', params.language);
    navigate(`${location.pathname}?${query.toString()}`, { replace: true });
  };

  // Initialize state from URL query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const search = query.get('search') || '';
    const region = query.get('region') || 'All';
    const language = query.get('language') || '';

    setSearchTerm(search);
    setSelectedRegion(region);
    setSelectedLanguage(language);

    // Fetch countries based on initial query params
    fetchCountries(search, region, language);
    // eslint-disable-next-line
  }, []);

  const fetchCountries = async (search: string = searchTerm, region: string = selectedRegion, language: string = selectedLanguage) => {
    try {
      setLoading(true);
      let data: Country[];
      if (search) {
        data = await countryService.getCountryByName(search);
      } else if (language) {
        data = await countryService.getCountriesByLanguage(language);
      } else if (region === 'All') {
        data = await countryService.getAllCountries();
      } else {
        data = await countryService.getCountriesByRegion(region);
      }
      setCountries(data);

      // Extract unique languages
      const languages = new Set<string>();
      data.forEach(country => {
        if (country.languages) {
          Object.values(country.languages).forEach(lang => languages.add(lang));
        }
      });
      setAvailableLanguages(Array.from(languages).sort());
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateQueryParams({ search: value, region: selectedRegion, language: selectedLanguage });
    if (value) {
      try {
        const data = await countryService.getCountryByName(value);
        setCountries(data);
      } catch (error) {
        setCountries([]);
        console.error('Error searching countries:', error);
      }
    } else {
      fetchCountries(value, selectedRegion, selectedLanguage);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRegion(value);
    setSelectedLanguage('');
    updateQueryParams({ search: searchTerm, region: value, language: '' });
    fetchCountries(searchTerm, value, '');
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setSelectedRegion('All');
    updateQueryParams({ search: searchTerm, region: 'All', language });
    fetchCountries(searchTerm, 'All', language);
  };

  const handleCountryClick = (country: Country) => {
    navigate(`/country/${country.cca3}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>, country: Country) => {
    e.stopPropagation();
    if (isFavorite(country.name.common)) {
      removeFavorite(country.name.common);
    } else {
      addFavorite(country);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 dark:from-gray-900 dark:via-blue-900 dark:to-black py-10">
      {/* Search and Filters */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="bg-white/70 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-8 backdrop-blur-md border border-white/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a country..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700
                             focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
                             bg-white/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100
                             placeholder-neutral-400 dark:placeholder-neutral-500 shadow-md"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 dark:text-blue-300 text-xl pointer-events-none">
                  <span role="img" aria-label="search">🔍</span>
                </div>
              </div>
            </div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700
                         focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
                         bg-white/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100
                         appearance-none cursor-pointer shadow-md"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <LanguageFilter
                value={selectedLanguage}
                onChange={handleLanguageChange}
                languages={availableLanguages}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-72">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"
                 role="status"
                 aria-label="Loading"
            ></div>
          </div>
        ) : countries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              No countries found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {countries.map((country) => (
              <div
                key={country.cca3}
                className="group cursor-pointer transition transform hover:-translate-y-1 hover:scale-105"
                onClick={() => handleCountryClick(country)}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col items-center relative overflow-hidden">
                  {/* Flag */}
                  <img
                    src={country.flags?.svg || country.flags?.png}
                    alt={`${country.name.common} flag`}
                    className="w-24 h-16 object-cover rounded-lg shadow-md mb-4 border-2 border-blue-200 dark:border-blue-900"
                  />
                  {/* Name */}
                  <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-1 text-center">{country.name.common}</h3>
                  {/* Region & Population */}
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">
                    {country.region} · Pop: {country.population.toLocaleString()}
                  </div>
                  {/* Languages */}
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
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
                  {/* Favorite Button */}
                  <button
                    onClick={e => handleFavoriteClick(e, country)}
                    className="absolute top-4 right-4 text-2xl transition-transform transform hover:scale-125"
                    aria-label={isFavorite(country.name.common) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <span
                      className={`transition-colors ${
                        isFavorite(country.name.common)
                          ? 'text-red-500 animate-pulse'
                          : 'text-gray-400 group-hover:text-red-400'
                      }`}
                    >
                      {isFavorite(country.name.common) ? '❤️' : '🤍'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};