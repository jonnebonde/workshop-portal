import type { Calibration, CalibrationRequirement, CalibrationSourceValue } from '../data/mockData';

const normalizeRequirement = (value: CalibrationSourceValue | undefined): CalibrationRequirement => {
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  return value ? value.toLowerCase() as CalibrationRequirement : 'no';
};

export const getCalibrationRequirement = (calibration: Calibration | undefined): CalibrationRequirement => {
  if (calibration?.pidRequiresCalibration === undefined && calibration?.arRequiresCalibration === undefined) {
    return calibration?.required ? 'yes' : 'no';
  }

  const sources = [calibration?.pidRequiresCalibration, calibration?.arRequiresCalibration].map(normalizeRequirement);
  if (sources.includes('yes')) return 'yes';
  return sources.includes('possible') ? 'possible' : 'no';
};

export const getCalibrationState = (calibration: Calibration | undefined) => {
  const sourceRequirement = getCalibrationRequirement(calibration);
  const isPossible = sourceRequirement === 'possible';
  const needsAssessment = isPossible && !calibration?.workshopAssessment;
  const requiresCalibration = isPossible
    ? calibration?.workshopAssessment === 'required'
    : sourceRequirement === 'yes'
      ? calibration?.workshopDisagrees !== true
      : calibration?.workshopRequiresCalibration === true;
  const needsOverrideReason = sourceRequirement === 'yes' && calibration?.workshopDisagrees === true;

  const isComplete = !!calibration && !needsAssessment && (
    needsOverrideReason
      ? !!calibration.comment?.trim()
      : !requiresCalibration || (
        calibration.confirmed === true &&
        !!calibration.signature?.trim() &&
        !!calibration.files?.length
      )
  );

  return { sourceRequirement, needsAssessment, requiresCalibration, needsOverrideReason, isComplete };
};
