import React from 'react';
import { FileText, User, Car, Building2 } from 'lucide-react';
import { WorkshopCase } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';

interface CaseSummarySectionProps {
  caseData: WorkshopCase;
}

const CaseSummarySection: React.FC<CaseSummarySectionProps> = ({ caseData }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SectionWrapper 
      title="Policyholder, Vehicle and Owner" 
      isCollapsible={false}
      showStatusBadge={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 ">
      

        {/* Customer Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Policyholder</h4>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div><strong>Name:</strong> {caseData.customer?.name || 'N/A'}</div>
            <div><strong>Email:</strong> {caseData.customer?.email || 'N/A'}</div>
            <div><strong>Phone:</strong> {caseData.customer?.phone || 'N/A'}</div> 
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Vehicle</h4>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div><strong>License Plate:</strong> {caseData.vehicle?.licensePlate || 'N/A'}</div>
            <div><strong>Make & Model:</strong> {caseData.vehicle?.make || 'N/A'} {caseData.vehicle?.model || 'N/A'}</div>
            <div><strong>Year:</strong> {caseData.vehicle?.year || 'N/A'}</div>
            <div><strong>Color:</strong> {caseData.vehicle?.color || 'N/A'}</div>
            <div><strong>VIN:</strong> {caseData.vehicle?.vin || 'N/A'}</div>
          </div>
        </div>

        {/* Owner Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Owner</h4>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div><strong>Name:</strong> {caseData.owner?.name || 'N/A'}</div>
            <div><strong>Type:</strong> {caseData.owner?.type || 'N/A'}</div>
            <div><strong>Address:</strong> {caseData.owner?.address || 'N/A'}</div>
            <div><strong>City:</strong> {caseData.owner?.postalCode || 'N/A'} {caseData.owner?.city || 'N/A'}</div>
            <div><strong>Ownership Date:</strong> {formatDate(caseData.owner?.ownershipDate)}</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CaseSummarySection;