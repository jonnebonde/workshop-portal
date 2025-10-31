import React from 'react';
import { ChevronLeft, Clock, Calendar, CheckCircle } from 'lucide-react';
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
    <div id="case-detail-sticky-header" className="sticky top-0 z-30 shadow-lg">
      <div className="bg-white">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue/20 border border-white/20 rounded-lg text-white transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="ml-1 hidden sm:inline">Back</span>
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold ">
                    Case number: {caseData.caseNumber}
                  </h1>

                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(caseData.createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    VRN: {caseData.vehicle.licensePlate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={handleSubmitClick}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform"
                title="Submit Case"
              >
          
                <span className="font-medium">Submit Case</span>
              </button>
            </div>
          </div>
        </div>
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
