import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Building2, Car, Eye } from 'lucide-react';
import { WorkshopCase, shortenServiceType } from '../data/mockData';
import { highlightText, highlightDate } from '../utils/highlightText';
import CaseStatusIcons from './CaseStatusIcons';

interface CaseCardProps {
  caseItem: WorkshopCase;
  searchTerm?: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem, searchTerm = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cases/${caseItem.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      {/* Header with License Plate and Progress */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {highlightText(caseItem.vehicle?.licensePlate || '', searchTerm)}
        </h3>
        <CaseStatusIcons caseItem={caseItem} size="sm" />
      </div>

      {/* Main Info Grid */}
      <div className="space-y-3">
        {/* Insurance Company */}
        <div className="flex items-center text-sm">
          <Building2 className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{highlightText(caseItem.insuranceCompany || '', searchTerm)}</span>
        </div>

        {/* Workshop */}
        <div className="flex items-center text-sm">
          <Building2 className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{highlightText(caseItem.workshopName || '', searchTerm)}</span>
        </div>

        {/* Car Brand */}
        <div className="flex items-center text-sm">
          <Car className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600">{highlightText(caseItem.vehicle?.make || '', searchTerm)}</span>
        </div>

        {/* Service Type */}
        <div className="flex items-center text-sm">
          <Eye className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600">{highlightText(shortenServiceType(caseItem.service?.type), searchTerm)}</span>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div>
            <span className="block font-medium">Damage Date</span>
            <span>{highlightDate(caseItem.assessment?.damageDate, searchTerm)}</span>
          </div>
          <div>
            <span className="block font-medium">Last Updated</span>
            <span>{highlightDate(caseItem.updatedAt, searchTerm)}</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          caseItem.status === 'New' ? 'bg-green-100 text-green-800' :
          caseItem.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
          caseItem.status === 'Waiting Parts' ? 'bg-yellow-100 text-yellow-800' :
          caseItem.status === 'Ready' ? 'bg-purple-100 text-purple-800' :
          caseItem.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
          'bg-red-100 text-red-800'
        }`}>
          {caseItem.status}
        </span>
      </div>
    </div>
  );
};

export default CaseCard;