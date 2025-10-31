import React, { useState, useEffect } from 'react';
import { Receipt, CreditCard, Hash, Eye, AlertCircle, Calendar, FileText } from 'lucide-react';
import { WorkshopCase, deleteInvoice, getCaseById, SectionApprovalStatus } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';
import FileUploadSection from './FileUploadSection';

// Memoized currency formatter
const currencyFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: 'NOK'
});

interface InvoiceFileManagementProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
  onFileUpload: (file: File) => void;
  isSectionComplete?: boolean;
  approvalStatus?: SectionApprovalStatus;
}

const InvoiceFileManagement: React.FC<InvoiceFileManagementProps> = ({
  caseData,
  onUpdate,
  onFileUpload,
  isSectionComplete = true,
  approvalStatus
}) => {
  // Local state for metadata fields
  const [kidNumber, setKidNumber] = useState(caseData.invoice?.kid || '');
  const [totalAmount, setTotalAmount] = useState(caseData.invoice?.totalAmount?.toString() || '');
  const [invoiceNumber, setInvoiceNumber] = useState(caseData.invoice?.invoiceNumber || '');
  const [dueDate, setDueDate] = useState(caseData.invoice?.dueDate ? new Date(caseData.invoice.dueDate).toISOString().split('T')[0] : '');

  // Update local state when caseData changes
  useEffect(() => {
    setKidNumber(caseData.invoice?.kid || '');
    setTotalAmount(caseData.invoice?.totalAmount?.toString() || '');
    setInvoiceNumber(caseData.invoice?.invoiceNumber || '');
    setDueDate(caseData.invoice?.dueDate ? new Date(caseData.invoice.dueDate).toISOString().split('T')[0] : '');
  }, [caseData]);

  // Handle metadata updates
  const handleMetadataUpdate = (field: string, value: string) => {
    switch (field) {
      case 'kidNumber':
        setKidNumber(value);
        onUpdate({
          invoice: {
            ...caseData.invoice,
            kid: value,
            invoiceNumber: caseData.invoice?.invoiceNumber || invoiceNumber || `INV-${Date.now()}`,
            issueDate: caseData.invoice?.issueDate || new Date().toISOString(),
            dueDate: caseData.invoice?.dueDate || (dueDate ? new Date(dueDate).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
            fileUrl: caseData.invoice?.fileUrl || '#'
          }
        });
        break;
      case 'totalAmount':
        const amount = parseFloat(value) || 0;
        setTotalAmount(value);
        onUpdate({
          invoice: {
            ...caseData.invoice,
            totalAmount: amount,
            invoiceNumber: caseData.invoice?.invoiceNumber || invoiceNumber || `INV-${Date.now()}`,
            issueDate: caseData.invoice?.issueDate || new Date().toISOString(),
            dueDate: caseData.invoice?.dueDate || (dueDate ? new Date(dueDate).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
            fileUrl: caseData.invoice?.fileUrl || '#',
            kid: caseData.invoice?.kid || kidNumber
          }
        });
        break;
      case 'invoiceNumber':
        setInvoiceNumber(value);
        onUpdate({
          invoice: {
            ...caseData.invoice,
            invoiceNumber: value,
            issueDate: caseData.invoice?.issueDate || new Date().toISOString(),
            dueDate: caseData.invoice?.dueDate || (dueDate ? new Date(dueDate).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
            fileUrl: caseData.invoice?.fileUrl || '#',
            kid: caseData.invoice?.kid || kidNumber,
            totalAmount: caseData.invoice?.totalAmount || parseFloat(totalAmount) || 0
          }
        });
        break;
      case 'dueDate':
        setDueDate(value);
        onUpdate({
          invoice: {
            ...caseData.invoice,
            dueDate: new Date(value).toISOString(),
            invoiceNumber: caseData.invoice?.invoiceNumber || invoiceNumber || `INV-${Date.now()}`,
            issueDate: caseData.invoice?.issueDate || new Date().toISOString(),
            fileUrl: caseData.invoice?.fileUrl || '#',
            kid: caseData.invoice?.kid || kidNumber,
            totalAmount: caseData.invoice?.totalAmount || parseFloat(totalAmount) || 0
          }
        });
        break;
    }
  };

  // Handle invoice file deletion
  const handleDeleteInvoiceFile = (fileId: string) => {
    const success = deleteInvoice(caseData.id);
    if (success) {
      // Refresh the case data to reflect the changes
      const updatedCase = getCaseById(caseData.id);
      if (updatedCase) {
        onUpdate(updatedCase);
        // Clear local state
        setKidNumber('');
        setTotalAmount('');
        setInvoiceNumber('');
        setDueDate('');
      }
    }
  };

  // Check if invoice is complete
  const hasInvoiceFile = !!caseData.invoice;
  const isComplete = hasInvoiceFile && kidNumber && totalAmount && invoiceNumber && dueDate;

  // Prepare existing invoice files
  const existingInvoiceFiles = caseData.invoice ? [{
    id: 'invoice-main',
    name: `Faktura ${caseData.invoice.invoiceNumber}.pdf`,
    url: caseData.invoice.fileUrl,
    type: 'document'
  }] : [];

  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  return (
    <SectionWrapper
      title="Invoice"
      isRequired={true}
      isComplete={isComplete}
      isSectionComplete={isSectionComplete}
      approvalStatus={approvalStatus}
    >
      <div className="space-y-5">
        {/* Upload Section - Fixed height container */}
        <div className="">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Upload Document</h4>
          <FileUploadSection
            fileTypeLabel="Invoice files"
            allowedFileTypes=".pdf,.doc,.docx,.xls,.xlsx"
            onFileUpload={onFileUpload}
            existingFiles={existingInvoiceFiles}
            onDeleteFile={handleDeleteInvoiceFile}
          />
        </div>

        {/* Metadata Fields */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Document Information</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Invoice Number */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => handleMetadataUpdate('invoiceNumber', e.target.value)}
                  placeholder="INV-2024-001"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* KID Number */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  KID Number
                </label>
                <input
                  type="text"
                  value={kidNumber}
                  onChange={(e) => handleMetadataUpdate('kidNumber', e.target.value)}
                  placeholder="123456789"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors font-mono"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => handleMetadataUpdate('dueDate', e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Total Amount */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  Total Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => handleMetadataUpdate('totalAmount', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors pr-12"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-xs">NOK</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {formatCurrency(parseFloat(totalAmount) || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </SectionWrapper>
  );
};

export default InvoiceFileManagement;