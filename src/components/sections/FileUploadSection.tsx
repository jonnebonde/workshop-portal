import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Image as ImageIcon, Trash2 } from 'lucide-react';

interface UploadedFile {
  file: File;
  previewUrl?: string;
}

interface FileUploadSectionProps {
  fileTypeLabel: string;
  allowedFileTypes: string;
  onFileUpload: (file: File) => void;
  multiple?: boolean;
  isImageUpload?: boolean;
  existingFiles?: Array<{
    id: string;
    name: string;
    url: string;
    type?: string;
  }>;
  onDeleteFile?: (fileId: string) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  fileTypeLabel,
  allowedFileTypes,
  onFileUpload,
  multiple = false,
  isImageUpload = false,
  existingFiles = [],
  onDeleteFile
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(({ previewUrl }) => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      });
    };
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    const newUploadedFiles = fileArray.map(file => {
      const uploadedFile: UploadedFile = { file };

      if (isImageUpload && file.type.startsWith('image/')) {
        uploadedFile.previewUrl = URL.createObjectURL(file);
      }

      return uploadedFile;
    });

    if (multiple) {
      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
      fileArray.forEach(file => onFileUpload(file));
    } else {
      if (uploadedFiles[0]?.previewUrl) {
        URL.revokeObjectURL(uploadedFiles[0].previewUrl);
      }
      setUploadedFiles(newUploadedFiles);
      onFileUpload(fileArray[0]);
    }
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

  const removeFile = (index: number) => {
    const fileToRemove = uploadedFiles[index];
    if (fileToRemove.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const hasFiles = existingFiles.length > 0 || uploadedFiles.length > 0;
  const shouldHideUpload = !multiple && hasFiles;

  const allFiles = [
    ...existingFiles.map(file => ({
      id: file.id,
      name: file.name,
      url: file.url,
      type: file.type,
      isExisting: true,
      file: null as File | null,
      previewUrl: file.url,
      size: undefined
    })),
    ...uploadedFiles.map(({ file, previewUrl }, index) => ({
      id: `temp-${index}`,
      name: file.name,
      url: previewUrl || '',
      type: file.type,
      isExisting: false,
      file: file,
      previewUrl: previewUrl,
      size: file.size,
      tempIndex: index
    }))
  ];

  const totalFileCount = allFiles.length;

  return (
    <div className="flex flex-col space-y-4">
      {totalFileCount > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {fileTypeLabel} ({totalFileCount})
          </h4>

          {isImageUpload ? (
            <div className="max-h-[120px] overflow-y-auto">
              <div className="grid grid-cols-4 gap-2">
                {allFiles.map((fileItem) => (
                  <div key={fileItem.id} className="relative group">
                    {fileItem.previewUrl ? (
                      <img
                        src={fileItem.previewUrl}
                        alt={fileItem.name}
                        className="w-full h-16 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    {(onDeleteFile || !fileItem.isExisting) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (fileItem.isExisting && onDeleteFile) {
                            onDeleteFile(fileItem.id);
                          } else if (!fileItem.isExisting && fileItem.tempIndex !== undefined) {
                            removeFile(fileItem.tempIndex);
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title="Delete file"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg flex items-center justify-center">
                      <p className="text-white text-xs opacity-0 group-hover:opacity-100 text-center px-1">
                        {fileItem.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-h-[120px] overflow-y-auto space-y-2">
              {allFiles.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 group"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{fileItem.name}</p>
                      {fileItem.size && (
                        <p className="text-xs text-gray-500">{formatFileSize(fileItem.size)}</p>
                      )}
                    </div>
                  </div>
                  {(onDeleteFile || !fileItem.isExisting) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (fileItem.isExisting && onDeleteFile) {
                          onDeleteFile(fileItem.id);
                        } else if (!fileItem.isExisting && fileItem.tempIndex !== undefined) {
                          removeFile(fileItem.tempIndex);
                        }
                      }}
                      className="ml-2 p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors shadow-sm border border-red-200 hover:border-red-300"
                      title="Delete file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!shouldHideUpload && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer h-[140px] flex flex-col justify-center ${
            isDragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Drop {fileTypeLabel} here or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Drag and drop or click
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept={allowedFileTypes}
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
