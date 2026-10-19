import type { CalibrationData } from '../types/case';
import { getCalibrationState } from '../../../utils/calibration';

export const getCreationCalibrationState = (calibration: CalibrationData) =>
  getCalibrationState(calibration, !!calibration.document);

export const isCalibrationComplete = (calibration: CalibrationData): boolean => {
  return getCreationCalibrationState(calibration).isComplete;
};
