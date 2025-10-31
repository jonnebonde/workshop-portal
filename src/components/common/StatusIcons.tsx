import React from 'react';
import { 
  FileText, 
  Image, 
  Receipt, 
  PenTool, 
  Settings, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Wrench 
} from 'lucide-react';
import {
  WorkshopCase,
  hasDdfComplete,
  hasImagesAvailable,
  hasInvoicePresent,
  hasPartsAndLaborComplete,
  hasCalibrationComplete,
  hasInsuranceCoverageComplete,
  getInsuranceCoverageStatus
} from '../../data/mockData';

export const getDdfStatusIcon = (caseItem: WorkshopCase) => {
  const isComplete = hasDdfComplete(caseItem);
  return (
    <FileText
      className={`h-4 w-4 ${isComplete ? 'text-green-500' : 'text-yellow-500'}`}
      title={isComplete ? 'DDF Complete' : 'DDF Incomplete'}
    />
  );
};

export const getImagesStatusIcon = (caseItem: WorkshopCase) => {
  const hasImages = hasImagesAvailable(caseItem);
  return (
    <Image
      className={`h-4 w-4 ${hasImages ? 'text-green-500' : 'text-yellow-500'}`}
      title={hasImages ? 'Images Available' : 'No Images'}
    />
  );
};

export const getInvoiceStatusIcon = (caseItem: WorkshopCase) => {
  if (!caseItem.invoice) {
    return (
      <Receipt
        className="h-4 w-4 text-yellow-500"
        title="Invoice Missing"
      />
    );
  }

  switch (caseItem.invoice.reviewStatus) {
    case 'ok':
      return (
        <Receipt
          className="h-4 w-4 text-green-500"
          title="Invoice Approved"
        />
      );
    case 'pending_review':
      return (
        <Receipt
          className="h-4 w-4 text-yellow-500"
          title="Invoice Pending Review"
        />
      );
    case 'needs_correction':
      return (
        <Receipt
          className="h-4 w-4 text-red-500"
          title="Invoice Needs Correction"
        />
      );
    default:
      return (
        <Receipt
          className="h-4 w-4 text-yellow-500"
          title="Invoice Uploaded - Review Pending"
        />
      );
  }
};

export const getPartsLaborStatusIcon = (caseItem: WorkshopCase) => {
  const isComplete = hasPartsAndLaborComplete(caseItem);
  return (
    <PenTool
      className={`h-4 w-4 ${isComplete ? 'text-green-500' : 'text-yellow-500'}`}
      title={isComplete ? 'Parts & Labor Complete' : 'Parts & Labor Incomplete'}
    />
  );
};

export const getCalibrationStatusIcon = (caseItem: WorkshopCase) => {
  const isComplete = hasCalibrationComplete(caseItem);
  return (
    <Settings
      className={`h-4 w-4 ${isComplete ? 'text-green-500' : 'text-yellow-500'}`}
      title={isComplete ? 'Calibration Complete' : 'Calibration Pending'}
    />
  );
};

export const getInsuranceCoverageStatusIcon = (caseItem: WorkshopCase) => {
  const status = getInsuranceCoverageStatus(caseItem);

  if (status === 'approved') {
    return (
      <Shield
        className="h-4 w-4 text-green-500"
        title="Insurance Coverage Approved"
      />
    );
  } else if (status === 'not_approved') {
    return (
      <Shield
        className="h-4 w-4 text-red-500"
        title="Insurance Coverage Not Approved"
      />
    );
  } else if (status === 'undefined') {
    return (
      <Shield
        className="h-4 w-4 text-yellow-500"
        title="Insurance Coverage Status Undefined"
      />
    );
  } else {
    return (
      <Shield
        className="h-4 w-4 text-yellow-500"
        title="Insurance Coverage Not Fetched"
      />
    );
  }
};

export const getOverallStatusIcon = (caseItem: WorkshopCase) => {
  const ddfComplete = hasDdfComplete(caseItem);
  const imagesComplete = hasImagesAvailable(caseItem);
  const partsLaborComplete = hasPartsAndLaborComplete(caseItem);
  const insuranceCoverageComplete = hasInsuranceCoverageComplete(caseItem);

  if (ddfComplete && imagesComplete && partsLaborComplete && insuranceCoverageComplete) {
    return <CheckCircle className="h-5 w-5 text-green-500" title="Ready for Approval" />;
  } else {
    return <AlertTriangle className="h-5 w-5 text-yellow-500" title="Missing Required Data" />;
  }
};

export const getWorkStatusIcon = (caseItem: WorkshopCase) => {
  if (caseItem.service.repairFinishedDate) {
    return <CheckCircle className="h-5 w-5 text-green-500" title="Repair Completed" />;
  } else if (caseItem.status === 'In Progress') {
    return <Wrench className="h-5 w-5 text-blue-500" title="Work in Progress" />;
  } else {
    return <Clock className="h-5 w-5 text-orange-500" title="Waiting to Start" />;
  }
};

export const getReadyForCompletionStatusIcon = (caseItem: WorkshopCase) => {
  // For approved cases, check if they're ready for completion
  // This includes having repair finished date set and all other requirements met
  const hasRepairFinishedDate = !!caseItem.service.repairFinishedDate;
  const ddfComplete = hasDdfComplete(caseItem);
  const imagesComplete = hasImagesAvailable(caseItem);
  const partsLaborComplete = hasPartsAndLaborComplete(caseItem);
  const invoiceComplete = hasInvoicePresent(caseItem);
  const calibrationComplete = hasCalibrationComplete(caseItem);
  
  const isReadyForCompletion = hasRepairFinishedDate && ddfComplete && imagesComplete && 
                               partsLaborComplete && invoiceComplete && calibrationComplete;
  
  if (isReadyForCompletion) {
    return <CheckCircle className="h-5 w-5 text-green-500" title="Ready for Completion - All Requirements Met" />;
  } else {
    return <AlertTriangle className="h-5 w-5 text-yellow-500" title="Not Ready - Missing Requirements" />;
  }
};