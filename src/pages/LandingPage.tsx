import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background Image */}
      <section
        className="relative flex-1 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-700/60 to-blue-400/50"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
            Explore Every Country
          </h1>
          <p className="text-2xl text-white/90 mb-8 drop-shadow">
            Search, filter, favorite, and discover the world. Dive into details.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/login"
              className="bg-white/90 text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-800 dark:text-white mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
              <span className="text-5xl mb-4">🌍</span>
              <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">All Countries</h3>
              <p className="text-gray-600 dark:text-gray-200 text-center">
                Instantly access facts and stats for every country.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
              <span className="text-5xl mb-4">🔎</span>
              <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Smart Filters</h3>
              <p className="text-gray-600 dark:text-gray-200 text-center">
                Filter by name, region, or language to find your destination.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
              <span className="text-5xl mb-4">❤️</span>
              <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Favorites & Maps</h3>
              <p className="text-gray-600 dark:text-gray-200 text-center">
                Save favorites and view countries on interactive maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-900 dark:to-blue-700 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-3">Start Your Global Journey</h2>
        <p className="text-xl text-white/90 mb-7">Sign up now and unlock the world of countries at your fingertips.</p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full shadow-xl hover:bg-blue-100 transition"
        >
          Sign Up
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
