import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    if (username.length < 3) {
      return setError('Username must be at least 3 characters long');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, username);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center">
        <svg 
            className="w-16 h-16 mb-2 animate-float text-blue-600 dark:text-blue-400" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Earth base */}
            <circle cx="50" cy="50" r="45" fill="#1a73e8" />
            
            {/* Simplified continents */}
            {/* North America */}
            <path d="M20 30 Q25 25 30 30 Q35 35 40 30 Q45 25 50 30 Q55 35 60 30 Q65 25 70 30 
                    L75 40 L70 50 L65 55 L60 50 L55 45 L50 50 L45 45 L40 40 L35 35 L30 40 L25 35 Z" 
                  fill="#34a853" stroke="#2d7d46" strokeWidth="0.5" />
            
            {/* South America */}
            <path d="M40 55 L45 60 L50 65 L55 70 L60 75 L65 70 L70 65 L65 60 L60 55 L55 50 L50 55 Z" 
                  fill="#34a853" stroke="#2d7d46" strokeWidth="0.5" />
            
            {/* Africa */}
            <path d="M60 35 L65 40 L70 45 L75 50 L80 55 L75 60 L70 65 L65 70 L60 65 L55 60 L50 55 
                    L45 50 L50 45 L55 40 Z" 
                  fill="#34a853" stroke="#2d7d46" strokeWidth="0.5" />
            
            {/* Europe */}
            <path d="M55 25 L60 30 L65 25 L70 30 L75 25 L70 20 L65 15 L60 20 Z" 
                  fill="#34a853" stroke="#2d7d46" strokeWidth="0.5" />
            
            {/* Asia */}
            <path d="M70 20 L75 25 L80 30 L85 35 L90 40 L85 45 L80 50 L75 55 L70 50 L65 45 L70 40 
                    L65 35 L60 30 L65 25 Z" 
                  fill="#34a853" stroke="#2d7d46" strokeWidth="0.5" />
            
            {/* Australia */}
            <path d="M80 60 L85 65 L90 70 L85 75 L80 70 L75 65 Z" 
                  fill="#34a853" stroke="#2d7d46" strokeWidth="0.5" />
            
            {/* Cloud effects */}
            <ellipse cx="30" cy="25" rx="5" ry="3" fill="rgba(255,255,255,0.7)" />
            <ellipse cx="70" cy="20" rx="7" ry="4" fill="rgba(255,255,255,0.7)" />
            <ellipse cx="60" cy="70" rx="6" ry="3" fill="rgba(255,255,255,0.7)" />
            
            {/* Grid lines */}
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
            <path d="M5 50 H95" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <path d="M50 5 V95" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            
            {/* Shining effect */}
            <circle cx="70" cy="30" r="10" fill="rgba(255,255,255,0.15)" />
          </svg>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative animate-shake" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="transition-all duration-200 appearance-none block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-gray-50 dark:bg-gray-900"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="transition-all duration-200 appearance-none block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-gray-50 dark:bg-gray-900"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="transition-all duration-200 appearance-none block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-gray-50 dark:bg-gray-900"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="transition-all duration-200 appearance-none block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-gray-50 dark:bg-gray-900"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 font-semibold underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
