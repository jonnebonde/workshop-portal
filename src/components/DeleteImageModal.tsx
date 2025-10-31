import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageCount: number;
  isMultiple?: boolean;
}

const DeleteImageModal: React.FC<DeleteImageModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  imageCount,
  isMultiple = false
}) => {
  const handleCancel = () => {
    console.log('[DeleteImageModal] Cancel button clicked');
    onClose();
  };

  const handleConfirm = () => {
    console.log('[DeleteImageModal] Confirm delete button clicked', { imageCount, isMultiple });
    onConfirm();
    onClose();
  };

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-center mb-4">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Delete {isMultiple ? `${imageCount} Images` : 'Image'}
                </Dialog.Title>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 text-center">
                    {isMultiple 
                      ? `Are you sure you want to delete ${imageCount} selected images? This action cannot be undone.`
                      : 'Are you sure you want to delete this image? This action cannot be undone.'
                    }
                  </p>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={handleConfirm}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete {isMultiple ? 'Images' : 'Image'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteImageModal;