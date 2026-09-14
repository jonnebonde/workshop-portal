import React, { useState } from 'react';
import { Bug, Settings } from 'lucide-react';
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
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <button type="button" onClick={() => setIsDeveloperMode(prev => !prev)} className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${isDeveloperMode ? 'border-amber-500 bg-amber-500 text-gray-950 shadow-sm' : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
            <Bug className="h-4 w-4" /> Developer mode
          </button>
        </div>

        {isDeveloperMode && (
          <div className="rounded-md border border-dashed border-amber-300 bg-amber-50 p-3">
            <p className="mb-2 text-sm font-semibold text-slate-800">Select calibration scenario</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ['source-required', 'SOT: Required / workshop confirms'],
                ['source-disagree', 'SOT: Required / workshop challenges'],
                ['source-workshop-completed', 'SOT: Not required / workshop challenges'],
                ['source-not-required', 'SOT: Not required / workshop confirms']
              ].map(([value, label]) => (
                <button key={value} type="button" onClick={() => applyDeveloperStatus(value)} className={`rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors ${developerStatus === value ? 'border-amber-500 bg-amber-500 text-gray-950 shadow-sm' : 'border-amber-300 bg-white text-amber-700 hover:bg-amber-100'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Local override for testing.</p>
          </div>
        )}

        {!sourceRequiresCalibration && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-700">Kalibrering er ikke registrert som nødvendig for denne saken.</p>
            <div className="mt-3 flex items-start">
              <input type="checkbox" id="workshopRequiresCalibration" checked={workshopRequiresCalibration} onChange={(e) => onUpdate({ calibration: { ...calibration, workshopRequiresCalibration: e.target.checked } })} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="workshopRequiresCalibration" className="ml-2 block text-sm text-gray-900">Kalibrering er likevel nødvendig</label>
            </div>
          </div>
        )}

        {sourceRequiresCalibration && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-700">Kalibrering er registrert som nødvendig for denne saken.</p>
            <div className="mt-3 flex items-start">
              <input type="checkbox" id="workshopDisagrees" checked={workshopDisagrees} onChange={(e) => onUpdate({ calibration: { ...calibration, workshopDisagrees: e.target.checked } })} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="workshopDisagrees" className="ml-2 block text-sm text-gray-900">Kalibrering er ikke nødvendig</label>
            </div>
          </div>
        )}

        {calibrationRequired && (
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <h4 className="text-base font-semibold text-slate-900">Kalibreringsdata</h4>
            <p className="mt-1 text-sm text-gray-600">Legg ved dokumentasjon fra utført kalibrering og signer når arbeidet er ferdig.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="calibrationSignature" className="mb-2 block text-sm font-medium text-gray-700">Signatur</label>
                <input id="calibrationSignature" type="text" value={calibration?.signature || ''} onChange={(e) => onUpdate({ calibration: { ...calibration, signature: e.target.value } })} placeholder="Skriv fullt navn" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Dokumentasjon</p>
                <FileUploadSection fileTypeLabel="Kalibreringsdokumentasjon" allowedFileTypes=".pdf,.doc,.docx,image/*" onFileUpload={onFileUpload} existingFiles={existingCalibrationFiles} onDeleteFile={onDeleteFile} />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="calibrationComment" className="mb-2 block text-sm font-medium text-gray-700">Kommentar (valgfritt)</label>
              <textarea id="calibrationComment" value={calibration?.comment || ''} onChange={(e) => onUpdate({ calibration: { ...calibration, comment: e.target.value } })} rows={3} placeholder="Legg til eventuell relevant informasjon" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
            </div>
          </div>
        )}

        {sourceRequiresCalibration && workshopDisagrees && (
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <h4 className="text-base font-semibold text-slate-900">Begrunnelse</h4>
            <p className="mt-1 text-sm text-gray-600">Forklar hvorfor verkstedet vurderer at kalibrering ikke er nødvendig.</p>
            <div className="mt-4">
              <label htmlFor="calibrationChallengeComment" className="mb-2 block text-sm font-medium text-gray-700">Begrunnelse</label>
              <textarea id="calibrationChallengeComment" value={calibration?.comment || ''} onChange={(e) => onUpdate({ calibration: { ...calibration, comment: e.target.value } })} rows={3} placeholder="Legg til begrunnelse" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm" />
            </div>
          </div>
        )}

        {!calibrationRequired && !workshopDisagrees && (
          <div className="rounded-md border border-green-200 bg-green-50 p-2">
            <div className="flex items-center">
              <Settings className="h-4 w-4 flex-shrink-0 text-green-400" />
              <p className="ml-2 text-xs text-green-700">Ingen kalibreringsdata er nødvendig med mindre verkstedet vurderer at kalibrering må utføres.</p>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default CalibrationSection;
