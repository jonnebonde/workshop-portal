import React, { useState, useEffect } from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';

interface TableToolbarProps {
  searchTerm: string;
  onSearchSubmit: (term: string) => void;
  showFilters?: boolean;
  showStatusLegend?: boolean;
  className?: string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  searchTerm,
  onSearchSubmit,
  showFilters = true,
  showStatusLegend = false,
  className = ''
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Update local search term when prop changes (e.g., when cleared externally)
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const formatVrn = (input: string) => {
    const formatted = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (formatted.length <= 2) {
      return formatted;
    } else if (formatted.length <= 7) {
      const letters = formatted.slice(0, 2);
      const numbers = formatted.slice(2);
      return `${letters}${numbers}`;
    }
    return formatted.slice(0, 7);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Format as VRN if it looks like a license plate (starts with letters)
    if (/^[A-Za-z]/.test(value)) {
      setLocalSearchTerm(formatVrn(value));
    } else {
      setLocalSearchTerm(value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(localSearchTerm);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onSearchSubmit('');
  };

  return ( 
    <div className={`p-4 space-y-4 border-b border-gray-300 ${className}`}>
      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-10 py-3 border border-gray-400 rounded-lg shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 text-"
          />
          {localSearchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </form>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSearchSubmit(localSearchTerm)}
            className="inline-flex items-center px-3 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
          
          {localSearchTerm && (
            <button
              onClick={handleClearSearch}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Status Legend */}
    </div>
  );
};

export default TableToolbar;