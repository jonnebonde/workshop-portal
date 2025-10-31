import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  changeText?: string;
  changeTimeframe?: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  change,
  changeText,
  changeTimeframe = 'vs last month',
  isCurrency = false,
  isPercentage = false,
  onClick,
}) => {
  // Format the value based on the type
  const formattedValue = (() => {
    if (isPercentage) {
      return typeof value === 'number' ? `${value}%` : value;
    }
    if (isCurrency) {
      return typeof value === 'number' 
        ? new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(value)
        : value;
    }
    return value;
  })();
  
  // Determine change color
  const changeColor = (() => {
    if (change === undefined) return 'text-gray-500';
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  })();
  
  // Determine change icon
  const changeIcon = (() => {
    if (change === undefined) return <Minus size={14} />;
    if (change > 0) return <ArrowUpRight size={14} />;
    if (change < 0) return <ArrowDownRight size={14} />;
    return <Minus size={14} />;
  })();
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-4 sm:p-5 border border-gray-100 transition-all duration-300 transform ${
        onClick ? 'cursor-pointer hover:shadow-lg hover:scale-105 hover:border-blue-500 hover:bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <p className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">{title}</p>
        {icon && <div className="text-[#1A365D] flex-shrink-0 ml-2">{icon}</div>}
      </div>
      <div className="flex items-baseline">
        <p className="text-lg sm:text-2xl font-semibold text-gray-900 leading-tight">{formattedValue}</p>
      </div>
      {(change !== undefined || changeText) && (
        <div className="flex items-center mt-3">
          <span className={`flex items-center text-xs sm:text-sm ${changeColor}`}>
            {changeIcon}
            <span className="ml-1">
              {changeText || `${Math.abs(change || 0)}%`}
            </span>
          </span>
          <span className="text-xs text-gray-500 ml-2 hidden sm:inline">{changeTimeframe}</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;