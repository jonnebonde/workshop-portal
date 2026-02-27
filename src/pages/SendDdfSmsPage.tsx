import React, { useMemo, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useToast';

const messageTemplate =
  'You have a new Digital Damage Form to complete. A secure link will be sent to you via SMS.';

const SendDdfSmsPage: React.FC = () => {
  const { toasts, removeToast, success, error } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const messagePreview = useMemo(() => messageTemplate, []);

  const canSend = phoneNumber.trim().length > 0 && licensePlate.trim().length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend) {
      error('Phone number and license plate are required.');
      return;
    }

    success(`DDF link sent via SMS to ${phoneNumber.trim()} for ${licensePlate.trim().toUpperCase()}`);
    setPhoneNumber('');
    setLicensePlate('');
  };

  return (
    <div className="space-y-6 py-6 px-6">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <MessageSquare className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Send DDF SMS</h1>
          <p className="text-sm text-gray-500">Request a Digital Damage Form without creating a case.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
          <div>
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone-number"
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Enter phone number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="license-plate" className="block text-sm font-medium text-gray-700 mb-2">
              License Plate
            </label>
            <input
              id="license-plate"
              type="text"
              value={licensePlate}
              onChange={(event) => setLicensePlate(event.target.value)}
              placeholder="Enter license plate"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={!canSend}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                canSend ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Send SMS
            </button>
          </div>
        </div>

        <aside className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Message Preview</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{messagePreview}</p>
          <div className="text-xs text-gray-400">
            The DDF link is generated automatically by the SMS service.
          </div>
        </aside>
      </form>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default SendDdfSmsPage;
