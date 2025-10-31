import React, { useState } from 'react';
import { User, Car, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { WorkshopCase } from '../data/mockData';

interface CaseInfoSidebarProps {
  caseData: WorkshopCase;
}

const CaseInfoSidebar: React.FC<CaseInfoSidebarProps> = ({ caseData }) => {
  const [isCustomerExpanded, setIsCustomerExpanded] = useState(true);
  const [isVehicleExpanded, setIsVehicleExpanded] = useState(true);
  const [isOwnerExpanded, setIsOwnerExpanded] = useState(false);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  interface InfoCardProps {
    title: string;
    icon: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }

  const InfoCard: React.FC<InfoCardProps> = ({ title, icon, isExpanded, onToggle, children }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4 space-y-2.5 text-sm">
            {children}
          </div>
        </div>
      )}
    </div>
  );

  const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-gray-900 mt-0.5">{value}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <InfoCard
        title="Customer"
        icon={<User className="h-4 w-4 text-blue-600" />}
        isExpanded={isCustomerExpanded}
        onToggle={() => setIsCustomerExpanded(!isCustomerExpanded)}
      >
        <InfoRow label="Name" value={caseData.customer?.name || 'N/A'} />
        <InfoRow label="Email" value={caseData.customer?.email || 'N/A'} />
        <InfoRow label="Phone" value={caseData.customer?.phone || 'N/A'} />
      </InfoCard>

      <InfoCard
        title="Vehicle"
        icon={<Car className="h-4 w-4 text-blue-600" />}
        isExpanded={isVehicleExpanded}
        onToggle={() => setIsVehicleExpanded(!isVehicleExpanded)}
      >
        <InfoRow label="License Plate" value={caseData.vehicle?.licensePlate || 'N/A'} />
        <InfoRow label="Make & Model" value={`${caseData.vehicle?.make || 'N/A'} ${caseData.vehicle?.model || 'N/A'}`} />
        <InfoRow label="Year" value={caseData.vehicle?.year?.toString() || 'N/A'} />
        <InfoRow label="Color" value={caseData.vehicle?.color || 'N/A'} />
        <InfoRow label="VIN" value={caseData.vehicle?.vin || 'N/A'} />
      </InfoCard>

      <InfoCard
        title="Owner"
        icon={<Building2 className="h-4 w-4 text-blue-600" />}
        isExpanded={isOwnerExpanded}
        onToggle={() => setIsOwnerExpanded(!isOwnerExpanded)}
      >
        <InfoRow label="Name" value={caseData.owner?.name || 'N/A'} />
        <InfoRow label="Type" value={caseData.owner?.type || 'N/A'} />
        <InfoRow label="Address" value={caseData.owner?.address || 'N/A'} />
        <InfoRow label="City" value={`${caseData.owner?.postalCode || ''} ${caseData.owner?.city || 'N/A'}`} />
        <InfoRow label="Ownership Date" value={formatDate(caseData.owner?.ownershipDate)} />
      </InfoCard>
    </div>
  );
};

export default CaseInfoSidebar;
