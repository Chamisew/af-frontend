import React from 'react';
import { Region } from '../types/country';

interface RegionFilterProps {
  value: Region | '';
  onChange: (region: Region | '') => void;
}

const regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const RegionFilter: React.FC<RegionFilterProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Region | '')}
      className="px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Filter by Region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
} 