import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown, Car, Building2, Calendar, Eye } from 'lucide-react';
import { WorkshopCase, shortenServiceType } from '../data/mockData';
import { formatDate } from '../utils/formatters';
import CaseCard from './CaseCard';
import CaseStatusIcons from './CaseStatusIcons';
import { highlightText, highlightDate } from '../utils/highlightText';

type SortField = 'licensePlate' | 'insuranceCompany' | 'workshopName' | 'serviceType' | 'updatedAt' | 'damageDate' | 'carBrand';
type SortOrder = 'asc' | 'desc';

// Memoized comparison functions
const compareStrings = (a: string, b: string) => a.localeCompare(b);
const compareDates = (a: string, b: string) => new Date(a || 0).getTime() - new Date(b || 0).getTime();

interface CasesTableProps {
  cases: WorkshopCase[];
  searchTerm?: string;
  className?: string;
  showStatusLegend?: boolean;
}

const CasesTable: React.FC<CasesTableProps> = ({ 
  cases, 
  searchTerm = '',
  className = '',
  showStatusLegend = false 
}) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Sort cases
  const sortedCases = [...cases].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'licensePlate':
        comparison = compareStrings(a.vehicle?.licensePlate || '', b.vehicle?.licensePlate || '');
        break;
      case 'insuranceCompany':
        comparison = compareStrings(a.insuranceCompany || '', b.insuranceCompany || '');
        break;
      case 'workshopName':
        comparison = compareStrings(a.workshopName || '', b.workshopName || '');
        break;
      case 'serviceType':
        comparison = compareStrings(a.service?.type || '', b.service?.type || '');
        break;
      case 'updatedAt':
        comparison = compareDates(a.updatedAt, b.updatedAt);
        break;
      case 'damageDate':
        comparison = compareDates(a.assessment?.damageDate, b.assessment?.damageDate);
        break;
      case 'carBrand':
        comparison = compareStrings(a.vehicle?.make || '', b.vehicle?.make || '');
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Render sortable header
  const SortableHeader: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <span className="flex flex-col">
          {sortField === field ? (
            sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
          ) : (
            <div className="h-3 w-3" />
          )}
        </span>
      </div>
    </th>
  );

  return (
    <div className={`${className}`}>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            {/* Sticky Header */}
            <thead className="bg-gray-50 sticky top-[160px] z-10">   
              <tr>
                <SortableHeader field="licensePlate">
                  License Plate
                </SortableHeader>
                <SortableHeader field="insuranceCompany">
                  Insurance Company
                </SortableHeader>
                <SortableHeader field="workshopName">
                  Workshop
                </SortableHeader>
                <SortableHeader field="carBrand">
                  Car Brand
                </SortableHeader>
                <SortableHeader field="serviceType">
                  Service Type
                </SortableHeader>
                <SortableHeader field="damageDate">
                  Damage Date
                </SortableHeader>
                <SortableHeader field="updatedAt">
                  Last Updated
                </SortableHeader>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24"> 
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCases.map((caseItem, index) => {
                return (
                  <tr
                    key={caseItem.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100 cursor-pointer transition-colors`}
                    onClick={() => navigate(`/cases/${caseItem.id}`)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {highlightText(caseItem.vehicle?.licensePlate || '', searchTerm)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {highlightText(caseItem.insuranceCompany || '', searchTerm)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {highlightText(caseItem.workshopName || '', searchTerm)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {highlightText(caseItem.vehicle?.make || '', searchTerm)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {highlightText(shortenServiceType(caseItem.service?.type), searchTerm)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {highlightDate(caseItem.assessment?.damageDate, searchTerm)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {highlightDate(caseItem.updatedAt, searchTerm)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div onClick={(e) => e.stopPropagation()} className="flex justify-center">
                        <CaseStatusIcons caseItem={caseItem} size="sm" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="p-4 space-y-4">
          {sortedCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} searchTerm={searchTerm} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {sortedCases.length === 0 && (
        <div className="py-12 text-center">
          <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No cases found
          </h3>
          <p className="text-gray-500">
            No cases match your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default CasesTable;