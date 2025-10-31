import React from 'react';
import { Settings } from 'lucide-react';
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

const CalibrationSection: React.FC<CalibrationSectionProps> = ({
  caseData,
  onUpdate,
  onFileUpload,
  onDeleteFile,
  isSectionComplete = true,
  approvalStatus
}) => {

  // Calculate completion status based on calibration requirements
  const isComplete = caseData.calibration?.notNeeded ||
    (caseData.calibration?.required && caseData.calibration?.signature && caseData.calibration?.files && caseData.calibration.files.length > 0);

  // Prepare existing calibration files
  const existingCalibrationFiles = (caseData.calibration?.files || []).map(file => ({
    id: file.id,
    name: file.name,
    url: file.url,
    type: file.type
  }));

  return (
    <SectionWrapper
      title="Calibration"
      isRequired={true}
      isComplete={isComplete}
      isSectionComplete={isSectionComplete}
      approvalStatus={approvalStatus}
    >
      <div className="space-y-4">
        {/* Checkboxes in horizontal layout */}
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="calibrationNotNeeded"
              checked={caseData.calibration?.notNeeded || false}
              onChange={(e) => onUpdate({
                calibration: {
                  ...caseData.calibration,
                  notNeeded: e.target.checked,
                  required: e.target.checked ? false : caseData.calibration?.required || false
                }
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="calibrationNotNeeded" className="ml-2 block text-sm text-gray-900">
              Calibration not needed
            </label>
          </div>

          {!caseData.calibration?.notNeeded && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="calibrationNeeded"
                checked={caseData.calibration?.required || false}
                onChange={(e) => onUpdate({
                  calibration: { ...caseData.calibration, required: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="calibrationNeeded" className="ml-2 block text-sm text-gray-900">
                Calibration needed
              </label>
            </div>
          )}
        </div>

        {/* Show calibration form only if calibration is needed and not marked as "not needed" */}
        {caseData.calibration?.required && !caseData.calibration?.notNeeded && (
          <div className="grid grid-cols-2 gap-4">
            {/* Upload Section */}
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Upload Document (optional)</h4> 
              <div className="flex-1">
                <FileUploadSection
                  fileTypeLabel="Calibration file"
                  allowedFileTypes=".pdf,.doc,.docx"
                  onFileUpload={onFileUpload}
                  existingFiles={existingCalibrationFiles}
                  onDeleteFile={onDeleteFile}
                />
              </div>
            </div>

            {/* Metadata Fields */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Calibration Information</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-3">
                  {/* Confirmation Checkbox */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="calibrationConfirmation"
                      checked={caseData.calibration?.confirmed || false}
                      onChange={(e) => onUpdate({
                        calibration: { ...caseData.calibration, confirmed: e.target.checked }
                      })}
                      className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                    />
                    <label htmlFor="calibrationConfirmation" className="ml-2 block text-sm text-gray-900">
                      I confirm that the workshop has carried out the necessary work according to the car manufacturer's requirements and instructions. The workshop has the necessary expertise, tools and equipment to carry this out.
                    </label>
                  </div>

                  {/* Digital Signature */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Digital Signature
                    </label>
                    <input
                      type="text"
                      value={caseData.calibration?.signature || ''}
                      onChange={(e) => onUpdate({
                        calibration: { ...caseData.calibration, signature: e.target.value }
                      })}
                      placeholder="Enter your full name"
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Confirm calibration performed per specifications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show message when calibration is not needed */}
        {caseData.calibration?.notNeeded && (
          <div className="bg-green-50 border border-green-200 rounded-md p-2">
            <div className="flex items-center">
              <Settings className="h-4 w-4 text-green-400 flex-shrink-0" />
              <p className="ml-2 text-xs text-green-700">
                Calibration not required for this case
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default CalibrationSection;