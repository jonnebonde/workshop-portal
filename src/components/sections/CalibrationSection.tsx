import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { WorkshopCase, SectionApprovalStatus } from '../../data/mockData';
import { getCalibrationState } from '../../utils/calibration';
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
  const { sourceRequirement, needsAssessment, requiresCalibration, needsOverrideReason, isComplete } = getCalibrationState(calibration);
  const sourceRequiresCalibration = sourceRequirement === 'yes';
  const workshopRequiresCalibration = calibration?.workshopRequiresCalibration === true;
  const workshopDisagrees = calibration?.workshopDisagrees === true;
  const existingCalibrationFiles = (calibration?.files || []).map(file => ({ id: file.id, name: file.name, url: file.url, type: file.type }));

  const applyDeveloperStatus = (status: string) => {
    const sourceStatus = {
      'source-required': { pidRequiresCalibration: true, arRequiresCalibration: false, calibrationType: 'dynamic' as const },
      'source-disagree': { pidRequiresCalibration: true, arRequiresCalibration: false, calibrationType: 'static' as const, workshopDisagrees: true },
      'source-workshop-completed': { pidRequiresCalibration: false, arRequiresCalibration: false, calibrationType: 'static' as const, workshopRequiresCalibration: true },
      'source-possible': { pidRequiresCalibration: 'Possible' as const, arRequiresCalibration: false, calibrationType: undefined },
      'source-not-required': { pidRequiresCalibration: false, arRequiresCalibration: false, calibrationType: undefined }
    }[status];
    if (sourceStatus) onUpdate({
      calibration: {
        ...calibration,
        ...sourceStatus,
        workshopDisagrees: status === 'source-disagree',
        workshopRequiresCalibration: status === 'source-workshop-completed',
        workshopAssessment: undefined,
        confirmed: false,
        signature: ''
      },
      calibrationApprovalStatus: 'incomplete'
    });
  };

  const developerStatus = sourceRequirement === 'possible' ? 'source-possible' : calibration?.workshopDisagrees ? 'source-disagree' : workshopRequiresCalibration ? 'source-workshop-completed' : sourceRequiresCalibration ? 'source-required' : 'source-not-required';

  const handleAssessment = (assessment: 'required' | 'not_required') => {
    onUpdate({
      calibration: {
        ...calibration,
        workshopAssessment: assessment,
        confirmed: false,
        signature: ''
      },
      calibrationApprovalStatus: 'incomplete'
    });
  };

  return (
    <SectionWrapper title="Calibration" isRequired={true} isComplete={isComplete} isSectionComplete={isSectionComplete && isComplete} approvalStatus={needsAssessment ? 'incomplete' : approvalStatus}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <button type="button" onClick={() => setIsDeveloperMode(prev => !prev)} className={`rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${isDeveloperMode ? 'border-orange-600 bg-orange-500 text-white shadow-sm' : 'border-orange-500 bg-white text-orange-700 hover:bg-orange-50'}`}>
            Developer mode
          </button>
        </div>

        {isDeveloperMode && (
          <div className="rounded-md border border-dashed border-orange-300 bg-orange-50 p-3">
            <p className="mb-2 text-sm font-semibold text-gray-900">API response</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                ['source-required', 'Yes — Calibration required'],
                ['source-possible', 'Possible — Inspect vehicle'],
                ['source-not-required', 'No — Calibration not required']
              ].map(([value, label]) => (
                <button key={value} type="button" aria-pressed={developerStatus === value} onClick={() => applyDeveloperStatus(value)} className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors ${developerStatus === value ? 'border-orange-600 bg-orange-500 text-white shadow-sm' : 'border-orange-300 bg-white text-orange-700 hover:bg-orange-100'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="mb-2 mt-4 text-sm font-semibold text-gray-900">Workshop overrides</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                ['source-disagree', 'Yes / workshop marks not required'],
                ['source-workshop-completed', 'No / workshop marks required']
              ].map(([value, label]) => (
                <button key={value} type="button" aria-pressed={developerStatus === value} onClick={() => applyDeveloperStatus(value)} className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors ${developerStatus === value ? 'border-orange-600 bg-orange-500 text-white shadow-sm' : 'border-orange-300 bg-white text-orange-700 hover:bg-orange-100'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Local override for testing.</p>
          </div>
        )}

        {sourceRequirement === 'possible' && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
       
              <div>
                <h4 className="text-base font-semibold text-gray-900">Calibration may be required</h4>
                <p id="calibration-inspection-guidance" className="mt-1 text-sm text-gray-700">
                  The vehicle information indicates that calibration may be needed.
                </p>
              </div>
            </div>

            <fieldset className="mt-5" aria-describedby="calibration-inspection-guidance">
              <legend className="text-sm font-semibold text-gray-900">What did the vehicle inspection show?</legend>
              <p className="mt-1 text-sm text-gray-700">Select the result once you have checked the vehicle.</p>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  { value: 'required' as const, title: 'Calibration is required', description: 'Complete the calibration, then upload documentation and sign.' },
                  { value: 'not_required' as const, title: 'Calibration is not required', description: 'Record this assessment and continue. No explanation is needed.' }
                ].map(option => (
                  <label key={option.value} className={`flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-4 ${calibration?.workshopAssessment === option.value ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                    <input
                      type="radio"
                      name="calibration-inspection-result"
                      value={option.value}
                      checked={calibration?.workshopAssessment === option.value}
                      onChange={() => handleAssessment(option.value)}
                      className="mt-1 h-4 w-4 flex-shrink-0 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-gray-900">{option.title}</span>
                      <span className="mt-1 block text-sm text-gray-700">{option.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p role="status" className="mt-4 text-sm font-medium text-gray-900">
              {needsAssessment
                ? 'Awaiting vehicle inspection. Choose a result to complete this section.'
                : requiresCalibration
                  ? 'Next: complete the calibration details below.'
                  : 'Assessment recorded: calibration is not required. You can continue with the case.'}
            </p>
          </div>
        )}

        {sourceRequirement === 'no' && (
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

        {requiresCalibration && (
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
              <p className="mb-2 text-sm font-medium text-gray-700">Confirmation <span className="text-red-600">*</span></p>
              <label htmlFor="calibrationConfirmation" className="flex cursor-pointer items-start rounded-md border border-gray-200 bg-gray-50 p-3 hover:border-gray-300">
                <input id="calibrationConfirmation" type="checkbox" checked={calibration?.confirmed || false} onChange={(e) => onUpdate({ calibration: { ...calibration, confirmed: e.target.checked } })} className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 block text-sm text-gray-900">
                  I confirm that the workshop has carried out the necessary work according to the car manufacturer's requirements and instructions. The workshop has the necessary expertise, tools and equipment to carry this out.
                </span>
              </label>
            </div>
            <div className="mt-4">
              <label htmlFor="calibrationSignature" className="mb-1 block text-sm font-medium text-gray-700">Signature <span className="text-red-600">*</span></label>
              <p className="mb-2 text-xs text-gray-500">Sign when the calibration is complete and the documentation has been uploaded.</p>
              <input id="calibrationSignature" type="text" value={calibration?.signature || ''} onChange={(e) => onUpdate({ calibration: { ...calibration, signature: e.target.value } })} placeholder="Enter full name" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm lg:max-w-md" />
            </div>
          </div>
        )}

        {needsOverrideReason && (
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
