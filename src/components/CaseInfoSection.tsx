import React from 'react';
import { User, Car, Building2 } from 'lucide-react';
import { WorkshopCase } from '../data/mockData';

interface CaseInfoSectionProps {
  caseData: WorkshopCase;
}

const CaseInfoSection: React.FC<CaseInfoSectionProps> = ({ caseData }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider leading-tight">{label}</span>
      <span className="text-sm text-gray-900 leading-snug">{value}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Customer Section */}
          <div className="border-r border-gray-200 pr-4 last:border-r-0 last:pr-0">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-200">

              <h3 className="text-sm font-semibold text-gray-900">Customer</h3>
            </div>
            <div className="space-y-2">
              <InfoRow label="Name" value={caseData.customer?.name || 'N/A'} />
              <InfoRow label="Email" value={caseData.customer?.email || 'N/A'} />
              <InfoRow label="Phone" value={caseData.customer?.phone || 'N/A'} />
            </div>
          </div>

          {/* Vehicle Section */}
          <div className="border-r border-gray-200 pr-4 last:border-r-0 last:pr-0">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-200">

              <h3 className="text-sm font-semibold text-gray-900">Vehicle</h3>
            </div>
            <div className="space-y-2">
              <InfoRow label="License Plate" value={caseData.vehicle?.licensePlate || 'N/A'} />
              <InfoRow label="Make & Model" value={`${caseData.vehicle?.make || 'N/A'} ${caseData.vehicle?.model || 'N/A'}`} />
              <div className="grid grid-cols-2 gap-2">
                <InfoRow label="Year" value={caseData.vehicle?.year?.toString() || 'N/A'} />
                <InfoRow label="Color" value={caseData.vehicle?.color || 'N/A'} />
              </div>
              <InfoRow label="VIN" value={caseData.vehicle?.vin || 'N/A'} />
            </div>
          </div>

          {/* Owner Section */}
          <div>
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-200">

              <h3 className="text-sm font-semibold text-gray-900">Owner</h3>
            </div>
            <div className="space-y-2">
              <InfoRow label="Name" value={caseData.owner?.name || 'N/A'} />
              <InfoRow label="Type" value={caseData.owner?.type || 'N/A'} />
              <InfoRow label="Address" value={caseData.owner?.address || 'N/A'} />
              <InfoRow label="City" value={`${caseData.owner?.postalCode || ''} ${caseData.owner?.city || 'N/A'}`} />
              <InfoRow label="Ownership Date" value={formatDate(caseData.owner?.ownershipDate)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseInfoSection;
