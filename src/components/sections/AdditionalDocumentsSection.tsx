import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { WorkshopCase } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';
import { getFileTypeInfo, isImageFile, formatFileSize } from '../../utils/fileTypeUtils';

interface AdditionalDocumentsSectionProps {
  caseData: WorkshopCase;
  onDeleteImage: (imageId: string) => void;
  onImageUpload: (files: File[], targetField?: string) => void;
}

const AdditionalDocumentsSection: React.FC<AdditionalDocumentsSectionProps> = ({
  caseData,
  onDeleteImage,
  onImageUpload,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get additional images from case data
  const additionalImages = caseData.damageImages || [];

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    onImageUpload(fileArray);
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

  const removeFile = (imageId: string) => {
    onDeleteImage(imageId);
  };

  return (
    <SectionWrapper
      title="Additional Documents"
      isRequired={false}
      isSectionComplete={true}
      showStatusBadge={false}
    >
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Upload any additional documentation, images, or files related to this case
          </p>
          <span className="text-xs text-gray-400 font-medium">Optional</span>
        </div>

        {/* Unified Grid with Uploaded Files and Upload Placeholder */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3">
          {/* Uploaded Files */}
          {additionalImages.map((image) => {
            const isImage = isImageFile(image.fileName || image.caption, image.fileType);
            const fileTypeInfo = getFileTypeInfo(image.fileName || image.caption, image.fileType);
            const IconComponent = fileTypeInfo.icon;

            return isImage ? (
              <div key={image.id} className="relative bg-green-50 border border-green-200 rounded overflow-hidden group">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate">{image.caption}</p>
                </div>
                <button
                  onClick={() => removeFile(image.id)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Delete file"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div key={image.id} className="relative bg-blue-50 border border-blue-200 rounded overflow-hidden group flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center p-3 min-h-[96px]">
                  <IconComponent className={`h-8 w-8 ${fileTypeInfo.color} mb-2`} />
                  <p className="text-xs font-medium text-gray-900 truncate w-full text-center" title={image.fileName || image.caption}>
                    {image.fileName || image.caption}
                  </p>
                  {image.fileSize && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(image.fileSize)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeFile(image.id)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Delete file"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}

          {/* Upload Placeholder - Always at the end */}
          <div
            className={`border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            style={{ minHeight: '132px' }}
          >
            <Upload className="h-6 w-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 px-2 text-center">Add files</p>
            <p className="text-xs text-gray-400 px-2 text-center mt-1">Drag & drop or click</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {additionalImages.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-4">
            No additional documents uploaded yet
          </p>
        )}
      </div>
    </SectionWrapper>
  );
};

export default AdditionalDocumentsSection;
