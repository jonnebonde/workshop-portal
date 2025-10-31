import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SortableHeaderProps {
  field: string;
  currentField: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: any) => void;
  children: React.ReactNode;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ 
  field, 
  currentField, 
  sortOrder, 
  onSort, 
  children 
}) => (
  <th 
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
    onClick={() => onSort(field)}
  >
    <div className="flex items-center space-x-1">
      <span>{children}</span>
      <span className="flex flex-col">
        {currentField === field ? (
          sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
        ) : (
          <div className="h-3 w-3" />
        )}
      </span>
    </div>
  </th>
);

export default SortableHeader;