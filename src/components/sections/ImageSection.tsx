import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, MessageSquare, X, Eye } from 'lucide-react';
import { WorkshopCase, hasImagesAvailable, SectionApprovalStatus } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';
import ImageExampleModal from './ImageExampleModal';

interface ImageSectionProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
  onDeleteImage: (imageId: string) => void;
  onImageUpload: (files: File[], targetField?: string) => void;
  setSelectedImageUrl: (url: string) => void;
  setIsImageModalOpen: (open: boolean) => void;
  formatDate: (dateString: string) => string;
  isSectionComplete?: boolean;
  approvalStatus?: SectionApprovalStatus;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  caseData,
  onUpdate,
  onDeleteImage,
  onImageUpload,
  setSelectedImageUrl,
  setIsImageModalOpen,
  formatDate,
  isSectionComplete = true,
  approvalStatus
}) => {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);

  // Initialize preview states from caseData.requiredImages
  const [vehicleOverviewPreview, setVehicleOverviewPreview] = useState<string | null>(caseData.requiredImages?.vehicleOverview?.url || null);
  const [glassCloseUpPreview, setGlassCloseUpPreview] = useState<string | null>(caseData.requiredImages?.glassCloseUp?.url || null);
  const [damageDetailPreview, setDamageDetailPreview] = useState<string | null>(caseData.requiredImages?.damageDetail?.url || null);
  
  // Local state for images not needed feature
  const [imagesNotNeeded, setImagesNotNeeded] = useState(caseData.imagesNotNeeded || false);
  const [imagesNotNeededComment, setImagesNotNeededComment] = useState(caseData.imagesNotNeededComment || '');

  // Sync local state with caseData changes
  useEffect(() => {
    setImagesNotNeeded(caseData.imagesNotNeeded || false);
    setImagesNotNeededComment(caseData.imagesNotNeededComment || '');
  }, [caseData.imagesNotNeeded, caseData.imagesNotNeededComment]);

  // Sync preview states with caseData.requiredImages changes only when they differ
  useEffect(() => {
    const newVehicleOverview = caseData.requiredImages?.vehicleOverview?.url || null;
    const newGlassCloseUp = caseData.requiredImages?.glassCloseUp?.url || null;
    const newDamageDetail = caseData.requiredImages?.damageDetail?.url || null;

    if (newVehicleOverview !== vehicleOverviewPreview) {
      setVehicleOverviewPreview(newVehicleOverview);
    }
    if (newGlassCloseUp !== glassCloseUpPreview) {
      setGlassCloseUpPreview(newGlassCloseUp);
    }
    if (newDamageDetail !== damageDetailPreview) {
      setDamageDetailPreview(newDamageDetail);
    }
  }, [caseData.requiredImages]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (vehicleOverviewPreview) URL.revokeObjectURL(vehicleOverviewPreview);
      if (glassCloseUpPreview) URL.revokeObjectURL(glassCloseUpPreview);
      if (damageDetailPreview) URL.revokeObjectURL(damageDetailPreview);
    };
  }, [vehicleOverviewPreview, glassCloseUpPreview, damageDetailPreview]);
  
  // Calculate completion status based on whether all 3 required images are present OR images are marked as not needed with comment
  const isComplete = hasImagesAvailable(caseData);

  // Handle images not needed checkbox change
  const handleImagesNotNeededChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setImagesNotNeeded(checked);
    onUpdate({ imagesNotNeeded: checked });
    if (!checked) {
      setImagesNotNeededComment('');
      onUpdate({ imagesNotNeededComment: '' });
    }
  };

  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    setImagesNotNeededComment(comment);
    onUpdate({ imagesNotNeededComment: comment });
  };

  const toggleSelectionMode = () => {
    console.log('[ImageSection] Toggle selection mode clicked', { currentMode: isSelectionMode });
    setIsSelectionMode(!isSelectionMode);
    setSelectedImages(new Set());
  };

  const toggleImageSelection = (imageId: string) => {
    console.log('[ImageSection] Toggle image selection', { imageId });
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const selectAllImages = () => {
    console.log('[ImageSection] Select all images clicked', { currentSelected: selectedImages.size, totalImages: caseData.damageImages.length });
    if (selectedImages.size === caseData.damageImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(caseData.damageImages.map(img => img.id)));
    }
  };

  const deleteSelectedImages = () => {
    console.log('[ImageSection] Delete selected images clicked', { count: selectedImages.size, imageIds: Array.from(selectedImages) });
    selectedImages.forEach(imageId => {
      onDeleteImage(imageId);
    });
    setSelectedImages(new Set());
    setIsSelectionMode(false);
  };


  // Single Image Upload Box Component
  const SingleImageUploadBox: React.FC<{
    title: string;
    description: string;
    tip: string;
    preview: string | null;
    onPreviewChange: (url: string | null) => void;
    fieldName: string;
  }> = ({ title, description, tip, preview, onPreviewChange, fieldName }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
      console.log('[ImageSection] Single image file selected', { filesCount: files?.length, fieldName });
      if (!files || files.length === 0) return;
      const file = files[0];

      // Upload the file to the specific required field first
      onImageUpload([file], fieldName);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const clearPreview = () => {
      if (preview) {
        // Clear the required image from caseData while preserving other fields
        const currentRequiredImages = caseData.requiredImages || {};
        const updatedRequiredImages = {
          vehicleOverview: currentRequiredImages.vehicleOverview,
          glassCloseUp: currentRequiredImages.glassCloseUp,
          damageDetail: currentRequiredImages.damageDetail,
          [fieldName]: undefined
        };
        onUpdate({ requiredImages: updatedRequiredImages });
      }
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-medium text-gray-900">{title}</h4>
        </div>
        <p className="text-xs text-gray-500 mb-2">{description}</p>
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={title}
              className="w-full h-48 object-cover rounded-lg "
            />
            <button
              onClick={clearPreview}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg rounded-tr-lg p-1 hover:bg-red-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <div
            className={`h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-5 w-5 text-gray-400 mb-1" />
            <p className="text-xs text-gray-600">Click to upload</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500 italic">
          {tip}
        </div>
      </div>
    );
  };


  // Create dynamic status message based on required images only
  const getImageStatusMessage = () => {
    if (imagesNotNeeded) {
      return {
        type: 'info',
        message: 'Images not required for this case'
      };
    }

    // Count only the three required images
    const requiredImagesCount = [
      caseData.requiredImages?.vehicleOverview,
      caseData.requiredImages?.glassCloseUp,
      caseData.requiredImages?.damageDetail
    ].filter(Boolean).length;

    if (requiredImagesCount === 0) {
      return {
        type: 'warning',
        message: 'No images uploaded - 3 required images needed'
      };
    } else if (requiredImagesCount < 3) {
      return {
        type: 'warning',
        message: `${requiredImagesCount}/3 required images uploaded - ${3 - requiredImagesCount} more needed`
      };
    } else {
      return {
        type: 'success',
        message: '3/3 required images uploaded - Complete'
      };
    }
  };

  const statusMessage = getImageStatusMessage();

  const exampleImageData = {
    vehicleOverview: {
      url: 'https://imgur.com/DxEqaxl.png',
      description: 'Take a full view photo of the vehicle showing the damaged area. The photo should be taken from a distance that captures the entire vehicle while clearly showing which glass area is damaged.',
      tips: [
        'Stand back far enough to capture the entire vehicle in the frame',
        'Ensure the damaged glass area is clearly visible',
        'Take the photo in good lighting conditions (avoid direct sunlight or dark areas)',
        'Keep the camera steady and at vehicle height level',
        'Make sure the vehicle identification (license plate area) is visible if possible'
      ]
    },
    glassCloseUp: {
      url: 'https://i.imgur.com/7V69aYo.png',
      description: 'Take a close-up photo focusing on the damaged glass. This should clearly show the crack, chip, or damage pattern without showing too much of the surrounding vehicle.',
      tips: [
        'Get close enough so the glass damage fills most of the frame',
        'Ensure the damage is in sharp focus',
        'Use good lighting to show the crack or chip clearly',
        'Avoid reflections that obscure the damage',
        'Include enough context to show which glass panel is damaged (windshield, side window, etc.)'
      ]
    },
    damageDetail: {
      url: 'https://i.imgur.com/6aHVpSH.png',
      description: 'Take an extreme close-up photo of the specific damage point. This should show the exact nature of the damage in detail - whether it\'s a chip, crack, star break, or other type of damage.',
      tips: [
        'Get as close as possible while maintaining focus',
        'The damage should fill the entire frame',
        'Show the exact impact point or crack origin',
        'Use a reference object (like a coin) next to the damage for scale if helpful',
        'Ensure excellent lighting to capture all details of the damage',
        'Take multiple angles if the damage has depth or multiple layers'
      ]
    }
  };

  return (
    <SectionWrapper
      title="Images"
      isRequired={true}
      isComplete={isComplete}
      isSectionComplete={isSectionComplete}
      approvalStatus={approvalStatus}
    >
      <div className="space-y-6">
        {/* Dynamic Status Message at Top - Only show when NOT complete */}
        {statusMessage.type !== 'success' && (
          <div className={`rounded-md p-4 ${
            statusMessage.type === 'info'
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex">
              {statusMessage.type === 'info' ? (
                <MessageSquare className="h-5 w-5 text-blue-400" />
              ) : (
                <Camera className="h-5 w-5 text-yellow-400" />
              )}
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  statusMessage.type === 'info' ? 'text-blue-800' : 'text-yellow-800'
                }`}>
                  {statusMessage.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Images Not Needed Checkbox and View Examples Button in a Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="imagesNotNeeded"
              checked={imagesNotNeeded}
              onChange={handleImagesNotNeededChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="imagesNotNeeded" className="ml-2 block text-sm text-gray-900">
              Images not needed for this case
            </label>  
          </div>

          {!imagesNotNeeded && (
            <button
              onClick={() => setIsExampleModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              type="button"
            >
            
              View Image Examples
            </button>
          )}
        </div>

        {/* Conditional rendering based on imagesNotNeeded */}
        {!imagesNotNeeded && (
          <>

            <ImageExampleModal
              isOpen={isExampleModalOpen}
              onClose={() => setIsExampleModalOpen(false)}
              examples={[
                {
                  title: 'Vehicle Overview',
                  exampleImageUrl: exampleImageData.vehicleOverview.url,
                  description: exampleImageData.vehicleOverview.description,
                  tips: exampleImageData.vehicleOverview.tips
                },
                {
                  title: 'Glass Close-up',
                  exampleImageUrl: exampleImageData.glassCloseUp.url,
                  description: exampleImageData.glassCloseUp.description,
                  tips: exampleImageData.glassCloseUp.tips
                },
                {
                  title: 'Damage Detail',
                  exampleImageUrl: exampleImageData.damageDetail.url,
                  description: exampleImageData.damageDetail.description,
                  tips: exampleImageData.damageDetail.tips
                }
              ]}
            />

            {/* Three Required Image Upload Containers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <SingleImageUploadBox
                title="Vehicle Overview"
                description="Full view of the vehicle with the damaged area"
                ti="Take photo from a distance with the entire vehicle and damaged glass area. Ensure good lighting and clear visibility of the damage."
                preview={vehicleOverviewPreview}
                onPreviewChange={setVehicleOverviewPreview}
                fieldName="vehicleOverview"
              />

              <SingleImageUploadBox
                title="Glass Close-up"
                description="Close-up view of the damaged glass"
                ti="Focus on the glass damage, ensure good lighting and clear visibility of cracks or chips. Use good contrast to show damage clearly. "
                preview={glassCloseUpPreview}
                onPreviewChange={setGlassCloseUpPreview}
                fieldName="glassCloseUp"
              />

              <SingleImageUploadBox
                title="Damage Detail"
                description="Detailed view of the specific damage area"
                ti="Get very close to show the exact nature and extent of the damage. Include reference objects for scale if helpful."
                preview={damageDetailPreview}
                onPreviewChange={setDamageDetailPreview}
                fieldName="damageDetail"
              />
            </div>
          
          </>
        )}

        {/* Images Not Needed Section */}
        {imagesNotNeeded && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Images Not Required
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>This case has been marked as not requiring images. Please provide a reason below.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="imagesNotNeededComment" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for No Images
              </label>
              <textarea
                id="imagesNotNeededComment"
                value={imagesNotNeededComment}
                onChange={handleCommentChange}
                rows={4}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Please explain why images are not needed for this case..."
              />
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ImageSection;