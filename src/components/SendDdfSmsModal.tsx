import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MessageSquare } from 'lucide-react';

interface SendDdfSmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: { phoneNumber: string; message: string; link?: string; licensePlate?: string }) => void;
  phoneNumber?: string;
  isPhoneEditable?: boolean;
  showLinkInput?: boolean;
  link?: string;
  showLicensePlateInput?: boolean;
  licensePlate?: string;
  title?: string;
  description?: string;
  messageTemplate?: string;
}

const SendDdfSmsModal: React.FC<SendDdfSmsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  phoneNumber,
  isPhoneEditable = false,
  showLinkInput = false,
  link,
  showLicensePlateInput = false,
  licensePlate,
  title = 'Send DDF Link via SMS',
  description = 'Send the DDF link to the customer via SMS',
  messageTemplate = 'Hello! Your Digital Damage Form (DDF) is ready for review. Please click the following link to access your document: [LINK_PLACEHOLDER]'
}) => {
  const [phoneValue, setPhoneValue] = useState(phoneNumber || '');
  const [linkValue, setLinkValue] = useState(link || '');
  const [licensePlateValue, setLicensePlateValue] = useState(licensePlate || '');

  useEffect(() => {
    if (isOpen) {
      setPhoneValue(phoneNumber || '');
      setLinkValue(link || '');
      setLicensePlateValue(licensePlate || '');
    }
  }, [isOpen, phoneNumber, link, licensePlate]);

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm({
      phoneNumber: phoneValue.trim(),
      message: smsMessage,
      link: linkValue.trim() || undefined,
      licensePlate: licensePlateValue.trim() || undefined
    });
    onClose();
  };

  const smsMessage = useMemo(() => {
    const safeLink = linkValue.trim() || '[LINK_PLACEHOLDER]';
    return messageTemplate.replace('[LINK_PLACEHOLDER]', safeLink);
  }, [linkValue, messageTemplate]);

  const canSend = phoneValue.trim().length > 0 &&
    (!showLinkInput || linkValue.trim().length > 0) &&
    (!showLicensePlateInput || licensePlateValue.trim().length > 0);

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
                  {title}
                </Dialog.Title>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 text-center mb-4">
                    {description}
                  </p>

                  <div className="mt-4">
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 text-left mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone-number"
                      value={phoneValue}
                      readOnly={!isPhoneEditable}
                      onChange={(event) => setPhoneValue(event.target.value)}
                      placeholder={isPhoneEditable ? 'Enter phone number' : undefined}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm ${
                        isPhoneEditable ? 'bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500' : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  {showLinkInput && (
                    <div className="mt-4">
                      <label htmlFor="ddf-link" className="block text-sm font-medium text-gray-700 text-left mb-2">
                        DDF Link
                      </label>
                      <input
                        type="text"
                        id="ddf-link"
                        value={linkValue}
                        onChange={(event) => setLinkValue(event.target.value)}
                        placeholder="Paste the DDF link"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {showLicensePlateInput && (
                    <div className="mt-4">
                      <label htmlFor="license-plate" className="block text-sm font-medium text-gray-700 text-left mb-2">
                        License Plate
                      </label>
                      <input
                        type="text"
                        id="license-plate"
                        value={licensePlateValue}
                        onChange={(event) => setLicensePlateValue(event.target.value)}
                        placeholder="Enter license plate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

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
                    disabled={!canSend}
                    className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      canSend ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
                    }`}
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
