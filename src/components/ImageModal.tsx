import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrls: string[];
  initialImageIndex: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrls, initialImageIndex }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

  // Update current index when modal opens with new initial index
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(initialImageIndex);
    }
  }, [isOpen, initialImageIndex]);

  const goToPrevious = () => {
    console.log('[ImageModal] Previous button clicked');
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    console.log('[ImageModal] Next button clicked');
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, imageUrls.length]);

  if (!imageUrls.length) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-6xl transform overflow-hidden rounded-2xl bg-black shadow-xl transition-all">
                {/* Close button */}
                <button
                  onClick={() => {
                    console.log('[ImageModal] Close button clicked');
                    onClose();
                  }}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Image counter */}
                {imageUrls.length > 1 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                    {currentImageIndex + 1} / {imageUrls.length}
                  </div>
                )}

                {/* Main image container */}
                <div className="relative">
                  <img
                    src={imageUrls[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />

                  {/* Navigation buttons */}
                  {imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>

                      <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                {imageUrls.length > 1 && (
                  <div className="bg-black/80 p-4">
                    <div className="flex justify-center space-x-2 overflow-x-auto">
                      {imageUrls.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            console.log('[ImageModal] Thumbnail clicked', { index });
                            setCurrentImageIndex(index);
                          }}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-white'
                              : 'border-transparent hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                  {imageUrls.length > 1 ? 'Use arrow keys or click to navigate' : 'Press ESC to close'}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageModal;