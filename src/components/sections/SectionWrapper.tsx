import React from 'react';
import { SectionApprovalStatus } from '../../data/mockData';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  isComplete?: boolean;
  isRequired?: boolean;
  icon?: React.ReactNode;
  showStatusBadge?: boolean;
  isSectionComplete?: boolean;
  insuranceStatus?: 'approved' | 'not_approved' | 'undefined' | 'not_fetched';
  approvalStatus?: SectionApprovalStatus;
}

/**
 * SectionWrapper Component
 *
 * PURPOSE: Provides a consistent visual container with header badge status for workflow tracking.
 *
 * IMPORTANT: This component controls ONLY the header area styling (title color, border, badge text).
 * It does NOT pass any status-related props to its children components. This ensures complete
 * separation between:
 *
 * 1. WRAPPER-LEVEL STATUS (Header Badge): Shows section completion for workflow purposes
 *    - Controlled by: approvalStatus, insuranceStatus, isSectionComplete props
 *    - Affects: Header title color, section border, badge text in header
 *    - Examples: "Approved", "Incomplete", "Ready for Approval"
 *
 * 2. CHILD COMPONENT INTERNAL STATUS: Shows actual content-specific status
 *    - Controlled by: Child component's own props (e.g., caseData)
 *    - Affects: Content area display within the section
 *    - Example: InsuranceCoverageSection shows "Approved", "Not Approved", "Pending"
 *
 * The children prop is rendered as-is without any status prop injection, maintaining
 * complete isolation between wrapper styling and child component logic.
 */
const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  children,
  isComplete = true,
  isRequired = false,
  icon,
  showStatusBadge = true,
  isSectionComplete = true,
  insuranceStatus,
  approvalStatus
}) => {

  // Determine the color scheme based on completion status or insurance status
  const getStatusColors = () => {
    // If approvalStatus is provided, use the new approval status system
    if (approvalStatus) {
      if (approvalStatus === 'approved') {
        return {
          titleColor: 'text-green-600',
          iconColor: 'text-green-600',
          borderColor: '',
          badgeColor: 'bg-green-100 text-green-800',
          badgeText: 'Approved',
          showBadge: true
        };
      } else if (approvalStatus === 'ready_for_approval') {
        return {
          titleColor: 'text-yellow-500',
          iconColor: 'text-yellow-500',
          borderColor: '',
          badgeColor: 'bg-yellow-100 text-yellow-500',
          badgeText: 'Ready for Approval',
          showBadge: true
        };
      } else {
        return {
          titleColor: 'text-yellow-500',
          iconColor: 'text-yellow-500',
          borderColor: 'ring-2 ring-yellow-500',
          badgeColor: 'bg-yellow-100 text-yellow-500',
          badgeText: 'Incomplete',
          showBadge: true
        };
      }
    }

    // If insuranceStatus is provided, use insurance-specific styling
    if (insuranceStatus) {
      if (insuranceStatus === 'approved') {
        return {
          titleColor: 'text-green-600',
          iconColor: 'text-green-600',
          borderColor: 'ring-2 ring-green-500',
          badgeColor: 'bg-green-100 text-green-800',
          badgeText: 'Approved',
          showBadge: true
        };
      } else if (insuranceStatus === 'not_approved') {
        return {
          titleColor: 'text-red-600',
          iconColor: 'text-red-600',
          borderColor: 'ring-2 ring-red-500',
          badgeColor: 'bg-red-100 text-red-800',
          badgeText: 'Not Approved',
          showBadge: true
        };
      } else if (insuranceStatus === 'undefined') {
        return {
          titleColor: 'text-yellow-500',
          iconColor: 'text-yellow-500',
          borderColor: 'ring-2 ring-yellow-500',
           badgeColor: 'bg-yellow-100 text-yellow-500',
          badgeText: 'Incomplete',
          showBadge: true
        };
      } else {
        return {
          titleColor: 'text-yellow-500',
          iconColor: 'text-yellow-500',
          borderColor: 'ring-2 ring-yellow-500',
        badgeColor: 'bg-yellow-100 text-yellow-500',
          badgeText: 'Incomplete',
          showBadge: true
        };
      }
    }

    // If showStatusBadge is false, use neutral colors
    if (!showStatusBadge) {
      return {
        titleColor: 'text-gray-900',
        iconColor: 'text-gray-400',
        borderColor: '',
        showBadge: false
      };
    }

    const completionStatus = isSectionComplete;

    if (completionStatus) {
      return {
        titleColor: 'text-green-600',
        iconColor: 'text-green-600',
        borderColor: '',
        badgeColor: 'bg-green-100 text-green-800',
        badgeText: 'Complete',
        showBadge: true
      };
    } else if (isRequired) {
      return {
        titleColor: 'text-yellow-500',
        iconColor: 'text-yellow-500',
        borderColor: 'ring-2 ring-yellow-500',
        badgeColor: 'bg-yellow-100 text-yellow-800',
        badgeText: 'Incomplete',
        showBadge: true
      };
    } else {
      return {
        titleColor: 'text-gray-900',
        iconColor: 'text-gray-400',
        borderColor: '',
        badgeColor: 'bg-gray-100 text-gray-800',
        badgeText: 'Optional',
        showBadge: true
      };
    }
  };

  const colors = getStatusColors();

  return (
    <div className={`bg-white rounded-lg shadow flex flex-col ${colors.borderColor}`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon && (
            <div className={`flex-shrink-0 ${colors.iconColor}`}>
              {icon}
            </div>
          )}
          <h3 className={`text-lg font-medium ${colors.titleColor}`}>{title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {colors.showBadge && (
            <>
              {/* Status indicator badge */}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badgeColor}`}>
                {colors.badgeText || (isSectionComplete ? 'Completed' : (isRequired ? 'Incomplete' : 'Optional'))}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col flex-grow">
        {/* Children are rendered without any status prop injection - maintains isolation */}
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;