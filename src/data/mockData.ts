// Mock Data for Workshop Management System

import { comprehensiveMockCases } from './comprehensiveMockCases';

// Base interface for common properties
interface BaseItem {
  id: string;
  type: 'part' | 'labor';
  total: number;
}

// Part-specific properties
interface PartItem extends BaseItem {
  type: 'part';
  category: string;
  articleNr: string;
  quantity: number;
  price: number;
  discount: number;
  status: 'Ordered' | 'In Stock' | 'Pending' | 'Out of Stock';
  estimatedArrival?: string;
  agentComment?: 'Approved' | 'Changed to price agreement';
}

// Labor-specific properties
interface LaborItem extends BaseItem {
  type: 'labor';
  description: string;
  hours: number;
  ratePerHour: number;
  agentComment?: 'Approved' | 'Changed to price agreement';
}

// Union type for parts and labor items
export type PartsLaborItem = PartItem | LaborItem;

export interface PartsAndLabor {
  items: PartsLaborItem[];
  totalParts: number;
  totalLabor: number;
  grandTotal: number;
}

export interface CaseImage {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
}

export interface RequiredImages {
  vehicleOverview?: CaseImage;
  glassCloseUp?: CaseImage;
  damageDetail?: CaseImage;
}

export interface Assessment {
  damageDescription: string;
  recommendedAction: string;
  estimatedCost: number;
  assessedBy: string;
  assessmentDate: string;
  ddfStatus?: 'non-existent' | 'partially-done' | 'complete';
  damageDate?: string;
  glassType?: string;
  location?: string;
  wearLevel?: string;
  damageType?: string;
  causeOfDamage?: string;
  wearAndTear?: string;
  place?: string;
  claimId?: string;
}

export interface Owner {
  type: 'private' | 'company';
  name: string;
  ownershipDate: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface Invoice {
  invoiceNumber: string;
  kid: string;
  dueDate: string;
  totalAmount: number;
  fileUrl: string;
  issueDate: string;
  reviewStatus?: 'pending_review' | 'needs_correction' | 'ok';
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderType: 'agent' | 'workshop' | 'system';
  message: string;
  timestamp: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
}

export interface ActionLogEntry {
  id: string;
  actionType: 'case_created' | 'status_changed' | 'file_uploaded' | 'invoice_reviewed' | 'parts_added' | 'calibration_updated' | 'insurance_updated' | 'image_uploaded' | 'stage_changed' | 'note_added' | 'sms_sent' | 'other';
  actor: string;
  actorType: 'system' | 'workshop' | 'agent';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Calibration {
  required?: boolean;
  notNeeded?: boolean;
  signature?: string;
  confirmed?: boolean;
  files?: Attachment[];
}

export interface InsuranceCoverage {
  exists: boolean;
  coverageAmount?: number;
  policyType: 'private' | 'business';
  vatLiable: boolean;
  deductible: number;
  dataFetched: boolean; // Indicates if data was successfully fetched from backend/API
  fetchedAt?: string;
  policyNumber?: string;
  expiryDate?: string;
  status?: 'approved' | 'not_approved' | 'undefined';
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'other';
  size: number;
  uploadedAt: string;
  url: string;
}

export interface Note {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export type SectionApprovalStatus = 'incomplete' | 'ready_for_approval' | 'approved';

export interface WorkshopCase {
  id: string;
  caseNumber: string;
  stage: 'draft' | 'in_progress' | 'finished';
  status: 'New' | 'In Progress' | 'Ready' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  insuranceCompany: string;
  workshopName?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    vin: string;
    licensePlate: string;
    color: string;
  };
  service: {
    type: string;
    description: string;
    startDate?: string;
    completionDate?: string;
    repairFinishedDate?: string;
    estimatedHours: number;
    technician: string;
  };
  owner?: Owner;
  partsAndLabor: PartsAndLabor;
  requiredImages?: RequiredImages;
  damageImages: CaseImage[];
  repairImages: CaseImage[];
  afterRepairImages: CaseImage[];
  attachments: Attachment[];
  notes: Note[];
  invoice?: Invoice;
  chatLog: ChatMessage[];
  actionLog: ActionLogEntry[];
  isChatLogEnabled?: boolean;
  lastLogViewedAt?: string;
  assessment?: Assessment;
  calibration?: Calibration;
  insuranceCoverage?: InsuranceCoverage;
  imagesNotNeeded?: boolean;
  imagesNotNeededComment?: string;
  createdAt: string;
  updatedAt: string;
  ddfApprovalStatus?: SectionApprovalStatus;
  imagesApprovalStatus?: SectionApprovalStatus;
  partsLaborApprovalStatus?: SectionApprovalStatus;
  calibrationApprovalStatus?: SectionApprovalStatus;
  invoiceApprovalStatus?: SectionApprovalStatus;
  insuranceApprovalStatus?: SectionApprovalStatus;
}

// Constants
export const insuranceCompanies = [
  'Nordlys Forsikring',
  'FjordTrygg',
  'Viking Trygghet',
  'Norsk Sjø og Land Forsikring',
  'By & Bygd Forsikring',
  'SkadePartner AS'
];


export const technicians = ['John Smith', 'Sarah Johnson', 'Mike Brown', 'Lisa Davis'];


export const workshopNames = [
  'Knekt & Knust Bilglass Oslo',
  'Smash’n’Fix Trondheim',
  'Glassmester’n på Hjul Drammen',
  'Rutesprekk Sarpsborg AS',
  'Møkkete Rute Skadesenter Alnabru',
  'Sprekk & Sønn Bilglass Østfold',
  'Steinsprut Spesialisten Helsfyr',
  'Bilplett Bergen',
  'Knus & Klart Stavanger',
  'TrønderRute Trondheim',
  'GlassGuru Kristiansand',
  'Lynet Bilglass Tromsø'
];


export const glassTypes = [
  "windshield",
  "side",
  "rear",
  "panoramic",
  "other",
  "multiple",
]
export const damageTypes = ['stone', 'accident', 'vandalism', 'weather', 'other'];
export const wearLevels = ['little', 'more', 'insane'];
export const locations = ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'];

export const causeOfDamageOptions = ['Stonechip', 'Unknown', 'Vandalism', 'Accident', 'Other'];
export const wearAndTearOptions = ['Little', 'Normal', 'Much wear'];

// Categories for parts
export const partCategories = ['Glass', 'Adhesive', 'Tools', 'Sensor', 'Molding', 'Other'];

// Helper function to add DDF attachment to a case
export const addDdfAttachmentToCase = (caseId: string, fileName: string, fileUrl: string, fileSize: number = 1024000) => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    const newAttachment: Attachment = {
      id: `ddf-${Date.now()}`,
      name: fileName,
      type: 'document',
      size: fileSize,
      uploadedAt: new Date().toISOString(),
      url: fileUrl
    };
    
    // Add the attachment
    mockCases[caseIndex].attachments.push(newAttachment);
    
    // Set DDF status to complete and simulate metadata extraction
    if (!mockCases[caseIndex].assessment) {
      mockCases[caseIndex].assessment = {
        damageDescription: `Assessment for case ${mockCases[caseIndex].caseNumber}`,
        recommendedAction: 'Full Replacement',
        estimatedCost: Math.floor(Math.random() * 5000) + 1000,
        assessedBy: technicians[Math.floor(Math.random() * technicians.length)],
        assessmentDate: new Date().toISOString(),
        ddfStatus: 'complete',
        damageDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        glassType: glassTypes[Math.floor(Math.random() * glassTypes.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        wearLevel: wearLevels[Math.floor(Math.random() * wearLevels.length)],
        damageType: damageTypes[Math.floor(Math.random() * damageTypes.length)],
        causeOfDamage: causeOfDamageOptions[Math.floor(Math.random() * causeOfDamageOptions.length)],
        wearAndTear: wearAndTearOptions[Math.floor(Math.random() * wearAndTearOptions.length)],
        place: ['Highway', 'At home', 'Parking lot', 'City center'][Math.floor(Math.random() * 4)],
        claimId: `CLM-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };
    } else {
      mockCases[caseIndex].assessment.ddfStatus = 'complete';
      // Simulate extracting metadata from DDF
      if (!mockCases[caseIndex].assessment.damageDate) {
        mockCases[caseIndex].assessment.damageDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      }
      if (!mockCases[caseIndex].assessment.glassType) {
        mockCases[caseIndex].assessment.glassType = glassTypes[Math.floor(Math.random() * glassTypes.length)];
      }
      if (!mockCases[caseIndex].assessment.causeOfDamage) {
        mockCases[caseIndex].assessment.causeOfDamage = causeOfDamageOptions[Math.floor(Math.random() * causeOfDamageOptions.length)];
      }
      if (!mockCases[caseIndex].assessment.wearAndTear) {
        mockCases[caseIndex].assessment.wearAndTear = wearAndTearOptions[Math.floor(Math.random() * wearAndTearOptions.length)];
      }
      if (!mockCases[caseIndex].assessment.place) {
        mockCases[caseIndex].assessment.place = ['Highway', 'At home', 'Parking lot', 'City center'][Math.floor(Math.random() * 4)];
      }
      if (!mockCases[caseIndex].assessment.claimId) {
        mockCases[caseIndex].assessment.claimId = `CLM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }
    }
    
    // Update insurance company if not set
    if (!mockCases[caseIndex].insuranceCompany) {
      mockCases[caseIndex].insuranceCompany = insuranceCompanies[Math.floor(Math.random() * insuranceCompanies.length)];
    }
    
    mockCases[caseIndex].updatedAt = new Date().toISOString();

    addActionLog(
      caseId,
      'file_uploaded',
      'Workshop User',
      'workshop',
      `DDF file uploaded: ${fileName}`,
      { fileName, fileSize }
    );

    return newAttachment;
  }
  return null;
};

// Helper function to delete DDF attachment from a case
export const deleteDdfAttachment = (caseId: string, attachmentId: string) => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    // Remove the attachment
    mockCases[caseIndex].attachments = mockCases[caseIndex].attachments.filter(att => att.id !== attachmentId);
    
    // Check if there are any remaining DDF attachments
    const remainingDdfAttachments = mockCases[caseIndex].attachments.filter(att => 
      att.type === 'document' && att.name.toLowerCase().includes('ddf')
    );
    
    // If no DDF attachments remain, reset DDF status and clear metadata
    if (remainingDdfAttachments.length === 0) {
      if (mockCases[caseIndex].assessment) {
        mockCases[caseIndex].assessment.ddfStatus = 'non-existent';
        // Clear DDF-related metadata
        mockCases[caseIndex].assessment.damageDate = undefined;
        mockCases[caseIndex].assessment.glassType = undefined;
        mockCases[caseIndex].assessment.location = undefined;
        mockCases[caseIndex].assessment.wearLevel = undefined;
        mockCases[caseIndex].assessment.damageType = undefined;
        mockCases[caseIndex].assessment.causeOfDamage = undefined;
        mockCases[caseIndex].assessment.wearAndTear = undefined;
        mockCases[caseIndex].assessment.place = undefined;
        mockCases[caseIndex].assessment.claimId = undefined;
      }
    }
    
    mockCases[caseIndex].updatedAt = new Date().toISOString();
    return true;
  }
  return false;
};

// Helper function to add invoice attachment to a case
export const addInvoiceAttachmentToCase = (caseId: string, fileName: string, fileUrl: string, fileSize: number = 1024000) => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    // Create invoice if it doesn't exist
    if (!mockCases[caseIndex].invoice) {
      mockCases[caseIndex].invoice = {
        invoiceNumber: `INV-${mockCases[caseIndex].caseNumber}`,
        kid: `${Math.floor(Math.random() * 900000000) + 100000000}`,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        totalAmount: Math.floor(Math.random() * 50000) + 5000,
        fileUrl: fileUrl,
        issueDate: new Date().toISOString()
      };
    } else {
      // Update file URL
      mockCases[caseIndex].invoice.fileUrl = fileUrl;
    }
    
    mockCases[caseIndex].updatedAt = new Date().toISOString();

    addActionLog(
      caseId,
      'file_uploaded',
      'Workshop User',
      'workshop',
      `Invoice file uploaded: ${fileName}`,
      { fileName, fileSize }
    );

    return mockCases[caseIndex].invoice;
  }
  return null;
};

// Helper function to add calibration file to a case
export const addCalibrationFileToCase = (caseId: string, fileName: string, fileUrl: string, fileSize: number = 1024000) => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    const newCalibrationFile: Attachment = {
      id: `calibration-${Date.now()}`,
      name: fileName,
      type: 'document',
      size: fileSize,
      uploadedAt: new Date().toISOString(),
      url: fileUrl
    };

    if (!mockCases[caseIndex].calibration) {
      mockCases[caseIndex].calibration = {
        required: true,
        files: [newCalibrationFile]
      };
    } else {
      if (!mockCases[caseIndex].calibration!.files) {
        mockCases[caseIndex].calibration!.files = [];
      }
      mockCases[caseIndex].calibration!.files!.push(newCalibrationFile);
    }

    mockCases[caseIndex].updatedAt = new Date().toISOString();

    addActionLog(
      caseId,
      'calibration_updated',
      'Workshop User',
      'workshop',
      `Calibration file uploaded: ${fileName}`,
      { fileName, fileSize }
    );

    return newCalibrationFile;
  }
  return null;
};

// Helper function to delete calibration file from a case
export const deleteCalibrationFile = (caseId: string, fileId: string) => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    if (mockCases[caseIndex].calibration?.files) {
      mockCases[caseIndex].calibration!.files = mockCases[caseIndex].calibration!.files!.filter(file => file.id !== fileId);
    }

    mockCases[caseIndex].updatedAt = new Date().toISOString();

    addActionLog(
      caseId,
      'calibration_updated',
      'Workshop User',
      'workshop',
      'Calibration file deleted',
      { fileId }
    );

    return true;
  }
  return false;
};

// Helper function to delete invoice from a case
export const deleteInvoice = (caseId: string) => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    mockCases[caseIndex].invoice = undefined;
    mockCases[caseIndex].updatedAt = new Date().toISOString();
    return true;
  }
  return false;
};

// Helper function to set invoice review status (simulates backend OCR process)
export const setInvoiceReviewStatus = (caseId: string, status: 'pending_review' | 'needs_correction' | 'ok') => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1 && mockCases[caseIndex].invoice) {
    mockCases[caseIndex].invoice!.reviewStatus = status;
    mockCases[caseIndex].updatedAt = new Date().toISOString();

    const statusLabels = {
      'pending_review': 'Pending Review',
      'needs_correction': 'Needs Correction',
      'ok': 'Approved'
    };

    addActionLog(
      caseId,
      'invoice_reviewed',
      'Workshop User',
      'workshop',
      `Invoice review status set to: ${statusLabels[status]}`,
      { status }
    );

    return true;
  }
  return false;
};

// Helper function to check if invoice is reviewed and OK
export const isInvoiceReviewedAndOK = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;
  
  return !!(caseItem.invoice && caseItem.invoice.reviewStatus === 'ok');
};

// Helper function to generate insurance coverage data
const generateInsuranceCoverage = (index: number): InsuranceCoverage => {
  const isPrivate = Math.random() > 0.6; // 40% business, 60% private
  const dataFetched = Math.random() > 0; // 80% have data fetched successfully

  // Generate status: 40% approved, 30% not_approved, 30% undefined
  let status: 'approved' | 'not_approved' | 'undefined';
  const statusRandom = Math.random();
  if (statusRandom < 0.4) {
    status = 'approved';
  } else if (statusRandom < 0.7) {
    status = 'not_approved';
  } else {
    status = 'undefined';
  }

  return {
    exists: Math.random() > 0.01, // 90% have coverage
    coverageAmount: dataFetched ? Math.floor(Math.random() * 500000) + 100000 : undefined,
    policyType: isPrivate ? 'private' : 'business',
    vatLiable: !isPrivate, // Business policies are VAT liable
    deductible: Math.floor(Math.random() * 10000) + 1000,
    dataFetched,
    fetchedAt: dataFetched ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() : undefined,
    policyNumber: dataFetched ? `POL-${String(2024001 + index).padStart(8, '0')}` : undefined,
    expiryDate: dataFetched ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    status
  };
};

// Helper function to ensure completed cases have all documents
const ensureCompletedCaseHasDocuments = (caseItem: WorkshopCase): WorkshopCase => {
  if (caseItem.status === 'Completed') {
    // Set stage to finished for completed cases
    caseItem.stage = 'finished';
    
    // Ensure DDF is complete with actual file
    if (!caseItem.assessment) {
      caseItem.assessment = {
        damageDescription: `Assessment for case ${caseItem.caseNumber}`,
        recommendedAction: 'Full Replacement',
        estimatedCost: Math.floor(Math.random() * 5000) + 1000,
        assessedBy: technicians[Math.floor(Math.random() * technicians.length)],
        assessmentDate: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        ddfStatus: 'complete',
        damageDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        glassType: glassTypes[Math.floor(Math.random() * glassTypes.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        wearLevel: wearLevels[Math.floor(Math.random() * wearLevels.length)],
        damageType: damageTypes[Math.floor(Math.random() * damageTypes.length)],
        causeOfDamage: causeOfDamageOptions[Math.floor(Math.random() * causeOfDamageOptions.length)],
        wearAndTear: wearAndTearOptions[Math.floor(Math.random() * wearAndTearOptions.length)],
        place: ['Highway', 'At home', 'Parking lot', 'City center'][Math.floor(Math.random() * 4)],
        claimId: `CLM-${caseItem.id}-${Math.floor(Math.random() * 1000)}`
      };
    } else {
      caseItem.assessment.ddfStatus = 'complete';
    }

    // Ensure DDF attachment exists when status is complete
    const hasDdfAttachment = caseItem.attachments.some(att => 
      att.type === 'document' && att.name.toLowerCase().includes('ddf')
    );
    
    if (!hasDdfAttachment) {
      const ddfAttachment: Attachment = {
        id: `ddf-${caseItem.id}`,
        name: `DDF_${caseItem.caseNumber}.pdf`,
        type: 'document',
        size: Math.floor(Math.random() * 2000000) + 500000, // 0.5-2.5MB
        uploadedAt: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
        url: `#ddf-${caseItem.id}`
      };
      caseItem.attachments.push(ddfAttachment);
    }

    // Ensure all three required images exist for completed cases
    if (!caseItem.requiredImages) {
      caseItem.requiredImages = {};
    }
    if (!caseItem.requiredImages.vehicleOverview) {
      caseItem.requiredImages.vehicleOverview = {
        id: `vehicle-overview-${caseItem.id}`,
        url: `https://i.imgur.com/DxEqaxl.png`,
        caption: 'Vehicle Overview',
        uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    }
    if (!caseItem.requiredImages.glassCloseUp) {
      caseItem.requiredImages.glassCloseUp = {
        id: `glass-closeup-${caseItem.id}`,
        url: `https://picsum.photos/800/600?random=${caseItem.id}gc`,
        caption: 'Glass Close-up',
        uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    }
    if (!caseItem.requiredImages.damageDetail) {
      caseItem.requiredImages.damageDetail = {
        id: `damage-detail-${caseItem.id}`,
        url: `https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?_gl=1*a9a278*_ga*MTY2NDAyMzg1My4xNzYwNDI2MDUz*_ga_8JE65Q40S6*czE3NjA0MjYwNTIkbzEkZzEkdDE3NjA0MjYyNTAkajYwJGwwJGgw`,
        caption: 'Damage Detail',
        uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    }

    // Ensure invoice exists for completed cases
    if (!caseItem.invoice) {
      caseItem.invoice = {
        invoiceNumber: `INV-${caseItem.caseNumber}`,
        kid: `${Math.floor(Math.random() * 900000000) + 100000000}`,
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        totalAmount: Math.floor(Math.random() * 50000) + 5000,
        fileUrl: `#invoice-${caseItem.id}`,
        issueDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
        reviewStatus: 'ok' // Finished cases should have approved invoices
      };
    }

    // Ensure completion date is set
    if (!caseItem.service.completionDate) {
      caseItem.service.completionDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
    }
    
    // Ensure repair finished date is set for completed cases
    if (!caseItem.service.repairFinishedDate) {
      caseItem.service.repairFinishedDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }

    // Ensure insurance coverage data is fetched for completed cases
    if (!caseItem.insuranceCoverage) {
      caseItem.insuranceCoverage = generateInsuranceCoverage(parseInt(caseItem.id.split('-')[1]));
    }
    caseItem.insuranceCoverage.dataFetched = true;
  }
  
  return caseItem;
};

// Helper function to generate statuses with minimum requirements
const generateCaseStatus = (index: number, total: number): WorkshopCase['status'] => {
  // Ensure minimum 4 cases with "New" or "In Progress" (open state)
  // Ensure minimum 2 cases with "Waiting Parts" (hold state)
  if (index < 4) {
    return index % 2 === 0 ? 'New' : 'In Progress';
  } else if (index >= 4 && index < 6) {
    return 'Waiting Parts';
  } else {
    // Remaining cases distributed across all statuses
    return ['New', 'In Progress', 'Ready', 'Completed', 'Cancelled', 'Waiting Parts'][Math.floor(Math.random() * 6)] as WorkshopCase['status'];
  }
};

const randomMockCases: WorkshopCase[] = Array.from({ length: 28 }, (_, index) => ({
  id: `case-${index + 1}`,
  caseNumber: `BS${String(2024001 + index).padStart(6, '0')}`,
  stage: 'draft' as WorkshopCase['stage'], // Will be updated based on status below
  status: generateCaseStatus(index, 40),
  priority: ['Low', 'Medium', 'High', 'Urgent'][Math.floor(Math.random() * 4)] as WorkshopCase['priority'],
  insuranceCompany: insuranceCompanies[Math.floor(Math.random() * insuranceCompanies.length)],
  workshopName: workshopNames[Math.floor(Math.random() * workshopNames.length)],
  customer: {
    name: `Customer ${index + 1}`,
    email: `customer${index + 1}@example.com`,
    phone: `+47 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100}`
  },
  vehicle: {
    make: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Volvo'][Math.floor(Math.random() * 6)],
    model: ['Camry', 'Civic', 'F-150', '3 Series', 'C-Class', 'XC90'][Math.floor(Math.random() * 6)],
    year: 2015 + Math.floor(Math.random() * 9),
    vin: Array.from({ length: 17 }, () => '0123456789ABCDEFGHJKLMNPRSTUVWXYZ'[Math.floor(Math.random() * 33)]).join(''),
    licensePlate: `AB${Math.floor(Math.random() * 90000) + 10000}`,
    color: ['Black', 'White', 'Silver', 'Blue', 'Red'][Math.floor(Math.random() * 5)]
  },
  service: {
    type: ['Windshield Replacement', 'Windshield Repair', 'Side Window Replacement', 'Rear Window Replacement', 'Sunroof Replacement'][Math.floor(Math.random() * 5)],
    description: `Service description for case ${index + 1}`,
    startDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    completionDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    estimatedHours: Math.floor(Math.random() * 8) + 2,
    technician: technicians[Math.floor(Math.random() * technicians.length)]
  },
  owner: {
    type: Math.random() > 0.5 ? 'private' : 'company',
    name: Math.random() > 0.5 ? `Company ${index + 1}` : `Person ${index + 1}`,
    ownershipDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    address: `Street ${index + 1}`,
    postalCode: String(Math.floor(Math.random() * 9000) + 1000),
    city: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'][Math.floor(Math.random() * 4)]
  },
  partsAndLabor: {
    items: [
      // Generate parts
      ...Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i): PartItem => {
        const part = {
          id: `part-${index}-${i}`,
          type: 'part' as const,
          category: partCategories[Math.floor(Math.random() * partCategories.length)],
          articleNr: `ART${String(Math.floor(Math.random() * 90000) + 10000)}`,
          quantity: Math.floor(Math.random() * 3) + 1,
          price: Math.floor(Math.random() * 1000) + 100,
          discount: Math.floor(Math.random() * 100),
          status: ['Ordered', 'In Stock', 'Pending', 'Out of Stock'][Math.floor(Math.random() * 4)] as PartItem['status'],
          estimatedArrival: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          agentComment: index < 10 && i === 0 ? (Math.random() > 0.5 ? 'Approved' : 'Changed to price agreement') : undefined,
          total: 0
        };
        part.total = (part.price - part.discount) * part.quantity;
        return part;
      }),
      // Generate labor
      ...Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i): LaborItem => {
        const labor = {
          id: `labor-${index}-${i}`,
          type: 'labor' as const,
          description: ['Installation', 'Removal', 'Calibration'][Math.floor(Math.random() * 3)],
          hours: Math.floor(Math.random() * 4) + 1,
          ratePerHour: 150,
          agentComment: index < 10 && i === 0 ? (Math.random() > 0.6 ? 'Approved' : (Math.random() > 0.5 ? 'Changed to price agreement' : undefined)) : undefined,
          total: 0
        };
        labor.total = labor.hours * labor.ratePerHour;
        return labor;
      })
    ],
    totalParts: 0,
    totalLabor: 0,
    grandTotal: 0
  },
  damageImages: [
    ...Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i) => ({
      id: `damage-${index}-${i}`,
      url: `https://picsum.photos/800/600?random=${index}${i}1`,
      caption: `Damage photo ${i + 1}`,
      uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      fileName: `damage_photo_${i + 1}.jpg`,
      fileType: 'image/jpeg',
      fileSize: Math.floor(Math.random() * 2000000) + 500000
    })),
    ...Array.from({ length: Math.floor(Math.random() * 2) }, (_, i) => {
      const docTypes = [
        { ext: 'pdf', mime: 'application/pdf', name: 'Insurance Document' },
        { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name: 'Damage Report' },
        { ext: 'pdf', mime: 'application/pdf', name: 'Police Report' }
      ];
      const docType = docTypes[i % docTypes.length];
      return {
        id: `damage-doc-${index}-${i}`,
        url: `#document-${index}-${i}`,
        caption: `${docType.name} ${i + 1}`,
        uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        fileName: `${docType.name.toLowerCase().replace(/\s+/g, '_')}_${i + 1}.${docType.ext}`,
        fileType: docType.mime,
        fileSize: Math.floor(Math.random() * 1500000) + 300000
      };
    })
  ],
  repairImages: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `repair-${index}-${i}`,
    url: `https://picsum.photos/800/600?random=${index}${i}2`,
    caption: `Repair in progress photo ${i + 1}`,
    uploadedAt: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString()
  })),
  afterRepairImages: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `after-${index}-${i}`,
    url: `https://picsum.photos/800/600?random=${index}${i}3`,
    caption: `Completed repair photo ${i + 1}`,
    uploadedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString()
  })),
  attachments: [
    // Add DDF attachment for cases with complete DDF status (first 16 cases = 80%)
    ...(index < 16 ? [{
      id: `ddf-${index}`,
      name: `DDF_BS${String(2024001 + index).padStart(6, '0')}.pdf`,
      type: 'document' as Attachment['type'],
      size: Math.floor(Math.random() * 2000000) + 500000,
      uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      url: `#ddf-${index}`
    }] : []),
    // Add other random attachments
    ...Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i) => ({
      id: `att-${index}-${i}`,
      name: `Document ${i + 1}.pdf`,
      type: ['image', 'document', 'video', 'other'][Math.floor(Math.random() * 4)] as Attachment['type'],
      size: Math.floor(Math.random() * 5000000) + 100000,
      uploadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      url: '#'
    }))
  ],
  notes: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `note-${index}-${i}`,
    text: `Note ${i + 1} for case ${index + 1}`,
    author: technicians[Math.floor(Math.random() * technicians.length)],
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  })),
  invoice: Math.random() > 0.3 ? {
    invoiceNumber: `INV-${String(2024001 + index).padStart(6, '0')}`,
    kid: `${Math.floor(Math.random() * 900000000) + 100000000}`,
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalAmount: Math.floor(Math.random() * 50000) + 5000,
    fileUrl: `#invoice-${index}`,
    issueDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
    reviewStatus: ['pending_review', 'needs_correction', 'ok'][Math.floor(Math.random() * 3)] as 'pending_review' | 'needs_correction' | 'ok'
  } : undefined,
  chatLog: Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
    id: `msg-${index}-${i}`,
    sender: i % 3 === 0 ? 'System' : (i % 2 === 0 ? technicians[Math.floor(Math.random() * technicians.length)] : 'Insurance Agent'),
    senderType: i % 3 === 0 ? 'system' : (i % 2 === 0 ? 'workshop' : 'agent') as ChatMessage['senderType'],
    message: i % 3 === 0 
      ? `Case status updated to ${['New', 'In Progress', 'Ready'][Math.floor(Math.random() * 3)]}`
      : `Message ${i + 1} for case ${index + 1}. This is a sample communication message between the workshop and insurance agent.`,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: Math.random() > 0.8 ? [{
      id: `att-msg-${index}-${i}`,
      name: `attachment-${i}.pdf`,
      url: '#',
      type: 'document'
    }] : undefined
  })).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
  actionLog: [
    {
      id: `action-${index}-1`,
      actionType: 'case_created' as const,
      actor: 'System',
      actorType: 'system' as const,
      description: `Case ${String(2024001 + index).padStart(6, '0')} created`,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: { caseNumber: `BS${String(2024001 + index).padStart(6, '0')}` }
    },
    // Add DDF upload action for cases with complete DDF (first 16 cases = 80%)
    ...(index < 16 ? [{
      id: `action-${index}-2`,
      actionType: 'file_uploaded' as const,
      actor: 'Workshop User',
      actorType: 'workshop' as const,
      description: 'DDF file uploaded',
      timestamp: new Date(Date.now() - Math.random() * 25 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: { fileName: `DDF_BS${String(2024001 + index).padStart(6, '0')}.pdf` }
    }] : []),
    ...(Math.random() > 0.5 ? [{
      id: `action-${index}-3`,
      actionType: 'image_uploaded' as const,
      actor: 'Workshop User',
      actorType: 'workshop' as const,
      description: 'Images uploaded',
      timestamp: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: { count: Math.floor(Math.random() * 3) + 1 }
    }] : [])
  ],
  isChatLogEnabled: false,
  assessment: {
    damageDescription: `Assessment for case ${index + 1}`,
    recommendedAction: ['Full Replacement', 'Repair', 'Further Inspection'][Math.floor(Math.random() * 3)],
    estimatedCost: Math.floor(Math.random() * 5000) + 1000,
    assessedBy: technicians[Math.floor(Math.random() * technicians.length)],
    assessmentDate: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    // 80% of cases (16 out of 20) should have complete DDF
    ddfStatus: (index < 16) ? 'complete' : (['non-existent', 'partially-done'][Math.floor(Math.random() * 2)]) as Assessment['ddfStatus'],
    // All cases must have a damage date
    damageDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    // Complete DDF cases have all metadata
    glassType: (index < 16) ? glassTypes[Math.floor(Math.random() * glassTypes.length)] : undefined,
    location: (index < 16) ? locations[Math.floor(Math.random() * locations.length)] : undefined,
    wearLevel: (index < 16) ? wearLevels[Math.floor(Math.random() * wearLevels.length)] : undefined,
    damageType: (index < 16) ? damageTypes[Math.floor(Math.random() * damageTypes.length)] : undefined,
    causeOfDamage: (index < 16) ? causeOfDamageOptions[Math.floor(Math.random() * causeOfDamageOptions.length)] : undefined,
    wearAndTear: (index < 16) ? wearAndTearOptions[Math.floor(Math.random() * wearAndTearOptions.length)] : undefined,
    place: (index < 16) ? ['Highway', 'At home', 'Parking lot', 'City center'][Math.floor(Math.random() * 4)] : undefined,
    claimId: (index < 16) ? `CLM-${Date.now()}-${Math.floor(Math.random() * 1000)}` : undefined
  },
  calibration: Math.random() > 0.5 ? {
    required: false,
    notNeeded: false,
  } : undefined,
  insuranceCoverage: generateInsuranceCoverage(index),
  imagesNotNeeded: false,
  imagesNotNeededComment: '',
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString()
})).map(caseItem => ({
  ...caseItem,
  partsAndLabor: {
    ...caseItem.partsAndLabor,
    totalParts: caseItem.partsAndLabor.items
      .filter((item): item is PartItem => item.type === 'part')
      .reduce((sum, part) => sum + part.total, 0),
    totalLabor: caseItem.partsAndLabor.items
      .filter((item): item is LaborItem => item.type === 'labor')
      .reduce((sum, labor) => sum + labor.total, 0),
  }
})).map(caseItem => ({
  ...caseItem,
  partsAndLabor: {
    ...caseItem.partsAndLabor,
    grandTotal: caseItem.partsAndLabor.totalParts + caseItem.partsAndLabor.totalLabor
  }
})).map(caseItem => {
  // Set stage based on status
  if (caseItem.status === 'New') {
    caseItem.stage = 'draft';
  } else if (['In Progress', 'Waiting Parts', 'Ready'].includes(caseItem.status)) {
    caseItem.stage = 'in_progress';
    // Add repair finished date for some approved cases (simulating work in progress)
    if (Math.random() > 0.7) {
      caseItem.service.repairFinishedDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
  } else if (['Completed', 'Cancelled'].includes(caseItem.status)) {
    caseItem.stage = 'finished';
    caseItem.service.repairFinishedDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  }
  
  return caseItem;
}).map(ensureCompletedCaseHasDocuments); // Ensure completed cases have all documents

// Combine comprehensive cases (showcasing all variants) with random cases
const mockCases: WorkshopCase[] = [...comprehensiveMockCases, ...randomMockCases];

export const getCases = () => mockCases;

export const getCaseById = (id: string) => {
  return mockCases.find(c => c.id === id) || null;
};

export const getCaseByLicensePlate = (licensePlate: string) => {
  return mockCases.find(c => c.vehicle.licensePlate.toUpperCase() === licensePlate.toUpperCase()) || null;
};

export const getRandomCaseId = () => {
  const cases = getCases();
  if (cases.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * cases.length);
  return cases[randomIndex].id;
};

export const updateCase = (id: string, updatedCase: Partial<WorkshopCase>) => {
  const index = mockCases.findIndex(c => c.id === id);
  if (index !== -1) {
    const oldCase = { ...mockCases[index] };

    mockCases[index] = {
      ...mockCases[index],
      ...updatedCase,
      updatedAt: new Date().toISOString()
    };

    if (updatedCase.status && updatedCase.status !== oldCase.status) {
      addActionLog(
        id,
        'status_changed',
        'System',
        'system',
        `Status changed from ${oldCase.status} to ${updatedCase.status}`,
        { from: oldCase.status, to: updatedCase.status }
      );
    }

    if (updatedCase.stage && updatedCase.stage !== oldCase.stage) {
      addActionLog(
        id,
        'stage_changed',
        'System',
        'system',
        `Stage changed from ${oldCase.stage} to ${updatedCase.stage}`,
        { from: oldCase.stage, to: updatedCase.stage }
      );
    }

    if (updatedCase.partsAndLabor && updatedCase.partsAndLabor.items.length > oldCase.partsAndLabor.items.length) {
      addActionLog(
        id,
        'parts_added',
        'Workshop User',
        'workshop',
        'Parts or labor items added',
        { count: updatedCase.partsAndLabor.items.length - oldCase.partsAndLabor.items.length }
      );
    }

    if (updatedCase.calibration && JSON.stringify(updatedCase.calibration) !== JSON.stringify(oldCase.calibration)) {
      addActionLog(
        id,
        'calibration_updated',
        'Workshop User',
        'workshop',
        'Calibration information updated'
      );
    }

    if (updatedCase.insuranceCoverage && JSON.stringify(updatedCase.insuranceCoverage) !== JSON.stringify(oldCase.insuranceCoverage)) {
      addActionLog(
        id,
        'insurance_updated',
        'Workshop User',
        'workshop',
        'Insurance coverage information updated'
      );
    }

    if (updatedCase.damageImages && updatedCase.damageImages.length > oldCase.damageImages.length) {
      addActionLog(
        id,
        'image_uploaded',
        'Workshop User',
        'workshop',
        'Images uploaded',
        { count: updatedCase.damageImages.length - oldCase.damageImages.length }
      );
    }

    if (updatedCase.status === 'Completed') {
      mockCases[index] = ensureCompletedCaseHasDocuments(mockCases[index]);
    }

    return mockCases[index];
  }
  return null;
};

export const deleteCase = (id: string, reason?: string) => {
  const index = mockCases.findIndex(c => c.id === id);
  if (index !== -1) {
    console.log('[mockData] Deleting case:', id, 'Reason:', reason);
    mockCases.splice(index, 1);
    return true;
  }
  return false;
};

export const addChatMessage = (caseId: string, message: string, sender: string, senderType: ChatMessage['senderType']) => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      senderType,
      message,
      timestamp: new Date().toISOString()
    };
    mockCases[caseIndex].chatLog.push(newMessage);
    mockCases[caseIndex].updatedAt = new Date().toISOString();
    return newMessage;
  }
  return null;
};

// Helper functions for status checking
export const hasDdfComplete = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;
  
  // DDF is only complete if both status is 'complete' AND there's a corresponding file
  const hasCompleteStatus = caseItem.assessment?.ddfStatus === 'complete';
  const hasDdfFile = caseItem.attachments.some(att => 
    att.type === 'document' && att.name.toLowerCase().includes('ddf')
  );
  
  return hasCompleteStatus && hasDdfFile;
};

export const hasImagesAvailable = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;

  // Images are considered complete if all three required images are present OR images are marked as not needed with a comment
  const hasRequiredImages = !!(caseItem.requiredImages?.vehicleOverview &&
                               caseItem.requiredImages?.glassCloseUp &&
                               caseItem.requiredImages?.damageDetail);
  const imagesNotNeeded = caseItem.imagesNotNeeded && caseItem.imagesNotNeededComment && caseItem.imagesNotNeededComment.trim() !== '';

  return hasRequiredImages || imagesNotNeeded;
};

// Updated to check only for invoice existence, not payment status
export const hasInvoicePresent = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;
  
  return !!caseItem.invoice;
};

export const hasAllDocuments = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;
  
  return hasDdfComplete(caseItem) && hasImagesAvailable(caseItem) && hasInvoicePresent(caseItem);
};

export const hasPartsAndLaborComplete = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;
  
  const hasParts = caseItem.partsAndLabor.items.some(item => item.type === 'part');
  const hasLabor = caseItem.partsAndLabor.items.some(item => item.type === 'labor');
  return hasParts && hasLabor;
};

export const hasCalibrationComplete = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;

  if (caseItem.calibration?.notNeeded) return true;

  if (caseItem.calibration?.required) {
    const hasSignature = caseItem.calibration?.signature && caseItem.calibration.signature.trim() !== '';
    const hasFiles = caseItem.calibration?.files && caseItem.calibration.files.length > 0;
    return hasSignature && hasFiles;
  }

  return false;
};

export const getInsuranceCoverageStatus = (caseItem: WorkshopCase | null | undefined): 'approved' | 'not_approved' | 'undefined' | 'not_fetched' => {
  if (!caseItem || !caseItem.insuranceCoverage?.dataFetched) {
    return 'not_fetched';
  }

  return caseItem.insuranceCoverage?.status || 'undefined';
};

export const hasInsuranceCoverageComplete = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;

  return !!(caseItem.insuranceCoverage?.dataFetched &&
            caseItem.insuranceCoverage?.exists &&
            caseItem.insuranceCoverage?.status === 'approved');
};

export const hasChatActivity = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;

  return caseItem.chatLog && caseItem.chatLog.length > 0;
};

export const hasActionLogActivity = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;

  return caseItem.actionLog && caseItem.actionLog.length > 0;
};

export const hasNewLogMessages = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem || !caseItem.actionLog || caseItem.actionLog.length === 0) return false;

  const lastViewedAt = caseItem.lastLogViewedAt ? new Date(caseItem.lastLogViewedAt) : null;

  const newMessages = caseItem.actionLog.filter(entry => {
    if (entry.actorType === 'workshop') return false;

    const messageTimestamp = new Date(entry.timestamp);

    if (!lastViewedAt) return true;

    return messageTimestamp > lastViewedAt;
  });

  return newMessages.length > 0;
};

// Helper functions to calculate section approval status
export const getDdfApprovalStatus = (caseItem: WorkshopCase | null | undefined): SectionApprovalStatus => {
  if (!caseItem) return 'incomplete';
  if (caseItem.ddfApprovalStatus === 'approved') return 'approved';

  const hasDdfFile = caseItem.attachments.some(att =>
    att.type === 'document' && att.name.toLowerCase().includes('ddf')
  );

  return hasDdfFile ? 'ready_for_approval' : 'incomplete';
};

export const getImagesApprovalStatus = (caseItem: WorkshopCase | null | undefined): SectionApprovalStatus => {
  if (!caseItem) return 'incomplete';
  if (caseItem.imagesApprovalStatus === 'approved') return 'approved';

  return hasImagesAvailable(caseItem) ? 'ready_for_approval' : 'incomplete';
};

export const getPartsLaborApprovalStatus = (caseItem: WorkshopCase | null | undefined): SectionApprovalStatus => {
  if (!caseItem) return 'incomplete';
  if (caseItem.partsLaborApprovalStatus === 'approved') return 'approved';

  return hasPartsAndLaborComplete(caseItem) ? 'ready_for_approval' : 'incomplete';
};

export const getCalibrationApprovalStatus = (caseItem: WorkshopCase | null | undefined): SectionApprovalStatus => {
  if (!caseItem) return 'incomplete';
  if (caseItem.calibrationApprovalStatus === 'approved') return 'approved';

  return hasCalibrationComplete(caseItem) ? 'ready_for_approval' : 'incomplete';
};

export const getInvoiceApprovalStatus = (caseItem: WorkshopCase | null | undefined): SectionApprovalStatus => {
  if (!caseItem) return 'incomplete';
  if (caseItem.invoiceApprovalStatus === 'approved') return 'approved';

  return hasInvoicePresent(caseItem) ? 'ready_for_approval' : 'incomplete';
};

export const getInsuranceApprovalStatus = (caseItem: WorkshopCase | null | undefined): SectionApprovalStatus => {
  if (!caseItem) return 'incomplete';
  if (caseItem.insuranceApprovalStatus === 'approved') return 'approved';

  const hasData = caseItem.insuranceCoverage?.dataFetched && caseItem.insuranceCoverage?.exists;
  return hasData ? 'ready_for_approval' : 'incomplete';
};

// New validation functions for stage transitions
export const isCaseReadyForInProgress = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;
  
  const ddfComplete = hasDdfComplete(caseItem);
  const imagesComplete = hasImagesAvailable(caseItem);
  const partsLaborComplete = hasPartsAndLaborComplete(caseItem);
  const insuranceCoverageComplete = hasInsuranceCoverageComplete(caseItem);
  
  return ddfComplete && imagesComplete && partsLaborComplete && insuranceCoverageComplete;
};

export const isCaseReadyForCompletion = (caseItem: WorkshopCase | null | undefined): boolean => {
  if (!caseItem) return false;
  
  const ddfComplete = hasDdfComplete(caseItem);
  const imagesComplete = hasImagesAvailable(caseItem);
  const partsLaborComplete = hasPartsAndLaborComplete(caseItem);
  const invoiceComplete = hasInvoicePresent(caseItem);
  const calibrationComplete = hasCalibrationComplete(caseItem);
  const hasRepairFinishedDate = !!caseItem.service.repairFinishedDate;
  
  return ddfComplete && imagesComplete && partsLaborComplete && invoiceComplete && calibrationComplete && hasRepairFinishedDate;
};

export const getMissingRequirementsForInProgress = (caseItem: WorkshopCase | null | undefined): string[] => {
  if (!caseItem) return ['Case data not available'];
  
  const missing: string[] = [];
  
  if (!hasDdfComplete(caseItem)) {
    missing.push('Digital Damage Form (DDF) must be completed');
  }
  
  if (!hasImagesAvailable(caseItem)) {
    missing.push('Images must be uploaded (minimum 4) or marked as not needed with reason');
  }
  
  if (!hasPartsAndLaborComplete(caseItem)) {
    missing.push('Parts and Labor details must be completed');
  }
  
  if (!hasInsuranceCoverageComplete(caseItem)) {
    const coverageStatus = getInsuranceCoverageStatus(caseItem);
    if (coverageStatus === 'not_fetched') {
      missing.push('Insurance coverage must be verified and fetched');
    } else if (coverageStatus === 'not_approved') {
      missing.push('Insurance coverage must be approved (currently: Not Approved)');
    } else if (coverageStatus === 'undefined') {
      missing.push('Insurance coverage status must be set to approved (currently: Undefined)');
    }
  }
  
  return missing;
};

export const getMissingRequirementsForCompletion = (caseItem: WorkshopCase | null | undefined): string[] => {
  if (!caseItem) return ['Case data not available'];
  
  const missing: string[] = [];
  
  if (!hasDdfComplete(caseItem)) {
    missing.push('Digital Damage Form (DDF) must be completed');
  }
  
  if (!hasImagesAvailable(caseItem)) {
    missing.push('Images must be uploaded (minimum 4) or marked as not needed with reason');
  }
  
  if (!hasPartsAndLaborComplete(caseItem)) {
    missing.push('Parts and Labor details must be completed');
  }
  
  if (!hasInvoicePresent(caseItem)) {
    missing.push('Invoice must be generated');
  }
  
  if (!isInvoiceReviewedAndOK(caseItem)) {
    missing.push('Invoice must be reviewed and approved');
  }
  
  if (!hasCalibrationComplete(caseItem)) {
    missing.push('Calibration must be completed or marked as not needed');
  }
  
  if (!caseItem.service.repairFinishedDate) {
    missing.push('Repair finished date must be set');
  }
  
  return missing;
};

// KPI calculation functions
const calculateAverageClaimsProcessTime = (): number => {
  const completedCases = mockCases.filter(c => 
    (c.status === 'Completed' || c.status === 'Cancelled') && 
    c.service.startDate && 
    c.service.completionDate
  );
  
  if (completedCases.length === 0) return 0;
  
  const totalDays = completedCases.reduce((sum, caseItem) => {
    const startDate = new Date(caseItem.service.startDate!);
    const completionDate = new Date(caseItem.service.completionDate!);
    const diffInDays = Math.ceil((completionDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return sum + diffInDays;
  }, 0);
  
  return Math.round(totalDays / completedCases.length * 10) / 10; // Round to 1 decimal place
};

const calculateApprovedClaimsLast30Days = (): number => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  
  return mockCases.filter(c => 
    c.status === 'Completed' && 
    new Date(c.updatedAt) >= thirtyDaysAgo
  ).length;
};

const calculateClaimRejectionRate = (): number => {
  const totalCases = mockCases.length;
  const rejectedCases = mockCases.filter(c => c.status === 'Cancelled').length;
  
  if (totalCases === 0) return 0;
  
  return Math.round((rejectedCases / totalCases) * 100 * 10) / 10; // Round to 1 decimal place
};

const calculateAverageImagesPerCase = (): number => {
  if (mockCases.length === 0) return 0;
  
  const totalImages = mockCases.reduce((sum, caseItem) => {
    return sum + (caseItem.damageImages?.length || 0);
  }, 0);
  
  return Math.round((totalImages / mockCases.length) * 10) / 10; // Round to 1 decimal place
};

export const kpiData = {
  activeJobs: mockCases.filter(c => !['Completed', 'Cancelled'].includes(c.status)).length,
  averageClaimsProcessTime: calculateAverageClaimsProcessTime(),
  approvedClaimsLast30Days: calculateApprovedClaimsLast30Days(),
  claimRejectionRate: calculateClaimRejectionRate(),
  averageImagesPerCase: calculateAverageImagesPerCase(),
  laborUtilization: 75
};

// Stage-specific case retrieval functions
export const getDraftCases = () => {
  return mockCases.filter(c => c.stage === 'draft');
};

export const getInProgressCases = () => {
  return mockCases.filter(c => c.stage === 'in_progress');
};

export const getFinishedCases = () => {
  return mockCases.filter(c => c.stage === 'finished');
};

// Awaiting Invoice cases - cases in in_progress stage with invoice review status pending or needs correction
export const getAwaitingInvoiceCases = () => {
  return mockCases.filter(c => 
    c.stage === 'in_progress' && 
    c.invoice && 
    (c.invoice.reviewStatus === 'pending_review' || c.invoice.reviewStatus === 'needs_correction')
  );
};

// On Hold cases - cases with status 'Waiting Parts'
export const getOnHoldCases = () => {
  return mockCases.filter(c => c.status === 'Waiting Parts');
};

// Stage-specific KPI calculations
export const getDraftCasesKPIs = () => {
  const draftCases = getDraftCases();
  const totalDraft = draftCases.length;
  
  // Calculate cases missing critical data
  const missingDdf = draftCases.filter(c => !hasDdfComplete(c)).length;
  const missingImages = draftCases.filter(c => !hasImagesAvailable(c)).length;
  const missingPartsLabor = draftCases.filter(c => !hasPartsAndLaborComplete(c)).length;
  
  // Calculate average age of draft cases
  const now = new Date();
  const averageAge = draftCases.length > 0 
    ? draftCases.reduce((sum, c) => {
        const created = new Date(c.createdAt);
        const ageInDays = Math.ceil((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
        return sum + ageInDays;
      }, 0) / draftCases.length
    : 0;

  // Cases ready for approval
  const readyForApproval = draftCases.filter(c => isCaseReadyForInProgress(c)).length;

  return {
    totalDraft,
    missingDdf,
    missingImages,
    missingPartsLabor,
    averageAge: Math.round(averageAge * 10) / 10,
    readyForApproval,
    completionRate: totalDraft > 0 ? Math.round((readyForApproval / totalDraft) * 100) : 0
  };
};

export const getInProgressCasesKPIs = () => {
  const inProgressCases = getInProgressCases();
  const totalInProgress = inProgressCases.length;
  
  // Calculate cases with repair finished date
  const withRepairDate = inProgressCases.filter(c => c.service.repairFinishedDate).length;
  
  // Calculate average time in approved stage
  const now = new Date();
  const averageTimeInStage = inProgressCases.length > 0
    ? inProgressCases.reduce((sum, c) => {
        const updated = new Date(c.updatedAt);
        const timeInDays = Math.ceil((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
        return sum + timeInDays;
      }, 0) / inProgressCases.length
    : 0;

  // Cases ready for completion
  const readyForCompletion = inProgressCases.filter(c => {
    const updatedCase = { ...c, service: { ...c.service, repairFinishedDate: c.service.repairFinishedDate || new Date().toISOString().split('T')[0] } };
    return isCaseReadyForCompletion(updatedCase);
  }).length;

  // Active work in progress
  const activeWork = inProgressCases.filter(c => c.status === 'In Progress').length;

  return {
    totalInProgress,
    withRepairDate,
    averageTimeInStage: Math.round(averageTimeInStage * 10) / 10,
    readyForCompletion,
    activeWork,
    repairCompletionRate: totalInProgress > 0 ? Math.round((withRepairDate / totalInProgress) * 100) : 0
  };
};

export const getAwaitingInvoiceCasesKPIs = () => {
  const awaitingInvoiceCases = getAwaitingInvoiceCases();
  const totalAwaiting = awaitingInvoiceCases.length;
  
  // Calculate cases by review status
  const pendingReview = awaitingInvoiceCases.filter(c => c.invoice?.reviewStatus === 'pending_review').length;
  const needsCorrection = awaitingInvoiceCases.filter(c => c.invoice?.reviewStatus === 'needs_correction').length;
  
  // Calculate average wait time (time since invoice was uploaded)
  const now = new Date();
  const averageWaitTime = awaitingInvoiceCases.length > 0
    ? awaitingInvoiceCases.reduce((sum, c) => {
        if (c.invoice?.issueDate) {
          const issueDate = new Date(c.invoice.issueDate);
          const waitTimeInDays = Math.ceil((now.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));
          return sum + waitTimeInDays;
        }
        return sum;
      }, 0) / awaitingInvoiceCases.length
    : 0;

  return {
    totalAwaiting,
    pendingReview,
    needsCorrection,
    averageWaitTime: Math.round(averageWaitTime * 10) / 10
  };
};

export const getOnHoldCasesKPIs = () => {
  const onHoldCases = getOnHoldCases();
  const totalOnHold = onHoldCases.length;
  
  // All on hold cases are waiting for parts by definition
  const waitingForParts = totalOnHold;
  
  // Calculate average time on hold
  const now = new Date();
  const averageHoldTime = onHoldCases.length > 0
    ? onHoldCases.reduce((sum, c) => {
        const updated = new Date(c.updatedAt);
        const holdTimeInDays = Math.ceil((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
        return sum + holdTimeInDays;
      }, 0) / onHoldCases.length
    : 0;

  // Calculate longest time on hold
  const longestOnHold = onHoldCases.length > 0
    ? Math.max(...onHoldCases.map(c => {
        const updated = new Date(c.updatedAt);
        return Math.ceil((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
      }))
    : 0;

  return {
    totalOnHold,
    waitingForParts,
    averageHoldTime: Math.round(averageHoldTime * 10) / 10,
    longestOnHold
  };
};

export const getFinishedCasesKPIs = () => {
  const finishedCases = getFinishedCases();
  const totalFinished = finishedCases.length;
  
  // Calculate cases finished in last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const finishedLast30Days = finishedCases.filter(c => 
    c.service.completionDate && new Date(c.service.completionDate) >= thirtyDaysAgo
  ).length;

  // Calculate average completion time
  const casesWithBothDates = finishedCases.filter(c => 
    c.service.startDate && c.service.completionDate
  );
  
  const averageCompletionTime = casesWithBothDates.length > 0
    ? casesWithBothDates.reduce((sum, c) => {
        const start = new Date(c.service.startDate!);
        const completion = new Date(c.service.completionDate!);
        const diffInDays = Math.ceil((completion.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return sum + diffInDays;
      }, 0) / casesWithBothDates.length
    : 0;

  // Calculate total revenue from finished cases
  const totalRevenue = finishedCases.reduce((sum, c) => {
    return sum + (c.partsAndLabor.totalParts + c.partsAndLabor.totalLabor);
  }, 0);

  // Calculate customer satisfaction (mock data)
  const customerSatisfaction = 94.5; // This would come from actual customer feedback

  return {
    totalFinished,
    finishedLast30Days,
    averageCompletionTime: Math.round(averageCompletionTime * 10) / 10,
    totalRevenue,
    customerSatisfaction
  };
};

// Helper functions for case display
export const shortenServiceType = (serviceType: string | undefined): string => {
  if (!serviceType) return 'N/A';
  return serviceType
    .replace(/\s+(Replacement|Repair)$/i, '')
    .trim() || 'N/A';
};

export const calculateCaseProgress = (caseItem: WorkshopCase) => {
  const requirements = [
    hasDdfComplete(caseItem),
    hasImagesAvailable(caseItem),
    hasPartsAndLaborComplete(caseItem),
    hasInsuranceCoverageComplete(caseItem),
    hasCalibrationComplete(caseItem),
    isInvoiceReviewedAndOK(caseItem)
  ];
  
  const completed = requirements.filter(Boolean).length;
  const total = requirements.length;
  
  return { completed, total };
};

export const addActionLog = (
  caseId: string,
  actionType: ActionLogEntry['actionType'],
  actor: string,
  actorType: ActionLogEntry['actorType'],
  description: string,
  metadata?: Record<string, any>
): ActionLogEntry | null => {
  const caseIndex = mockCases.findIndex(c => c.id === caseId);
  if (caseIndex === -1) return null;

  const newEntry: ActionLogEntry = {
    id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    actionType,
    actor,
    actorType,
    description,
    timestamp: new Date().toISOString(),
    metadata
  };

  mockCases[caseIndex].actionLog.push(newEntry);
  return newEntry;
};

// Helper function to add DDF SMS log entry
export const addDdfSmsLog = (caseId: string, phoneNumber: string) => {
  return addActionLog(
    caseId,
    'sms_sent',
    'Workshop User',
    'workshop',
    `DDF link sent via SMS to ${phoneNumber}`,
    { phoneNumber }
  );
};