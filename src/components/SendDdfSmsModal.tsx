import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MessageSquare } from 'lucide-react';

interface SendDdfSmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  phoneNumber: string;
}

const SendDdfSmsModal: React.FC<SendDdfSmsModalProps> = ({ isOpen, onClose, onConfirm, phoneNumber }) => {
  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const smsMessage = `Hello! Your Digital Damage Form (DDF) is ready for review. Please click the following link to access your document: [LINK_PLACEHOLDER]`;

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
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Send DDF Link via SMS
                </Dialog.Title>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Send the DDF link to the customer via SMS
                  </p>

                  <div className="mt-4">
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 text-left mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone-number"
                      value={phoneNumber}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm cursor-not-allowed"
                    />
                  </div>

                  <div className="mt-4">
                    <label htmlFor="sms-message" className="block text-sm font-medium text-gray-700 text-left mb-2">
                      Message
                    </label>
                    <textarea
                      id="sms-message"
                      value={smsMessage}
                      readOnly
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm cursor-not-allowed resize-none"
                    />
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
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleConfirm}
                  >
                    Send SMS
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

export default SendDdfSmsModal;
