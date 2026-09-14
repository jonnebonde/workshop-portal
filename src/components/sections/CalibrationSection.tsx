import React, { useState } from 'react';
import { WorkshopCase, SectionApprovalStatus } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';
import FileUploadSection from './FileUploadSection';

interface CalibrationSectionProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
  onFileUpload: (file: File) => void;
  onDeleteFile?: (fileId: string) => void;
  isSectionComplete?: boolean;
  approvalStatus?: SectionApprovalStatus;
}

const CalibrationSection: React.FC<CalibrationSectionProps> = ({ caseData, onUpdate, onFileUpload, onDeleteFile, isSectionComplete = true, approvalStatus }) => {
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const calibration = caseData.calibration;
  const sourceRequiresCalibration = calibration?.pidRequiresCalibration === true || calibration?.arRequiresCalibration === true;
  const workshopRequiresCalibration = calibration?.workshopRequiresCalibration === true;
  const workshopDisagrees = calibration?.workshopDisagrees === true;
  const calibrationRequired = sourceRequiresCalibration ? !workshopDisagrees : workshopRequiresCalibration;
  const isComplete = sourceRequiresCalibration && workshopDisagrees
    ? !!calibration?.comment?.trim()
    : !calibrationRequired || (!!calibration?.signature?.trim() && !!calibration.files?.length);
  const existingCalibrationFiles = (calibration?.files || []).map(file => ({ id: file.id, name: file.name, url: file.url, type: file.type }));

  const applyDeveloperStatus = (status: string) => {
    const sourceStatus = {
      'source-required': { pidRequiresCalibration: true, arRequiresCalibration: false, calibrationType: 'dynamic' as const },
      'source-disagree': { pidRequiresCalibration: true, arRequiresCalibration: false, calibrationType: 'static' as const, workshopDisagrees: true },
      'source-workshop-completed': { pidRequiresCalibration: false, arRequiresCalibration: false, calibrationType: 'static' as const, workshopRequiresCalibration: true },
      'source-not-required': { pidRequiresCalibration: false, arRequiresCalibration: false, calibrationType: undefined }
    }[status];
    if (sourceStatus) onUpdate({ calibration: { ...calibration, ...sourceStatus, workshopDisagrees: status === 'source-disagree', workshopRequiresCalibration: status === 'source-workshop-completed' } });
  };

  const developerStatus = calibration?.workshopDisagrees ? 'source-disagree' : workshopRequiresCalibration ? 'source-workshop-completed' : sourceRequiresCalibration ? 'source-required' : 'source-not-required';

  return (
    <SectionWrapper title="Calibration" isRequired={true} isComplete={isComplete} isSectionComplete={isSectionComplete} approvalStatus={approvalStatus}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <button type="button" onClick={() => setIsDeveloperMode(prev => !prev)} className={`rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${isDeveloperMode ? 'border-orange-600 bg-orange-500 text-white shadow-sm' : 'border-orange-500 bg-white text-orange-700 hover:bg-orange-50'}`}>
            Developer mode
          </button>
        </div>

        {isDeveloperMode && (
          <div className="rounded-md border border-dashed border-orange-300 bg-orange-50 p-3">
            <p className="mb-2 text-sm font-semibold text-slate-800">Select calibration scenario</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ['source-required', 'SOT: Required / workshop confirms'],
                ['source-disagree', 'SOT: Required / workshop challenges'],
                ['source-workshop-completed', 'SOT: Not required / workshop challenges'],
                ['source-not-required', 'SOT: Not required / workshop confirms']
              ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => applyDeveloperStatus(value)} className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors ${developerStatus === value ? 'border-orange-600 bg-orange-500 text-white shadow-sm' : 'border-orange-300 bg-white text-orange-700 hover:bg-orange-100'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Local override for testing.</p>
          </div>
        )}

        {!sourceRequiresCalibration && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Calibration is marked as not required</p>
            <p className="mt-1 text-sm text-gray-600">Based on the case information, calibration is not required.</p>
            <label htmlFor="workshopRequiresCalibration" className="mt-4 flex cursor-pointer items-start rounded-md border border-gray-200 bg-white p-3 hover:border-gray-300">
              <input type="checkbox" id="workshopRequiresCalibration" checked={workshopRequiresCalibration} onChange={(e) => onUpdate({ calibration: { ...calibration, workshopRequiresCalibration: e.target.checked } })} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 block text-sm font-medium text-gray-900">Mark calibration as required</span>
            </label>
          </div>
        )}

        {sourceRequiresCalibration && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Calibration is marked as required</p>
            <p className="mt-1 text-sm text-gray-600">Based on the case information, calibration is required.</p>
            <label htmlFor="workshopDisagrees" className="mt-4 flex cursor-pointer items-start rounded-md border border-gray-200 bg-white p-3 hover:border-gray-300">
              <input type="checkbox" id="workshopDisagrees" checked={workshopDisagrees} onChange={(e) => onUpdate({ calibration: { ...calibration, workshopDisagrees: e.target.checked } })} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 block text-sm font-medium text-gray-900">Mark calibration as not required</span>
            </label>
          </div>
        )}

        {calibrationRequired && (
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <h4 className="text-base font-semibold text-slate-900">Calibration details</h4>
            <p className="mt-1 text-sm text-gray-600">Upload documentation from the completed calibration and sign when the work is finished.</p>
            <div className="mt-4">
              <p className="mb-1 text-sm font-medium text-gray-700">Documentation <span className="text-red-600">*</span></p>
              <p className="mb-2 text-xs text-gray-500">Required to complete this section.</p>
              <FileUploadSection fileTypeLabel="calibration documentation" allowedFileTypes=".pdf,.doc,.docx,image/*" onFileUpload={onFileUpload} existingFiles={existingCalibrationFiles} onDeleteFile={onDeleteFile} uploadPrompt="Drop the documentation here or click to browse" uploadHint="PDF, Word or image" />
            </div>
            <div className="mt-4">
              <label htmlFor="calibrationComment" className="mb-2 block text-sm font-medium text-gray-700">Comment (optional)</label>
              <textarea id="calibrationComment" value={calibration?.comment || ''} onChange={(e) => onUpdate({ calibration: { ...calibration, comment: e.target.value } })} rows={3} placeholder="Add any relevant information" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <label htmlFor="calibrationSignature" className="mb-1 block text-sm font-medium text-gray-700">Signature <span className="text-red-600">*</span></label>
              <p className="mb-2 text-xs text-gray-500">Sign when the calibration is complete and the documentation has been uploaded.</p>
              <input id="calibrationSignature" type="text" value={calibration?.signature || ''} onChange={(e) => onUpdate({ calibration: { ...calibration, signature: e.target.value } })} placeholder="Enter full name" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm lg:max-w-md" />
            </div>
          </div>
        )}

        {sourceRequiresCalibration && workshopDisagrees && (
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <h4 className="text-base font-semibold text-slate-900">Calibration requirement change</h4>
            <p className="mt-1 text-sm text-gray-600">Provide a reason for changing the calibration requirement.</p>
            <div className="mt-4">
              <label htmlFor="calibrationChallengeComment" className="mb-1 block text-sm font-medium text-gray-700">Reason <span className="text-red-600">*</span></label>
              <p className="mb-2 text-xs text-gray-500">Required to complete this section.</p>
              <textarea id="calibrationChallengeComment" value={calibration?.comment || ''} onChange={(e) => onUpdate({ calibration: { ...calibration, comment: e.target.value } })} rows={3} placeholder="Describe why calibration is not required" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
            </div>
            <div className="mt-4">
              <p className="mb-1 text-sm font-medium text-gray-700">Supporting documentation (optional)</p>
              <p className="mb-2 text-xs text-gray-500">Attach documentation that supports the change.</p>
              <FileUploadSection fileTypeLabel="supporting documentation" allowedFileTypes=".pdf,.doc,.docx,image/*" onFileUpload={onFileUpload} existingFiles={existingCalibrationFiles} onDeleteFile={onDeleteFile} uploadPrompt="Drop supporting documentation here or click to browse" uploadHint="PDF, Word or image" />
            </div>
          </div>
        )}

      </div>
    </SectionWrapper>
  );
};

export default CalibrationSection;
