import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock } from 'lucide-react';
import { useState } from 'react';
import { getCases } from '../data/mockData';

interface SearchResult {
  vrn: string;
  id: string;
}

const useVrnSearch = (initialValue: string = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentVrnSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Format VRN input
  const formatVrn = (input: string) => {
    const formatted = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (formatted.length <= 2) {
      return formatted;
    } else if (formatted.length <= 7) {
      const letters = formatted.slice(0, 2);
      const numbers = formatted.slice(2);
      return letters + numbers;
    }
    return formatted.slice(0, 7);
  };

  // Update search results
  useEffect(() => {
    const formattedTerm = formatVrn(searchTerm);
    
    if (formattedTerm.length >= 2) {
      const cases = getCases();
      const matches = cases
        .filter(c => c.vehicle.licensePlate.includes(formattedTerm))
        .map(c => ({
          vrn: c.vehicle.licensePlate,
          id: c.id
        }))
        .sort((a, b) => {
          // Exact matches first
          if (a.vrn === formattedTerm) return -1;
          if (b.vrn === formattedTerm) return 1;
          // Then sort by position of match
          return a.vrn.indexOf(formattedTerm) - b.vrn.indexOf(formattedTerm);
        })
        .slice(0, 5); // Limit to 5 results

      setResults(matches);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  // Save recent searches
  const addToRecentSearches = (vrn: string) => {
    const formatted = formatVrn(vrn);
    if (formatted) {
      const updated = [
        formatted,
        ...recentSearches.filter(s => s !== formatted)
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentVrnSearches', JSON.stringify(updated));
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    results,
    showResults,
    setShowResults,
    recentSearches,
    addToRecentSearches,
    formatVrn
  };
};

interface VrnSearchProps {
  className?: string;
  onSearch?: (vrn: string) => void;
  placeholder?: string;
  variant?: 'default' | 'sidebar';
}

const VrnSearch: React.FC<VrnSearchProps> = ({
  className = '',
  onSearch,
  placeholder,
  variant = 'default'
}) => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const {
    searchTerm,
    setSearchTerm,
    results,
    showResults,
    setShowResults,
    recentSearches,
    addToRecentSearches,
    formatVrn
  } = useVrnSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm);
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        navigate(`/?vrn=${encodeURIComponent(searchTerm.trim())}`);
      }
      setShowResults(false);
    }
  };

  const handleResultClick = (id: string, vrn: string) => {
    addToRecentSearches(vrn);
    navigate(`/cases/${id}`);
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputClasses = variant === 'sidebar'
    ? 'w-full pl-10 pr-4 py-3 text-sm bg-white text-gray-900 placeholder-gray-500 rounded-lg shadow-sm border border-transparent focus:border-transparent focus:ring-2 focus:ring-blue-500'
    : 'w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500';

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}> 
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder || 'Search...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(formatVrn(e.target.value))}
            className={`${inputClasses} w-full`}
          />
          <button
            type="submit"
            className="absolute inset-y-0 left-0 pl-3 flex items-center hover:text-gray-700 transition-colors"
          >
            <Search className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Dropdown Results */}
        {showResults && (results.length > 0 || recentSearches.length > 0) && (
          <div className="absolute w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
            {results.length > 0 && (
              <div className="py-1">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50">Søkeresultater</div>
                {results.map((result) => (
                  <button
                    key={result.id}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => handleResultClick(result.id, result.vrn)}
                  >
                    <span className="font-medium">{result.vrn}</span>
                  </button>
                ))}
              </div>
            )}

            {recentSearches.length > 0 && (
              <div className="border-t border-gray-100">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50">Nylige søk</div>
                {recentSearches.map((vrn, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setSearchTerm(vrn);
                      handleSubmit(new Event('submit') as any);
                    }}
                  >
                    <Clock className="h-3 w-3 text-gray-400 mr-3 flex-shrink-0" />
                    {vrn}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default VrnSearch;