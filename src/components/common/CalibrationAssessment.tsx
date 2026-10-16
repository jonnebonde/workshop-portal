import type { Calibration } from '../../data/mockData';

interface CalibrationAssessmentProps {
  assessment: Calibration['workshopAssessment'];
  onAssessment: (assessment: NonNullable<Calibration['workshopAssessment']>) => void;
}

const CalibrationAssessment = ({ assessment, onAssessment }: CalibrationAssessmentProps) => (
  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
    <h4 className="text-base font-semibold text-gray-900">Calibration may be required</h4>
    <p id="calibration-inspection-guidance" className="mt-1 text-sm text-gray-700">
      The vehicle information indicates that calibration may be needed.
    </p>

    <fieldset className="mt-5" aria-describedby="calibration-inspection-guidance">
      <legend className="text-sm font-semibold text-gray-900">What did the vehicle inspection show?</legend>
      <p className="mt-1 text-sm text-gray-700">Select the result once you have checked the vehicle.</p>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        {[
          { value: 'required' as const, title: 'Calibration is required', description: 'Complete the calibration, then upload documentation and sign.' },
          { value: 'not_required' as const, title: 'Calibration is not required', description: 'Record this assessment and continue. No explanation is needed.' }
        ].map(option => (
          <label key={option.value} className={`flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-4 ${assessment === option.value ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
            <input
              type="radio"
              name="calibration-inspection-result"
              value={option.value}
              checked={assessment === option.value}
              onChange={() => onAssessment(option.value)}
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
      {!assessment
        ? 'Awaiting vehicle inspection. Choose a result to complete this section.'
        : assessment === 'required'
          ? 'Next: complete the calibration details below.'
          : 'Assessment recorded: calibration is not required. You can continue with the case.'}
    </p>
  </div>
);

export default CalibrationAssessment;
