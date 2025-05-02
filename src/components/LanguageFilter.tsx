import React from 'react';

interface LanguageFilterProps {
  value: string;
  onChange: (language: string) => void;
  languages: string[];
}

export const LanguageFilter: React.FC<LanguageFilterProps> = ({ value, onChange, languages }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Filter by Language</option>
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}; 