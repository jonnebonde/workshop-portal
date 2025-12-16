import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Eye, AlertCircle, AlertTriangle, Activity, MapPin, Hash, Send } from 'lucide-react';
import { WorkshopCase, deleteDdfAttachment, getCaseById, glassTypes, causeOfDamageOptions, wearAndTearOptions, SectionApprovalStatus, addDdfSmsLog } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';
import FileUploadSection from './FileUploadSection';
import SendDdfSmsModal from '../SendDdfSmsModal';

interface DdfFileManagementProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
  onFileUpload: (file: File) => void;
  isSectionComplete?: boolean;
  approvalStatus?: SectionApprovalStatus;
}

const DdfFileManagement: React.FC<DdfFileManagementProps> = ({
  caseData,
  onUpdate,
  onFileUpload,
  isSectionComplete = true,
  approvalStatus
}) => {
  // Local state for metadata fields
  const [damageDate, setDamageDate] = useState(caseData.assessment?.damageDate || '');
  const [glassType, setGlassType] = useState(caseData.assessment?.glassType || '');
  const [repairFinishedDate, setRepairFinishedDate] = useState(caseData.service?.repairFinishedDate || '');
  const [causeOfDamage, setCauseOfDamage] = useState(caseData.assessment?.causeOfDamage || '');
  const [wearAndTear, setWearAndTear] = useState(caseData.assessment?.wearAndTear || '');
  const [place, setPlace] = useState(caseData.assessment?.place || '');
  const claimId = caseData.assessment?.claimId || '';

  // SMS modal state
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);

  // Update local state when caseData changes
  useEffect(() => {
    setDamageDate(caseData.assessment?.damageDate || '');
    setGlassType(caseData.assessment?.glassType || '');
    setRepairFinishedDate(caseData.service?.repairFinishedDate || '');
    setCauseOfDamage(caseData.assessment?.causeOfDamage || '');
    setWearAndTear(caseData.assessment?.wearAndTear || '');
    setPlace(caseData.assessment?.place || '');
  }, [caseData]);

  // Handle metadata updates
  const handleMetadataUpdate = (field: string, value: string) => {
    switch (field) {
      case 'damageDate':
        setDamageDate(value);
        onUpdate({
          assessment: { ...caseData.assessment, damageDate: value }
        });
        break;
      case 'glassType':
        setGlassType(value);
        onUpdate({
          assessment: { ...caseData.assessment, glassType: value }
        });
        break;
      case 'repairFinishedDate':
        setRepairFinishedDate(value);
        onUpdate({
          service: { ...caseData.service, repairFinishedDate: value }
        });
        break;
      case 'causeOfDamage':
        setCauseOfDamage(value);
        onUpdate({
          assessment: { ...caseData.assessment, causeOfDamage: value }
        });
        break;
      case 'wearAndTear':
        setWearAndTear(value);
        onUpdate({
          assessment: { ...caseData.assessment, wearAndTear: value }
        });
        break;
      case 'place':
        setPlace(value);
        onUpdate({
          assessment: { ...caseData.assessment, place: value }
        });
        break;
    }
  };

  // Handle DDF file deletion
  const handleDeleteDdfFile = (fileId: string) => {
    const success = deleteDdfAttachment(caseData.id, fileId);
    if (success) {
      // Refresh the case data to reflect the changes
      const updatedCase = getCaseById(caseData.id);
      if (updatedCase) {
        onUpdate(updatedCase);
      }
    }
  };

  // Handle SMS send
  const handleSendSms = () => {
    addDdfSmsLog(caseData.id, caseData.customer.phone);
    // Refresh the case data to reflect the changes
    const updatedCase = getCaseById(caseData.id);
    if (updatedCase) {
      onUpdate(updatedCase);
    }
  };;

  // Check if DDF is complete
  const hasDdfFile = caseData.attachments.some(att =>
    att.type === 'document' && att.name.toLowerCase().includes('ddf')
  );
  const isComplete = hasDdfFile && caseData.assessment?.ddfStatus === 'complete';

  // Check if SMS has been sent
  const hasSmsSent = caseData.actionLog.some(log => log.actionType === 'sms_sent');

  // Determine if SMS button should be enabled
  const canSendSms = !hasDdfFile && !hasSmsSent;

  // Prepare existing DDF files
  const existingDdfFiles = caseData.attachments
    .filter(att => att.type === 'document' && att.name.toLowerCase().includes('ddf'))
    .map(att => ({
      id: att.id,
      name: att.name,
      url: att.url,
      type: att.type
    }));

  return (
    <SectionWrapper
      title="Digital Damage Form (DDF)"
      isRequired={true}
      isComplete={isComplete}
      isSectionComplete={isSectionComplete}
      approvalStatus={approvalStatus}
    >
      <div className="grid grid-cols-2  gap-4">
        {/* Upload Section */}
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Upload Document</h4>
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <FileUploadSection
                fileTypeLabel="DDF-file"
                allowedFileTypes=".pdf,.doc,.docx"
                onFileUpload={onFileUpload}
                existingFiles={existingDdfFiles} 
                onDeleteFile={handleDeleteDdfFile}
              />
            </div>

            {/* Claim ID - Read Only - Fixed at bottom */}
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Hash className="h-4 w-4 text-gray-500" />
                Claim ID Reference
              </label>
              <div className={`px-3 py-2 text-sm border rounded-lg font-mono ${
                claimId
                  ? 'bg-white border-gray-300 text-gray-900'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                {claimId || 'Not assigned'}
              </div>
            </div>

            {/* SMS Button */}
            <div className="mt-4">
              <button
                type="button"
                disabled={!canSendSms}
                onClick={() => setIsSmsModalOpen(true)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  canSendSms
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                }`}
              >
             
                Send DDF Link via SMS
              </button>
            </div>
          </div>
        </div>

        {/* Metadata Fields */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Document Information</h4> 
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Damage Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Damage Date
                </label>
                <input
                  type="date"
                  value={damageDate}
                  onChange={(e) => handleMetadataUpdate('damageDate', e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Glass Type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Glass Type
                </label>
                <select
                  value={glassType}
                  onChange={(e) => handleMetadataUpdate('glassType', e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select Glass Type</option>
                  {glassTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)} Glass</option>
                  ))}
                </select>
              </div>

              {/* Cause of Damage */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                  Cause of Damage
                </label>
                <select
                  value={causeOfDamage}
                  onChange={(e) => handleMetadataUpdate('causeOfDamage', e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select Cause</option>
                  {causeOfDamageOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Wear and Tear */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Activity className="h-4 w-4 text-gray-500" />
                  Wear and Tear
                </label>
                <select
                  value={wearAndTear}
                  onChange={(e) => handleMetadataUpdate('wearAndTear', e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select Wear Level</option>
                  {wearAndTearOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Place */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  Place
                </label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => handleMetadataUpdate('place', e.target.value)}
                  placeholder="e.g., the highway, at home"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Finished Repair Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Finished Repair Date
                </label>
                <input
                  type="date"
                  value={repairFinishedDate}
                  onChange={(e) => handleMetadataUpdate('repairFinishedDate', e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMS Modal */}
      <SendDdfSmsModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
        onConfirm={handleSendSms}
        phoneNumber={caseData.customer.phone}
      />
    </SectionWrapper>
  );
};

export default DdfFileManagement;