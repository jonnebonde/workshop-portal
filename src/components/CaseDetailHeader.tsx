import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { WorkshopCase } from '../data/mockData';
import { formatDateTime } from '../utils/formatters';
import ProgressTracker from './ProgressTracker';

interface CaseDetailHeaderProps {
  caseData: WorkshopCase;
  onBack: () => void;
  onSubmit: () => void;
}

const CaseDetailHeader: React.FC<CaseDetailHeaderProps> = ({ caseData, onBack }) => {
  const handleBackClick = () => {
    console.log('[CaseDetailHeader] Back button clicked, navigating to home');
    onBack();
  };
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'finished':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'new':
        return 'New Case';
      case 'in_progress':
        return 'In Progress';
      case 'finished':
        return 'Completed';
      default:
        return stage;
    } 
  };

  const handleSubmitClick = () => {
    console.log('[CaseDetailHeader] Submit Case button clicked');
    onSubmit();
  };

  return (
    <div id="case-detail-sticky-header" className="sticky top-0 z-30 bg-gray-50 pt-8">
      <div className="px-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Case number: {caseData.caseNumber}
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <button onClick={handleBackClick}
            className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-white transition-colors hover:bg-blue-700">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            <span className="ml-1">Back</span>
          </button>
          <span className="text-sm text-gray-700">{formatDateTime(caseData.createdAt)}</span>
          <span className="text-sm font-semibold text-gray-900">VRN: {caseData.vehicle.licensePlate}</span>
        </div>
        <button onClick={handleSubmitClick}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          title="Submit Case">
          Submit Case
        </button>
      </div>
      <div className="bg-white border-t border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <ProgressTracker caseData={caseData} />
        </div>
      </div>
    </div>
  );
};

export default CaseDetailHeader;
