import { FileText, FileSpreadsheet, File, Image } from 'lucide-react';

export type FileType = 'image' | 'pdf' | 'word' | 'excel' | 'text' | 'other';

export interface FileTypeInfo {
  type: FileType;
  icon: typeof FileText;
  color: string;
}

export const getFileType = (fileName: string, mimeType?: string): FileType => {
  const extension = fileName.toLowerCase().split('.').pop() || '';

  if (mimeType) {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'word';
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'excel';
    if (mimeType.startsWith('text/')) return 'text';
  }

  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(extension)) {
    return 'image';
  }

  if (extension === 'pdf') {
    return 'pdf';
  }

  if (['doc', 'docx'].includes(extension)) {
    return 'word';
  }

  if (['xls', 'xlsx', 'csv'].includes(extension)) {
    return 'excel';
  }

  if (['txt', 'md', 'log'].includes(extension)) {
    return 'text';
  }

  return 'other';
};

export const getFileTypeInfo = (fileName: string, mimeType?: string): FileTypeInfo => {
  const type = getFileType(fileName, mimeType);

  switch (type) {
    case 'image':
      return {
        type: 'image',
        icon: Image,
        color: 'text-green-600'
      };
    case 'pdf':
      return {
        type: 'pdf',
        icon: FileText,
        color: 'text-red-600'
      };
    case 'word':
      return {
        type: 'word',
        icon: FileText,
        color: 'text-blue-600'
      };
    case 'excel':
      return {
        type: 'excel',
        icon: FileSpreadsheet,
        color: 'text-green-700'
      };
    case 'text':
      return {
        type: 'text',
        icon: FileText,
        color: 'text-gray-600'
      };
    default:
      return {
        type: 'other',
        icon: File,
        color: 'text-gray-500'
      };
  }
};

export const isImageFile = (fileName: string, mimeType?: string): boolean => {
  return getFileType(fileName, mimeType) === 'image';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
