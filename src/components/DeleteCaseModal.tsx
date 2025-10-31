import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AlertTriangle } from 'lucide-react';

interface DeleteCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  caseNumber: string;
}

const DELETION_REASONS = [
  'Duplicate',
  'Job not executed',
  'Not a valid reason for damage',
  'No coverage',
  'Fraud',
  'Error',
  'Wrong insurance company',
  'Wrong VRN',
  'Customer complaint',
  'System error'
] as const;

const DeleteCaseModal: React.FC<DeleteCaseModalProps> = ({ isOpen, onClose, onConfirm, caseNumber }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');

  const handleCancel = () => {
    console.log('[DeleteCaseModal] Cancel button clicked');
    setSelectedReason('');
    onClose();
  };

  const handleConfirm = () => {
    console.log('[DeleteCaseModal] Confirm delete button clicked with reason:', selectedReason);
    onConfirm(selectedReason);
    setSelectedReason('');
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
                  Delete Case #{caseNumber}
                </Dialog.Title>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Are you sure you want to delete this case? This action cannot be undone.
                  </p>

                  <div className="mt-6">
                    <label htmlFor="deletion-reason" className="block text-sm font-medium text-gray-700 text-left mb-2">
                      Reason for deletion <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="deletion-reason"
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select a reason...</option>
                      {DELETION_REASONS.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                    {!selectedReason && (
                      <p className="mt-2 text-xs text-gray-500 text-left">
                        Please select a reason to proceed with deletion
                      </p>
                    )}
                  </div>
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
                    disabled={!selectedReason}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                    onClick={handleConfirm}
                  >
                    Delete Case
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

export default DeleteCaseModal;