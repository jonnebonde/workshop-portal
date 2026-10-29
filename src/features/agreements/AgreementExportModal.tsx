import { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { downloadAgreementExport, type ExportFormat } from './export';
import type { AgreementVersion, WorkshopAgreement } from './model';

export default function AgreementExportModal({ workshop, agreement, version, onClose }: {
  workshop: string;
  agreement: WorkshopAgreement;
  version: AgreementVersion;
  onClose: () => void;
}) {
  const [format, setFormat] = useState<ExportFormat>('xlsx');
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const formatInput = useRef<HTMLSelectElement>(null);
  const close = () => { if (!exporting) onClose(); };

  async function download() {
    setError('');
    setExporting(true);
    try {
      await downloadAgreementExport(workshop, agreement, version, format);
      onClose();
    } catch {
      setError('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <Dialog open onClose={close} initialFocus={formatInput} className="relative z-50">
      <div className="fixed inset-0 bg-brand-dark/60" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-300 px-6 py-5">
              <div>
                <Dialog.Title className="text-xl font-semibold text-brand-dark">Export agreement</Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-gray-500">Choose a file format for the selected price version.</Dialog.Description>
              </div>
              <button type="button" onClick={close} disabled={exporting} aria-label="Close export"
                className="rounded-md p-1 text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-5 px-6 py-5">
              <div className={`rounded-md border border-gray-300 p-4 text-sm ${version.status === 'Historical' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                <p className="font-semibold text-brand-dark">{agreement.name}</p>
                <p className="mt-1 text-gray-800">{workshop} · {agreement.insurer}</p>
                <p className="mt-3 font-semibold text-brand-dark">{version.label} · {version.status === 'Historical' ? 'Historical version — not current prices' : 'Current prices'}</p>
                <p className="mt-1 text-gray-800">Valid from {version.from}{version.to && ` to ${version.to}`}</p>
              </div>
              <p className="text-sm text-gray-500">All {version.lines.length} price lines. Search filters do not apply.</p>
              <label className="block text-sm font-medium text-gray-800">File format
                <select ref={formatInput} value={format} disabled={exporting} onChange={e => setFormat(e.target.value as ExportFormat)}
                  className="mt-2 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary">
                  <option value="xlsx">Excel (.xlsx)</option>
                  <option value="csv">CSV (.csv)</option>
                </select>
              </label>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              {exporting && <p role="status" className="text-sm text-gray-500">Preparing export…</p>}
            </div>
            <div className="flex flex-wrap justify-end gap-3 border-t border-gray-300 px-6 py-4">
              <button type="button" onClick={close} disabled={exporting}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50">Cancel</button>
              <button type="button" onClick={download} disabled={exporting || !version.lines.length}
                className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                Export {version.label} ({format === 'xlsx' ? 'Excel' : 'CSV'})
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
