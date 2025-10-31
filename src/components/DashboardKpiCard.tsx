import React from 'react';

interface DescriptionItem {
  label: string;
  value: string | number;
  valueColor?: string;
}

interface DashboardKpiCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  valueColor?: string;
  descriptionList: DescriptionItem[];
}

const DashboardKpiCard: React.FC<DashboardKpiCardProps> = ({
  title,
  icon,
  value,
  valueColor = 'text-gray-900',
  descriptionList
}) => {

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
    >
      {/* Header: Icon + Title */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0 text-blue-600">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      {/* Main KPI Value */}
      <div className="mb-6">
        <div className={`text-3xl font-bold ${valueColor}`}>
          {value}
        </div>
      </div>

      {/* Description List */}
      <div className="space-y-2 mb-4">
        {descriptionList.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{item.label}:</span>
            <span className={`font-medium ${item.valueColor || 'text-gray-900'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardKpiCard;