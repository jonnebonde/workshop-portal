import { useState, useEffect, useMemo } from 'react';
import { WorkshopCase } from '../data/mockData';

type SortField = 'licensePlate' | 'insuranceCompany' | 'workshopName' | 'serviceType' | 'status' | 'updatedAt' | 'completionDate' | 'damageDate' | 'carBrand';
type SortOrder = 'asc' | 'desc';

// Memoized comparison functions for better performance
const compareStrings = (a: string, b: string) => a.localeCompare(b);
const compareDates = (a: string | undefined, b: string | undefined) => 
  new Date(a || 0).getTime() - new Date(b || 0).getTime();

export const useCaseList = (cases: WorkshopCase[]) => {
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = useMemo(() => {
    if (!searchTerm) return cases;
    
    const upperSearchTerm = searchTerm.toUpperCase();
    return cases.filter(c => 
      c.vehicle?.licensePlate?.toUpperCase().includes(upperSearchTerm) ||
      c.insuranceCompany?.toUpperCase().includes(upperSearchTerm) ||
      c.workshopName?.toUpperCase().includes(upperSearchTerm) ||
      c.service?.type?.toUpperCase().includes(upperSearchTerm) ||
      c.assessment?.damageDate?.includes(upperSearchTerm) ||
      c.vehicle?.make?.toUpperCase().includes(upperSearchTerm)
    );
  }, [cases, searchTerm]);

  const sortedCases = useMemo(() => {
    return [...filteredCases].sort((a, b) => {
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
        case 'status':
          comparison = compareStrings(a.status || '', b.status || '');
          break;
        case 'completionDate':
          comparison = compareDates(a.service.completionDate, b.service.completionDate);
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
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredCases, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    sortedCases,
    sortField,
    sortOrder,
    searchTerm,
    setSearchTerm,
    handleSort
  };
};