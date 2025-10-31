import React from 'react';
import { WorkshopCase } from '../../data/mockData';

interface InsuranceCoverageSectionProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
}

/**
 * InsuranceCoverageSection Component
 *
 * IMPORTANT: This component's internal status display is completely isolated from
 * the SectionWrapper's badge status system. The status shown within this section
 * is derived ONLY from caseData.insuranceCoverage.status and should NOT be affected
 * by any wrapper-level status props (insuranceStatus, approvalStatus, etc.).
 *
 * Two separate status systems:
 * 1. SectionWrapper Badge: Shows workflow completion status (Approved, Incomplete, Ready for Approval)
 * 2. Internal Status Display: Shows actual insurance coverage decision (Approved, Not Approved, Pending)
 */
const InsuranceCoverageSection: React.FC<InsuranceCoverageSectionProps> = ({ caseData }) => {
  // CRITICAL: Only read from caseData.insuranceCoverage - ignore any external status props
  const coverage = caseData.insuranceCoverage;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK'
    }).format(amount);
  };



  /**
   * Determines the status display for the internal status box.
   *
   * DEFENSIVE CHECK: This function explicitly reads only from coverage.status
   * (which comes from caseData.insuranceCoverage.status) and is not influenced
   * by any props passed to parent components like SectionWrapper.
   *
   * @returns Status display configuration for internal status box
   */
  const getStatusDisplay = () => {
    // Explicitly check coverage.status to ensure isolation from wrapper props
    const coverageStatus = coverage?.status;

    if (!coverageStatus || coverageStatus === 'undefined') {
      return {
        text: 'Pending',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      };
    } else if (coverageStatus === 'approved') {
      return {
        text: 'Approved',
        color: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    } else {
      // coverageStatus === 'not_approved'
      return {
        text: 'Not Approved',
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="space-y-4">
      {/*
        INTERNAL STATUS DISPLAY - NOT AFFECTED BY WRAPPER PROPS
        This section displays the actual insurance coverage status from caseData.insuranceCoverage.status
        Changes to SectionWrapper's badge text will NOT affect these displays
      */}
      {!coverage?.dataFetched || !coverage?.status || coverage.status === 'undefined' ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-center">
            <span className="text-sm text-yellow-700 font-medium">Insurance coverage not verified yet</span>
          </div>
        </div>
      ) : coverage.status === 'not_approved' ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-center">
            <span className="text-sm text-red-700 font-medium">
              {coverage.denialReason || 'Insurance coverage has been denied. because of some reason that will be described in this text.'}
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Policy Type</span>
            <span className="text-sm font-semibold text-gray-900">{coverage.policyType === 'private' ? 'Private' : 'Business'}</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Deductible</span>
            <span className="text-sm font-semibold text-gray-900">{formatCurrency(coverage.deductible)}</span>
          </div>
          {/* Internal Status Box - derived only from coverage.status */}
          <div className={`${statusDisplay.bgColor} rounded-lg p-3 border ${statusDisplay.borderColor}`}>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Status</span>
            <span className={`text-sm font-semibold ${statusDisplay.color}`}>
              {statusDisplay.text}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceCoverageSection;