import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useCaseData } from '../hooks/useCaseData';
import { useToast } from '../hooks/useToast';
import {
  deleteCase,
  addDdfAttachmentToCase,
  addInvoiceAttachmentToCase,
  getCaseById,
  isCaseReadyForInProgress,
  isCaseReadyForCompletion,
  getMissingRequirementsForInProgress,
  getMissingRequirementsForCompletion,
  setInvoiceReviewStatus,
  hasDdfComplete,
  hasImagesAvailable,
  hasInvoicePresent,
  hasPartsAndLaborComplete,
  hasCalibrationComplete,
  hasInsuranceCoverageComplete,
  getInsuranceCoverageStatus,
  getDdfApprovalStatus,
  getImagesApprovalStatus,
  getPartsLaborApprovalStatus,
  getCalibrationApprovalStatus,
  getInvoiceApprovalStatus
} from '../data/mockData';
import { formatDateTime } from '../utils/formatters';
import DeleteCaseModal from '../components/DeleteCaseModal';
import DeleteImageModal from '../components/DeleteImageModal';
import InsuranceCoverageSection from '../components/sections/InsuranceCoverageSection';
import PartsLaborSection from '../components/sections/PartsLaborSection';
import CalibrationSection from '../components/sections/CalibrationSection';
import CommunicationLogSection from '../components/sections/CommunicationLogSection';
import ImageSection from '../components/sections/ImageSection';
import ImageModal from '../components/ImageModal';
import DdfFileManagement from '../components/sections/DdfFileManagement';
import InvoiceFileManagement from '../components/sections/InvoiceFileManagement';
import SectionWrapper from '../components/sections/SectionWrapper';
import CaseDetailHeader from '../components/CaseDetailHeader';
import CaseInfoSection from '../components/CaseInfoSection';
import AdditionalDocumentsSection from '../components/sections/AdditionalDocumentsSection';
import { ToastContainer } from '../components/Toast';
import { Trash2 } from 'lucide-react';

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { caseData, loading, handleUpdateCase, setCaseData } = useCaseData(id);
  const [repairFinishedDate, setRepairFinishedDate] = useState('');
  const [stageTransitionError, setStageTransitionError] = useState<string[]>([]);
  const [isProcessingInvoice, setIsProcessingInvoice] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);
  const [modalImageInfo, setModalImageInfo] = useState<{
    imageUrls: string[];
    initialIndex: number;
  }>({ imageUrls: [], initialIndex: 0 });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toasts, removeToast, success, error, warning, info } = useToast();
  
  // Set repair finished date when case data loads
  useEffect(() => {
    if (caseData?.service.repairFinishedDate) {
      setRepairFinishedDate(caseData.service.repairFinishedDate);
    }
  }, [caseData]);

  const handleDelete = (reason: string) => {
    console.log('[CaseDetail] Delete case handler called', { caseId: caseData?.id, reason });
    if (!caseData?.id) return;
    const success = deleteCase(caseData.id, reason);
    console.log('[CaseDetail] Delete case result:', success, 'Reason:', reason);
    if (success) {
      navigate('/');
    }
  };

  const handleMarkAsInProgress = () => {
    console.log('[CaseDetail] Mark as in progress handler called');
    if (!caseData) return;

    setStageTransitionError([]);

    if (!isCaseReadyForInProgress(caseData)) {
      const missingRequirements = getMissingRequirementsForInProgress(caseData);
      console.log('[CaseDetail] Case not ready for in progress. Missing:', missingRequirements);
      setStageTransitionError(missingRequirements);
      return;
    }

    console.log('[CaseDetail] Case ready, updating to in progress');
    handleUpdateCase({
      stage: 'in_progress',
      status: 'In Progress'
    });
  };

  const handleMarkAsFinished = () => {
    console.log('[CaseDetail] Mark as finished handler called');
    if (!caseData) return;

    setStageTransitionError([]);

    if (!repairFinishedDate.trim()) {
      console.log('[CaseDetail] Repair finished date not set');
      setStageTransitionError(['Repair finished date must be set']);
      return;
    }

    // Update the case with repair finished date first
    const updatedCaseData = {
      ...caseData,
      service: {
        ...caseData.service,
        repairFinishedDate: repairFinishedDate
      }
    };

    if (!isCaseReadyForCompletion(updatedCaseData)) {
      const missingRequirements = getMissingRequirementsForCompletion(updatedCaseData);
      console.log('[CaseDetail] Case not ready for completion. Missing:', missingRequirements);
      setStageTransitionError(missingRequirements);
      return;
    }

    console.log('[CaseDetail] Case ready, marking as finished');
    handleUpdateCase({
      stage: 'finished',
      status: 'Completed',
      service: {
        ...caseData.service,
        repairFinishedDate: repairFinishedDate,
        completionDate: new Date().toISOString()
      }
    });

    success('Job marked as completed successfully!');
  };

  const handleInvoiceReview = async (status: 'pending_review' | 'needs_correction' | 'ok') => {
    console.log('[CaseDetail] Invoice review handler called with status:', status);
    if (!caseData?.id) return;

    setIsProcessingInvoice(true);
    
    // Simulate backend OCR processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = setInvoiceReviewStatus(caseData.id, status);
    if (success) {
      // Refresh the case data to reflect the changes
      const updatedCase = getCaseById(caseData.id);
      if (updatedCase) {
        setCaseData(updatedCase);
      }
      
      const statusMessages = {
        'ok': 'Invoice approved successfully!',
        'needs_correction': 'Invoice marked as needing correction.',
        'pending_review': 'Invoice marked for review.'
      };

      if (status === 'ok') {
        success(statusMessages[status]);
      } else if (status === 'needs_correction') {
        warning(statusMessages[status]);
      } else {
        info(statusMessages[status]);
      }
    }
    
    setIsProcessingInvoice(false);
  };

  // Enhanced DDF upload handler with metadata extraction simulation
  const handleDdfUpload = (file: File) => {
    console.log('DDF file uploaded:', file.name);
    
    if (caseData?.id) {
      // Create a temporary URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      
      // Add the DDF attachment to the case and update the DDF status
      const attachment = addDdfAttachmentToCase(caseData.id, file.name, fileUrl, file.size);
      
      if (attachment) {
        // Refresh the case data to reflect the changes
        const updatedCase = getCaseById(caseData.id);
        if (updatedCase) {
          setCaseData(updatedCase);
        }
      }
    }
  };

  // Enhanced Invoice upload handler with metadata extraction simulation
  const handleInvoiceUpload = (file: File) => {
    console.log('Invoice file uploaded:', file.name);
    
    if (caseData?.id) {
      // Create a temporary URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      
      // Add the invoice attachment to the case and update the invoice data
      const invoice = addInvoiceAttachmentToCase(caseData.id, file.name, fileUrl, file.size);
      
      if (invoice) {
        // Refresh the case data to reflect the changes
        const updatedCase = getCaseById(caseData.id);
        if (updatedCase) {
          setCaseData(updatedCase);
        }
      }
    }
  };

  const handleImageUpload = (files: File[], targetField?: string) => {
    console.log('[CaseDetail] Image upload handler called with files:', files.map(f => f.name), 'targetField:', targetField);

    if (!caseData) return;

    // If targetField is specified, it's a required image upload
    if (targetField && ['vehicleOverview', 'glassCloseUp', 'damageDetail'].includes(targetField)) {
      const file = files[0]; // Single image for required fields
      const newImage = {
        id: `${targetField}-${Date.now()}`,
        url: URL.createObjectURL(file),
        caption: targetField === 'vehicleOverview' ? 'Vehicle Overview' :
                 targetField === 'glassCloseUp' ? 'Glass Close-up' :
                 'Damage Detail',
        uploadedAt: new Date().toISOString(),
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };

      const currentRequiredImages = caseData.requiredImages || {};
      const updatedRequiredImages = {
        vehicleOverview: currentRequiredImages.vehicleOverview,
        glassCloseUp: currentRequiredImages.glassCloseUp,
        damageDetail: currentRequiredImages.damageDetail,
        [targetField]: newImage
      };

      handleUpdateCase({
        requiredImages: updatedRequiredImages
      });
    } else {
      // Additional documentation (multiple files allowed)
      const newImages = files.map((file, index) => ({
        id: `additional-image-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        caption: file.name,
        uploadedAt: new Date().toISOString(),
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      }));

      handleUpdateCase({
        damageImages: [...caseData.damageImages, ...newImages]
      });
    }
  };

  const handleDeleteImage = (imageId: string) => {
    console.log('[CaseDetail] Delete single image handler called', { imageId });
    if (!caseData) return;
    
    const updatedImages = caseData.damageImages.filter(img => img.id !== imageId);
    handleUpdateCase({
      damageImages: updatedImages
    });
  };

  const handleDeleteMultipleImages = (imageIds: string[]) => {
    console.log('[CaseDetail] Delete multiple images handler called', { imageIds, count: imageIds.length });
    if (!caseData) return;
    
    const updatedImages = caseData.damageImages.filter(img => !imageIds.includes(img.id));
    handleUpdateCase({
      damageImages: updatedImages
    });
  };

  const confirmDeleteImages = (imageIds: string[]) => {
    console.log('[CaseDetail] Confirm delete images called', { imageIds, count: imageIds.length });
    setImagesToDelete(imageIds);
    setIsDeleteImageModalOpen(true);
  };

  const executeImageDeletion = () => {
    console.log('[CaseDetail] Execute image deletion called', { imagesToDelete, count: imagesToDelete.length });
    if (imagesToDelete.length === 1) {
      handleDeleteImage(imagesToDelete[0]);
    } else {
      handleDeleteMultipleImages(imagesToDelete);
    }
    setImagesToDelete([]);
  };

  const handleImageClick = (imageUrl: string) => {
    console.log('[CaseDetail] Image click handler called', { imageUrl });
    if (!caseData) return;
    
    const imageUrls = caseData.damageImages.map(img => img.url);
    const initialIndex = caseData.damageImages.findIndex(img => img.url === imageUrl);
    
    setModalImageInfo({
      imageUrls,
      initialIndex: Math.max(0, initialIndex)
    });
    setIsImageModalOpen(true);
  };
  
  // Calculate completion status for each section
  const isInsuranceComplete = hasInsuranceCoverageComplete(caseData);
  const insuranceStatus = getInsuranceCoverageStatus(caseData);
  const isDdfComplete = hasDdfComplete(caseData);
  const isInvoiceComplete = hasInvoicePresent(caseData) && !!caseData?.invoice?.kid && !!caseData?.invoice?.totalAmount;
  const isImageSectionComplete = hasImagesAvailable(caseData);
  const isPartsLaborComplete = hasPartsAndLaborComplete(caseData);
  const isCalibrationComplete = hasCalibrationComplete(caseData);

  // Calculate approval status for each section
  const ddfApprovalStatus = getDdfApprovalStatus(caseData);
  const imagesApprovalStatus = getImagesApprovalStatus(caseData);
  const partsLaborApprovalStatus = getPartsLaborApprovalStatus(caseData);
  const calibrationApprovalStatus = getCalibrationApprovalStatus(caseData);
  const invoiceApprovalStatus = getInvoiceApprovalStatus(caseData);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Not Found</h3>
            <p className="text-gray-600 text-center mb-6">The case you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Back to Cases
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <CaseDetailHeader
        caseData={caseData}
        onBack={() => navigate('/')}
        onSubmit={() => {
          console.log('[CaseDetail] Submit button action triggered');
          success('Case submitted successfully!');
        }}
      />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div id="case-info" className="mb-6">
          <CaseInfoSection caseData={caseData} />
        </div>

        <div>
            {stageTransitionError.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-5 mb-6 shadow-sm">
                <div className="flex">
                  <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-red-900">
                      Cannot proceed to next stage
                    </h3>
                    <div className="mt-2 text-sm text-red-800">
                      <p className="mb-2 font-medium">The following requirements must be completed:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {stageTransitionError.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Two-Column Layout: Insurance/DDF on Left, Images on Right */}
              <div id="insurance">
                    <SectionWrapper
                      title="Insurance Coverage"
                      isSectionComplete={isInsuranceComplete}
                      isRequired={true}
                      showStatusBadge={true}
                      insuranceStatus={insuranceStatus}
                    >
                      <InsuranceCoverageSection caseData={caseData} onUpdate={handleUpdateCase} />
                    </SectionWrapper>
                  </div>
              <div className="grid grid-cols-1 gap-4 items-start">

              
                  

                  <div id="ddf">
                    <DdfFileManagement
                      caseData={caseData}
                      onUpdate={handleUpdateCase}
                      onFileUpload={handleDdfUpload}
                      isSectionComplete={isDdfComplete}
                      approvalStatus={ddfApprovalStatus}
                    />
                  </div>
              

                {/* Right Column: Images */}
                <div id="images">
                  <ImageSection
                    caseData={caseData}
                    onUpdate={handleUpdateCase}
                    onDeleteImage={(imageId) => confirmDeleteImages([imageId])}
                    onImageUpload={handleImageUpload}
                    setSelectedImageUrl={handleImageClick}
                    setIsImageModalOpen={setIsImageModalOpen}
                    formatDate={formatDateTime}
                    isSectionComplete={isImageSectionComplete}
                    approvalStatus={imagesApprovalStatus}
                  />
                </div>
              </div>

              {/* Additional Documents Section */}
              <div id="additional-documents">
                <AdditionalDocumentsSection
                  caseData={caseData}
                  onDeleteImage={(imageId) => confirmDeleteImages([imageId])}
                  onImageUpload={handleImageUpload}
                />
              </div>

              {/* Full Width Sections Below */}
              <div id="parts-labor">
                <PartsLaborSection
                  caseData={caseData}
                  onUpdate={handleUpdateCase}
                  isSectionComplete={isPartsLaborComplete}
                  approvalStatus={partsLaborApprovalStatus}
                />
              </div>

              <div id="calibration">
                <CalibrationSection
                  caseData={caseData}
                  onUpdate={handleUpdateCase}
                  isSectionComplete={isCalibrationComplete}
                  approvalStatus={calibrationApprovalStatus}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <div id="invoice">
                  <InvoiceFileManagement
                    caseData={caseData}
                    onUpdate={handleUpdateCase}
                    onFileUpload={handleInvoiceUpload}
                    isSectionComplete={isInvoiceComplete}
                    approvalStatus={invoiceApprovalStatus}
                  />
                </div>

                <div id="communication-log">
                  <CommunicationLogSection
                    caseData={caseData}
                    onUpdate={handleUpdateCase}
                    isSectionComplete={false}
                  />
                </div>
              </div>
            </div>

            {/* Delete Case Section */}
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    console.log('[CaseDetail] Delete button action triggered - opening modal');
                    setIsDeleteModalOpen(true);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  title="Delete Case"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  <span className="font-medium">Delete Case</span>
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Delete Case Modal */}
      <DeleteCaseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        caseNumber={caseData.caseNumber}
      />

      {/* Delete Image Modal */}
      <DeleteImageModal
        isOpen={isDeleteImageModalOpen}
        onClose={() => setIsDeleteImageModalOpen(false)}
        onConfirm={executeImageDeletion}
        imageCount={imagesToDelete.length}
        isMultiple={imagesToDelete.length > 1}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrls={modalImageInfo.imageUrls}
        initialImageIndex={modalImageInfo.initialIndex}
      />
    </div>
  );
};

export default CaseDetail;