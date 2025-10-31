import React from 'react';
import { Contact, Car, Image, Newspaper } from 'lucide-react';
import {
  WorkshopCase,
  hasDdfComplete,
  hasImagesAvailable
} from '../data/mockData'; 

export interface CaseStatus {
  coverage: 'complete' | 'incomplete' | 'needs_correction' | 'ready_for_approval';
  damage: 'complete' | 'incomplete' | 'needs_correction' | 'ready_for_approval';
  images: 'complete' | 'incomplete' | 'needs_correction' | 'ready_for_approval';
  invoice: 'approved' | 'incomplete' | 'needs_correction' | 'ready_for_approval';
}

interface CaseStatusIconsProps {
  caseItem: WorkshopCase;
  size?: 'sm' | 'md' | 'lg';

}


const CaseStatusIcons: React.FC<CaseStatusIconsProps> = ({ caseItem, size = 'md' }) => {
  const status = getCaseStatus(caseItem); 

  const iconSize = size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-6 w-' : 'h-7 w-7';
  const gapSize = size === 'sm' ? 'gap-1' : size === 'lg' ? 'gap-3' : 'gap-2';


  
  return (
    <div className={`flex items-center ${gapSize}`}>
       
      <div title={
        status.coverage === 'complete' ? 'Coverage: Approved' :
        status.coverage === 'ready_for_approval' ? 'Coverage: Ready for Approval' :
        status.coverage === 'needs_correction' ? 'Coverage: Not Approved' :
        !caseItem.insuranceCoverage?.dataFetched ? 'Coverage: Not Verified' :
        'Coverage: Incomplete'
      }>
        <Contact
          className={`${iconSize} ${
            status.coverage === 'complete' ? 'text-green-500' :
            status.coverage === 'needs_correction' ? 'text-red-500' :
            'text-yellow-500'
          }`}
        />
      </div>

      <div title={
        status.damage === 'complete' ? 'DDF: Complete' :
        status.damage === 'ready_for_approval' ? 'DDF: Ready for Approval' :
        status.damage === 'needs_correction' ? 'DDF: Needs Correction' :
        'DDF: Incomplete'
      }>
        <Car
          className={`${iconSize} ${
            status.damage === 'complete' ? 'text-green-500' :
            status.damage === 'needs_correction' ? 'text-red-500' :
            'text-yellow-500'
          }`}
        />
      </div>

      <div title={
        status.images === 'complete' ? 'Images: Complete' :
        status.images === 'ready_for_approval' ? 'Images: Ready for Approval' :
        status.images === 'needs_correction' ? 'Images: Needs Correction' :
        'Images: Incomplete'
      }>
        <Image
          className={`${iconSize} ${
            status.images === 'complete' ? 'text-green-500' :
            status.images === 'needs_correction' ? 'text-red-500' :
            'text-yellow-500'
          }`}
        />
      </div>

      <div title={
        status.invoice === 'approved' ? 'Invoice: Approved' :
        status.invoice === 'ready_for_approval' ? 'Invoice: Ready for Approval' :
        status.invoice === 'needs_correction' ? 'Invoice: Needs Correction' :
        'Invoice: Incomplete'
      }>
        <Newspaper
          className={`${iconSize} ${
            status.invoice === 'approved' ? 'text-green-500' :
            status.invoice === 'needs_correction' ? 'text-red-500' :
            'text-yellow-500'
          }`}
        />
      </div>
    </div>
  );
};

const getCaseStatus = (caseItem: WorkshopCase): CaseStatus => {
  let coverageStatus: 'complete' | 'incomplete' | 'needs_correction' | 'ready_for_approval' = 'incomplete';

  // Check approval status first, then fall back to data-based status
  if (caseItem.insuranceApprovalStatus === 'approved') {
    coverageStatus = 'complete';
  } else if (caseItem.insuranceApprovalStatus === 'ready_for_approval') {
    coverageStatus = 'ready_for_approval';
  } else if (caseItem.insuranceCoverage?.dataFetched) {
    // Insurance coverage must exist, be fetched, and be approved to be complete
    if (caseItem.insuranceCoverage?.exists && caseItem.insuranceCoverage?.status === 'approved') {
      coverageStatus = 'complete';
    } else if (caseItem.insuranceCoverage?.status === 'not_approved') {
      coverageStatus = 'needs_correction';
    } else {
      coverageStatus = 'incomplete';
    }
  } else {
    coverageStatus = 'incomplete';
  }

  // Check DDF approval status
  let ddfStatus: 'complete' | 'incomplete' | 'needs_correction' | 'ready_for_approval' = 'incomplete';
  if (caseItem.ddfApprovalStatus === 'approved') {
    ddfStatus = 'complete';
  } else if (caseItem.ddfApprovalStatus === 'ready_for_approval') {
    ddfStatus = 'ready_for_approval';
  } else {
    const ddfComplete = hasDdfComplete(caseItem);
    ddfStatus = ddfComplete ? 'complete' : 'incomplete';
  }

  // Check Images approval status
  let imagesStatus: 'complete' | 'incomplete' | 'needs_correction' | 'ready_for_approval' = 'incomplete';
  if (caseItem.imagesApprovalStatus === 'approved') {
    imagesStatus = 'complete';
  } else if (caseItem.imagesApprovalStatus === 'ready_for_approval') {
    imagesStatus = 'ready_for_approval';
  } else {
    const imagesComplete = hasImagesAvailable(caseItem);
    imagesStatus = imagesComplete ? 'complete' : 'incomplete';
  }

  // Check Invoice approval status
  let invoiceStatus: 'approved' | 'incomplete' | 'needs_correction' | 'ready_for_approval' = 'incomplete';
  if (caseItem.invoiceApprovalStatus === 'approved') {
    invoiceStatus = 'approved';
  } else if (caseItem.invoiceApprovalStatus === 'ready_for_approval') {
    invoiceStatus = 'ready_for_approval';
  } else if (caseItem.invoice) {
    // Invoice is only complete if it has all required fields: kid, totalAmount, invoiceNumber, dueDate
    const hasAllRequiredFields = !!(
      caseItem.invoice.kid &&
      caseItem.invoice.totalAmount &&
      caseItem.invoice.invoiceNumber &&
      caseItem.invoice.dueDate
    );

    if (hasAllRequiredFields) {
      if (caseItem.invoice.reviewStatus === 'ok') {
        invoiceStatus = 'approved';
      } else if (caseItem.invoice.reviewStatus === 'needs_correction') {
        invoiceStatus = 'needs_correction';
      } else {
        // Has all fields but not reviewed yet - still incomplete
        invoiceStatus = 'incomplete';
      }
    } else {
      invoiceStatus = 'incomplete';
    }
  } else {
    invoiceStatus = 'incomplete';
  }

  return {
    coverage: coverageStatus,
    damage: ddfStatus,
    images: imagesStatus,
    invoice: invoiceStatus
  };
};

export default CaseStatusIcons;
