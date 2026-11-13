import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search Nexora apps..." 
}) => {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brand-secondary">
        <Search className="w-4 h-4 transition-colors duration-300 group-focus-within:text-brand-cyan" />
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-11 pr-10 bg-white/80 dark:bg-brand-navy/40 border border-black/10 dark:border-white/10 rounded-2xl text-sm text-brand-navy dark:text-white placeholder-brand-secondary focus:border-brand-blue/50 dark:focus:border-brand-cyan/40 focus:ring-1 focus:ring-brand-blue/20 dark:focus:ring-brand-cyan/20 focus:bg-white dark:focus:bg-brand-navy/60 transition-all duration-300 shadow-sm"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-3 flex items-center text-brand-secondary hover:text-brand-navy dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4.5 h-4.5 p-0.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10" />
        </button>
      )}
    </div>
  );
};
