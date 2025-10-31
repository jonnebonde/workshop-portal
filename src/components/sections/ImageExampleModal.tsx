import React, { useState } from 'react';
import { X, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageExample {
  title: string;
  exampleImageUrl: string;
  description: string;
  tips: string[];
}

interface ImageExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  examples: ImageExample[];
}

const ImageExampleModal: React.FC<ImageExampleModalProps> = ({
  isOpen,
  onClose,
  examples
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentExample = examples[currentIndex];
  const totalExamples = examples.length;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalExamples - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < totalExamples - 1 ? prev + 1 : 0));
  };

  const handleClose = () => {
    setCurrentIndex(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={handleClose}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentExample.title} - Example
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {currentIndex + 1} of {totalExamples}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm text-gray-600 mb-4">
              {currentExample.description}
            </p>

            <div className="mb-6 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md relative">
              <img
                src={currentExample.exampleImageUrl}
                alt={`${currentExample.title} Example`}
                className="w-full h-auto object-contain bg-gray-50"
              />

              {totalExamples > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
                    aria-label="Previous example"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
                    aria-label="Next example"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                Key Requirements
              </h4>
              <ul className="space-y-2">
                {currentExample.tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <div className="flex gap-2">
              {examples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to example ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageExampleModal;
