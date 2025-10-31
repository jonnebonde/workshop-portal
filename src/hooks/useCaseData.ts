import { useState, useEffect, useCallback } from 'react';
import { WorkshopCase, getCaseById, updateCase } from '../data/mockData';

export const useCaseData = (caseId: string | undefined) => {
  const [caseData, setCaseData] = useState<WorkshopCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!caseId) {
      setLoading(false);
      return;
    }

    const data = getCaseById(caseId);
    setCaseData(data);
    setLoading(false);
  }, [caseId]);

  const handleUpdateCase = useCallback((updates: Partial<WorkshopCase>) => {
    if (!caseData?.id) return;
    
    const updatedCase = updateCase(caseData.id, updates);
    if (updatedCase) {
      setCaseData(updatedCase);
    }
  }, [caseData?.id]);

  return {
    caseData,
    loading,
    handleUpdateCase,
    setCaseData
  };
};