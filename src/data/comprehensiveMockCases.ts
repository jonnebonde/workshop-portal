/**
 * Comprehensive Mock Cases - All Status Variants
 *
 * This file contains carefully crafted mock cases that demonstrate EVERY possible
 * status combination across all sections. Each case's data is internally consistent
 * with its status icons.
 */

import type {
  WorkshopCase,
  RequiredImages,
  CaseImage,
  Assessment,
  InsuranceCoverage,
  Invoice,
  Calibration,
  PartsAndLabor,
  PartItem,
  LaborItem,
  Attachment,
  ChatMessage,
  ActionLogEntry,
  Note,
  Owner
} from './mockData';

// Pexels stock photo URLs
const vehicleImages = [
  'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const glassImages = [
  'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const damageImages = [
  'https://images.pexels.com/photos/5733150/pexels-photo-5733150.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4489740/pexels-photo-4489740.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const repairImages = [
  'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4489736/pexels-photo-4489736.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const afterRepairImages = [
  'https://images.pexels.com/photos/3972890/pexels-photo-3972890.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=800'
];

// Helper function to create complete required images
const createCompleteRequiredImages = (index: number): RequiredImages => ({
  vehicleOverview: {
    id: `vehicle-overview-${index}`,
    url: vehicleImages[index % vehicleImages.length],
    caption: 'Vehicle Overview',
    uploadedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
    fileName: 'vehicle_overview.jpg',
    fileType: 'image/jpeg',
    fileSize: 1250000
  },
  glassCloseUp: {
    id: `glass-closeup-${index}`,
    url: glassImages[index % glassImages.length],
    caption: 'Glass Close-up',
    uploadedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
    fileName: 'glass_closeup.jpg',
    fileType: 'image/jpeg',
    fileSize: 1350000
  },
  damageDetail: {
    id: `damage-detail-${index}`,
    url: damageImages[index % damageImages.length],
    caption: 'Damage Detail',
    uploadedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
    fileName: 'damage_detail.jpg',
    fileType: 'image/jpeg',
    fileSize: 1450000
  }
});

// Helper function to create complete DDF assessment with attachment
const createCompleteDdf = (index: number, caseNumber: string): { assessment: Assessment, attachment: Attachment } => ({
  assessment: {
    damageDescription: `Complete assessment for case ${caseNumber}`,
    recommendedAction: 'Full Replacement',
    estimatedCost: 8500,
    assessedBy: 'John Smith',
    assessmentDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
    ddfStatus: 'complete',
    damageDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    glassType: 'windshield',
    location: 'Oslo',
    wearLevel: 'little',
    damageType: 'stone',
    causeOfDamage: 'Stonechip',
    wearAndTear: 'Little',
    place: 'Highway',
    claimId: `CLM-${Date.now()}-${index}`
  },
  attachment: {
    id: `ddf-${index}`,
    name: `DDF_${caseNumber}.pdf`,
    type: 'document',
    size: 1024000,
    uploadedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
    url: `#ddf-${index}`
  }
});

// Helper function to create complete parts and labor
const createCompletePartsAndLabor = (index: number): PartsAndLabor => {
  const part: PartItem = {
    id: `part-${index}-1`,
    type: 'part',
    category: 'Glass',
    articleNr: 'ART12345',
    quantity: 1,
    price: 5000,
    discount: 0,
    status: 'In Stock',
    total: 5000
  };

  const labor: LaborItem = {
    id: `labor-${index}-1`,
    type: 'labor',
    description: 'Installation',
    hours: 3,
    ratePerHour: 950,
    total: 2850
  };

  return {
    items: [part, labor],
    totalParts: 5000,
    totalLabor: 2850,
    grandTotal: 7850
  };
};

// Helper function to create complete calibration
const createCompleteCalibration = (index: number): Calibration => ({
  required: true,
  signature: 'John Smith',
  notes: 'Calibration completed successfully',
  files: [{
    id: `cal-file-${index}`,
    name: 'calibration_report.pdf',
    type: 'document',
    size: 512000,
    uploadedAt: new Date().toISOString(),
    url: '#calibration'
  }]
});

export const comprehensiveMockCases: WorkshopCase[] = [
  // CASE 1: ALL COMPLETE - Everything is green
  {
    id: 'case-all-complete',
    caseNumber: 'BS2024001',
    stage: 'in_progress',
    status: 'In Progress',
    priority: 'Medium',
    insuranceCompany: 'Nordlys Forsikring',
    workshopName: 'Knekt & Knust Bilglass Oslo',
    customer: {
      name: 'Complete Customer',
      email: 'complete@example.com',
      phone: '+47 123 45 678'
    },
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      vin: 'JT2BG22K0X0123456',
      licensePlate: 'AB12345',
      color: 'Black'
    },
    service: {
      type: 'Windshield Replacement',
      description: 'Complete windshield replacement with all documentation',
      startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 3,
      technician: 'John Smith',
      repairFinishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    owner: {
      type: 'private',
      name: 'Complete Owner',
      ownershipDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Complete Street 1',
      postalCode: '0123',
      city: 'Oslo'
    },
    requiredImages: createCompleteRequiredImages(1),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(1),
    attachments: [createCompleteDdf(1, 'BS2024001').attachment],
    notes: [],
    assessment: createCompleteDdf(1, 'BS2024001').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 15000,
      policyNumber: 'POL-2024-001',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fetchedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    invoice: {
      invoiceNumber: 'INV-2024001',
      kid: '123456789',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 7850,
      fileUrl: '#invoice-1',
      issueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'ok'
    },
    calibration: createCompleteCalibration(1),
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    invoiceApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-1-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024001 created',
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 2: ALL INCOMPLETE - Everything is yellow
  {
    id: 'case-all-incomplete',
    caseNumber: 'BS2024002',
    stage: 'draft',
    status: 'New',
    priority: 'Low',
    insuranceCompany: 'FjordTrygg',
    workshopName: 'Smash\'n\'Fix Trondheim',
    customer: {
      name: 'Incomplete Customer',
      email: 'incomplete@example.com',
      phone: '+47 987 65 432'
    },
    vehicle: {
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      vin: 'JH4DC4340PS123456',
      licensePlate: 'CD56789',
      color: 'White'
    },
    service: {
      type: 'Windshield Repair',
      description: 'New case with no data entered yet',
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 2,
      technician: 'Sarah Johnson'
    },
    owner: {
      type: 'private',
      name: 'Incomplete Owner',
      ownershipDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Incomplete Street 2',
      postalCode: '0456',
      city: 'Bergen'
    },
    // NO required images
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    // NO parts or labor
    partsAndLabor: {
      items: [],
      totalParts: 0,
      totalLabor: 0,
      grandTotal: 0
    },
    // NO DDF attachment
    attachments: [],
    notes: [],
    assessment: {
      damageDescription: '',
      recommendedAction: '',
      estimatedCost: 0,
      assessedBy: '',
      assessmentDate: new Date().toISOString(),
      ddfStatus: 'non-existent'
    },
    // Insurance not fetched
    insuranceCoverage: {
      exists: false,
      policyType: 'private',
      vatLiable: false,
      deductible: 0,
      dataFetched: false
    },
    // NO invoice
    calibration: {
      required: true
      // No signature or files - incomplete
    },
    chatLog: [],
    actionLog: [{
      id: 'action-2-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024002 created',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 3: INSURANCE NOT APPROVED - Red insurance icon
  {
    id: 'case-insurance-not-approved',
    caseNumber: 'BS2024003',
    stage: 'draft',
    status: 'New',
    priority: 'High',
    insuranceCompany: 'Viking Trygghet',
    workshopName: 'Glassmester\'n på Hjul Drammen',
    customer: {
      name: 'Rejected Insurance Customer',
      email: 'rejected@example.com',
      phone: '+47 555 12 345'
    },
    vehicle: {
      make: 'BMW',
      model: '3 Series',
      year: 2021,
      vin: 'WBA8A9C59GK123456',
      licensePlate: 'EF11111',
      color: 'Silver'
    },
    service: {
      type: 'Windshield Replacement',
      description: 'Insurance rejected claim',
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 3,
      technician: 'Mike Brown'
    },
    owner: {
      type: 'private',
      name: 'Rejected Owner',
      ownershipDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Rejected Street 3',
      postalCode: '0789',
      city: 'Stavanger'
    },
    requiredImages: createCompleteRequiredImages(3),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(3),
    attachments: [createCompleteDdf(3, 'BS2024003').attachment],
    notes: [],
    assessment: createCompleteDdf(3, 'BS2024003').assessment,
    // Insurance NOT APPROVED - RED ICON
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'not_approved',
      coverageAmount: 0,
      policyNumber: 'POL-2024-003',
      fetchedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    invoice: {
      invoiceNumber: 'INV-2024003',
      kid: '333333333',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 7850,
      fileUrl: '#invoice-3',
      issueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'ok'
    },
    calibration: createCompleteCalibration(3),
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    invoiceApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-3-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024003 created',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 4: INVOICE NEEDS CORRECTION - Red invoice icon
  {
    id: 'case-invoice-needs-correction',
    caseNumber: 'BS2024004',
    stage: 'in_progress',
    status: 'In Progress',
    priority: 'Urgent',
    insuranceCompany: 'Norsk Sjø og Land Forsikring',
    workshopName: 'Rutesprekk Sarpsborg AS',
    customer: {
      name: 'Invoice Correction Customer',
      email: 'correction@example.com',
      phone: '+47 777 88 999'
    },
    vehicle: {
      make: 'Mercedes',
      model: 'C-Class',
      year: 2023,
      vin: 'WDD2050461F123456',
      licensePlate: 'GH22222',
      color: 'Blue'
    },
    service: {
      type: 'Side Window Replacement',
      description: 'Invoice needs corrections',
      startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 2,
      technician: 'Lisa Davis',
      repairFinishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    owner: {
      type: 'company',
      name: 'Correction Company AS',
      ownershipDate: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Correction Street 4',
      postalCode: '1234',
      city: 'Kristiansand'
    },
    requiredImages: createCompleteRequiredImages(4),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(4),
    attachments: [createCompleteDdf(4, 'BS2024004').attachment],
    notes: [],
    assessment: createCompleteDdf(4, 'BS2024004').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'business',
      vatLiable: true,
      deductible: 6000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 20000,
      policyNumber: 'POL-2024-004',
      fetchedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Invoice NEEDS CORRECTION - RED ICON
    invoice: {
      invoiceNumber: 'INV-2024004',
      kid: '444444444',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 7850,
      fileUrl: '#invoice-4',
      issueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'needs_correction'
    },
    calibration: createCompleteCalibration(4),
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-4-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024004 created',
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 5: DDF PARTIALLY DONE - Yellow DDF icon
  {
    id: 'case-ddf-partially-done',
    caseNumber: 'BS2024005',
    stage: 'draft',
    status: 'New',
    priority: 'Medium',
    insuranceCompany: 'By & Bygd Forsikring',
    workshopName: 'Møkkete Rute Skadesenter Alnabru',
    customer: {
      name: 'Partial DDF Customer',
      email: 'partial@example.com',
      phone: '+47 888 99 000'
    },
    vehicle: {
      make: 'Volvo',
      model: 'XC90',
      year: 2022,
      vin: 'YV1CZ59H751123456',
      licensePlate: 'IJ33333',
      color: 'Red'
    },
    service: {
      type: 'Rear Window Replacement',
      description: 'DDF partially completed',
      startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 3,
      technician: 'John Smith'
    },
    owner: {
      type: 'private',
      name: 'Partial Owner',
      ownershipDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Partial Street 5',
      postalCode: '5678',
      city: 'Oslo'
    },
    requiredImages: createCompleteRequiredImages(5),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(5),
    attachments: [createCompleteDdf(5, 'BS2024005').attachment],
    notes: [],
    // DDF PARTIALLY DONE - File exists but status is partially-done
    assessment: {
      damageDescription: 'Partial assessment',
      recommendedAction: 'TBD',
      estimatedCost: 0,
      assessedBy: 'John Smith',
      assessmentDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      ddfStatus: 'partially-done',
      damageDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      // Missing some fields like glassType, location, etc.
    },
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 15000,
      policyNumber: 'POL-2024-005',
      fetchedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    invoice: {
      invoiceNumber: 'INV-2024005',
      kid: '555555555',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 7850,
      fileUrl: '#invoice-5',
      issueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'ok'
    },
    calibration: createCompleteCalibration(5),
    insuranceApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    invoiceApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-5-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024005 created',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 6: IMAGES MARKED NOT NEEDED - Green icon despite no images
  {
    id: 'case-images-not-needed',
    caseNumber: 'BS2024006',
    stage: 'in_progress',
    status: 'In Progress',
    priority: 'Low',
    insuranceCompany: 'SkadePartner AS',
    workshopName: 'Sprekk & Sønn Bilglass Østfold',
    customer: {
      name: 'No Images Customer',
      email: 'noimages@example.com',
      phone: '+47 999 00 111'
    },
    vehicle: {
      make: 'Ford',
      model: 'F-150',
      year: 2021,
      vin: '1FTEW1E89MKK12345',
      licensePlate: 'KL44444',
      color: 'White'
    },
    service: {
      type: 'Windshield Repair',
      description: 'Minor repair, images not needed',
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 1,
      technician: 'Sarah Johnson',
      repairFinishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    owner: {
      type: 'private',
      name: 'No Images Owner',
      ownershipDate: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'No Images Street 6',
      postalCode: '9012',
      city: 'Bergen'
    },
    // NO required images, but marked as not needed
    imagesNotNeeded: true,
    imagesNotNeededComment: 'Minor repair, no significant damage to document',
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(6),
    attachments: [createCompleteDdf(6, 'BS2024006').attachment],
    notes: [],
    assessment: createCompleteDdf(6, 'BS2024006').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 10000,
      policyNumber: 'POL-2024-006',
      fetchedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    invoice: {
      invoiceNumber: 'INV-2024006',
      kid: '666666666',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 7850,
      fileUrl: '#invoice-6',
      issueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'ok'
    },
    calibration: createCompleteCalibration(6),
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    invoiceApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-6-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024006 created',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 7: INSURANCE UNDEFINED STATUS - Yellow icon
  {
    id: 'case-insurance-undefined',
    caseNumber: 'BS2024007',
    stage: 'draft',
    status: 'New',
    priority: 'Medium',
    insuranceCompany: 'Nordlys Forsikring',
    workshopName: 'Steinsprut Spesialisten Helsfyr',
    customer: {
      name: 'Undefined Insurance Customer',
      email: 'undefined@example.com',
      phone: '+47 111 22 333'
    },
    vehicle: {
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      vin: 'JTDKARFU1K3123456',
      licensePlate: 'MN55555',
      color: 'Black'
    },
    service: {
      type: 'Windshield Replacement',
      description: 'Insurance status unclear',
      startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 3,
      technician: 'Mike Brown'
    },
    owner: {
      type: 'private',
      name: 'Undefined Owner',
      ownershipDate: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Undefined Street 7',
      postalCode: '3456',
      city: 'Trondheim'
    },
    requiredImages: createCompleteRequiredImages(7),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(7),
    attachments: [createCompleteDdf(7, 'BS2024007').attachment],
    notes: [],
    assessment: createCompleteDdf(7, 'BS2024007').assessment,
    // Insurance UNDEFINED - YELLOW ICON
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'undefined',
      policyNumber: 'POL-2024-007',
      fetchedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    invoice: {
      invoiceNumber: 'INV-2024007',
      kid: '777777777',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 7850,
      fileUrl: '#invoice-7',
      issueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'ok'
    },
    calibration: createCompleteCalibration(7),
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    invoiceApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-7-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024007 created',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 8: INVOICE PENDING REVIEW - Yellow invoice icon
  {
    id: 'case-invoice-pending',
    caseNumber: 'BS2024008',
    stage: 'in_progress',
    status: 'In Progress',
    priority: 'High',
    insuranceCompany: 'FjordTrygg',
    workshopName: 'Bilplett Bergen',
    customer: {
      name: 'Pending Invoice Customer',
      email: 'pending@example.com',
      phone: '+47 222 33 444'
    },
    vehicle: {
      make: 'Honda',
      model: 'Accord',
      year: 2023,
      vin: '1HGCV1F39MA123456',
      licensePlate: 'OP66666',
      color: 'Silver'
    },
    service: {
      type: 'Side Window Replacement',
      description: 'Invoice uploaded, awaiting review',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 2,
      technician: 'Lisa Davis',
      repairFinishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    owner: {
      type: 'company',
      name: 'Pending Company AS',
      ownershipDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Pending Street 8',
      postalCode: '7890',
      city: 'Stavanger'
    },
    requiredImages: createCompleteRequiredImages(8),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(8),
    attachments: [createCompleteDdf(8, 'BS2024008').attachment],
    notes: [],
    assessment: createCompleteDdf(8, 'BS2024008').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'business',
      vatLiable: true,
      deductible: 6000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 25000,
      policyNumber: 'POL-2024-008',
      fetchedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Invoice PENDING REVIEW - YELLOW ICON
    invoice: {
      invoiceNumber: 'INV-2024008',
      kid: '888888888',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 7850,
      fileUrl: '#invoice-8',
      issueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'pending_review'
    },
    calibration: createCompleteCalibration(8),
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-8-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024008 created',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 9: CALIBRATION REQUIRED BUT INCOMPLETE - Yellow calibration icon
  {
    id: 'case-calibration-incomplete',
    caseNumber: 'BS2024009',
    stage: 'in_progress',
    status: 'In Progress',
    priority: 'Urgent',
    insuranceCompany: 'Viking Trygghet',
    workshopName: 'Knus & Klart Stavanger',
    customer: {
      name: 'Calibration Incomplete Customer',
      email: 'calibration@example.com',
      phone: '+47 333 44 555'
    },
    vehicle: {
      make: 'BMW',
      model: 'X5',
      year: 2023,
      vin: '5UXCR6C09N9L12345',
      licensePlate: 'QR77777',
      color: 'Blue'
    },
    service: {
      type: 'Windshield Replacement',
      description: 'Calibration required but not yet complete',
      startDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 4,
      technician: 'John Smith',
      repairFinishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    owner: {
      type: 'private',
      name: 'Calibration Owner',
      ownershipDate: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Calibration Street 9',
      postalCode: '2345',
      city: 'Kristiansand'
    },
    requiredImages: createCompleteRequiredImages(9),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(9),
    attachments: [createCompleteDdf(9, 'BS2024009').attachment],
    notes: [],
    assessment: createCompleteDdf(9, 'BS2024009').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 18000,
      policyNumber: 'POL-2024-009',
      fetchedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    invoice: {
      invoiceNumber: 'INV-2024009',
      kid: '999999999',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 9500,
      fileUrl: '#invoice-9',
      issueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'ok'
    },
    // Calibration REQUIRED but INCOMPLETE - YELLOW ICON
    calibration: {
      required: true,
      notes: 'Waiting for calibration equipment'
      // No signature or files - incomplete
    },
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    invoiceApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-9-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024009 created',
      timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 10: CALIBRATION NOT NEEDED - Green icon
  {
    id: 'case-calibration-not-needed',
    caseNumber: 'BS2024010',
    stage: 'finished',
    status: 'Completed',
    priority: 'Low',
    insuranceCompany: 'Norsk Sjø og Land Forsikring',
    workshopName: 'TrønderRute Trondheim',
    customer: {
      name: 'No Calibration Customer',
      email: 'nocalibration@example.com',
      phone: '+47 444 55 666'
    },
    vehicle: {
      make: 'Volvo',
      model: 'V60',
      year: 2018,
      vin: 'YV1RS61R3K2123456',
      licensePlate: 'ST88888',
      color: 'Red'
    },
    service: {
      type: 'Side Window Replacement',
      description: 'Side window does not require calibration',
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      completionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 2,
      technician: 'Sarah Johnson',
      repairFinishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    owner: {
      type: 'private',
      name: 'No Calibration Owner',
      ownershipDate: new Date(Date.now() - 600 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'No Calibration Street 10',
      postalCode: '6789',
      city: 'Oslo'
    },
    requiredImages: createCompleteRequiredImages(10),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    partsAndLabor: createCompletePartsAndLabor(10),
    attachments: [createCompleteDdf(10, 'BS2024010').attachment],
    notes: [],
    assessment: createCompleteDdf(10, 'BS2024010').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 12000,
      policyNumber: 'POL-2024-010',
      fetchedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    invoice: {
      invoiceNumber: 'INV-2024010',
      kid: '101010101',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalAmount: 6500,
      fileUrl: '#invoice-10',
      issueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      reviewStatus: 'ok'
    },
    // Calibration NOT NEEDED - GREEN ICON
    calibration: {
      notNeeded: true,
      notes: 'Side window replacement does not require ADAS calibration'
    },
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    partsLaborApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    invoiceApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-10-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024010 created',
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 11: ONLY PARTS, NO LABOR - Yellow parts/labor icon
  {
    id: 'case-only-parts',
    caseNumber: 'BS2024011',
    stage: 'draft',
    status: 'New',
    priority: 'Medium',
    insuranceCompany: 'By & Bygd Forsikring',
    workshopName: 'GlassGuru Kristiansand',
    customer: {
      name: 'Only Parts Customer',
      email: 'onlyparts@example.com',
      phone: '+47 555 66 777'
    },
    vehicle: {
      make: 'Mercedes',
      model: 'E-Class',
      year: 2022,
      vin: 'WDDZF8JB5LA123456',
      licensePlate: 'UV99999',
      color: 'Black'
    },
    service: {
      type: 'Windshield Replacement',
      description: 'Parts ordered, labor not yet added',
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 3,
      technician: 'Mike Brown'
    },
    owner: {
      type: 'company',
      name: 'Only Parts Company AS',
      ownershipDate: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Only Parts Street 11',
      postalCode: '4567',
      city: 'Bergen'
    },
    requiredImages: createCompleteRequiredImages(11),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    // ONLY PARTS, NO LABOR - YELLOW ICON
    partsAndLabor: {
      items: [{
        id: 'part-11-1',
        type: 'part',
        category: 'Glass',
        articleNr: 'ART67890',
        quantity: 1,
        price: 6000,
        discount: 0,
        status: 'Ordered',
        total: 6000
      }],
      totalParts: 6000,
      totalLabor: 0,
      grandTotal: 6000
    },
    attachments: [createCompleteDdf(11, 'BS2024011').attachment],
    notes: [],
    assessment: createCompleteDdf(11, 'BS2024011').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'business',
      vatLiable: true,
      deductible: 6000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 20000,
      policyNumber: 'POL-2024-011',
      fetchedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    calibration: {
      notNeeded: true
    },
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-11-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024011 created',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // CASE 12: ONLY LABOR, NO PARTS - Yellow parts/labor icon
  {
    id: 'case-only-labor',
    caseNumber: 'BS2024012',
    stage: 'draft',
    status: 'New',
    priority: 'Low',
    insuranceCompany: 'SkadePartner AS',
    workshopName: 'Lynet Bilglass Tromsø',
    customer: {
      name: 'Only Labor Customer',
      email: 'onlylabor@example.com',
      phone: '+47 666 77 888'
    },
    vehicle: {
      make: 'Ford',
      model: 'Focus',
      year: 2021,
      vin: '1FADP3K28FL123456',
      licensePlate: 'WX10101',
      color: 'White'
    },
    service: {
      type: 'Windshield Repair',
      description: 'Labor added, parts not yet specified',
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: 1,
      technician: 'Lisa Davis'
    },
    owner: {
      type: 'private',
      name: 'Only Labor Owner',
      ownershipDate: new Date(Date.now() - 350 * 24 * 60 * 60 * 1000).toISOString(),
      address: 'Only Labor Street 12',
      postalCode: '8901',
      city: 'Stavanger'
    },
    requiredImages: createCompleteRequiredImages(12),
    damageImages: [],
    repairImages: [],
    afterRepairImages: [],
    // ONLY LABOR, NO PARTS - YELLOW ICON
    partsAndLabor: {
      items: [{
        id: 'labor-12-1',
        type: 'labor',
        description: 'Repair work',
        hours: 2,
        ratePerHour: 950,
        total: 1900
      }],
      totalParts: 0,
      totalLabor: 1900,
      grandTotal: 1900
    },
    attachments: [createCompleteDdf(12, 'BS2024012').attachment],
    notes: [],
    assessment: createCompleteDdf(12, 'BS2024012').assessment,
    insuranceCoverage: {
      exists: true,
      policyType: 'private',
      vatLiable: false,
      deductible: 4000,
      dataFetched: true,
      status: 'approved',
      coverageAmount: 10000,
      policyNumber: 'POL-2024-012',
      fetchedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    calibration: {
      notNeeded: true
    },
    insuranceApprovalStatus: 'approved',
    ddfApprovalStatus: 'approved',
    imagesApprovalStatus: 'approved',
    calibrationApprovalStatus: 'approved',
    chatLog: [],
    actionLog: [{
      id: 'action-12-1',
      actionType: 'case_created',
      actor: 'System',
      actorType: 'system',
      description: 'Case BS2024012 created',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }],
    isChatLogEnabled: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];
