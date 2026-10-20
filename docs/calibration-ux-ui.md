# Calibration workflow

The Calibration section supports the source responses `yes`, `Possible` and `No`. `Possible` means the workshop must inspect the vehicle and decide whether calibration is necessary. The section stays incomplete until the workshop records that decision.

The same assessment and completion rules apply in:

- **Case Details**: the Calibration section on `/cases/:id`.
- **Create new case**: the Calibration section within the Parts & Labor step on `/new-case`.

The current application uses local mock data and component state. The fields described below belong to the frontend model.

## Source responses

| Source response | Meaning | Workshop action |
| --- | --- | --- |
| `yes` | Calibration is required according to the vehicle information. | Complete the calibration details, or mark calibration as not required and provide a reason. |
| `Possible` | Calibration may or may not be required. | Inspect the vehicle and explicitly select whether calibration is required. |
| `No` | Calibration is not required according to the vehicle information. | Continue, or mark calibration as required if the workshop identifies a need. |

The source response and the workshop's decision are stored separately. Choosing an inspection result does not replace `Possible` with `yes` or `No`.

## Possible assessment

The section shows **Calibration may be required** with the explanation **The vehicle information indicates that calibration may be needed.** Neither inspection option is selected initially.

After inspecting the vehicle, the workshop selects one of two options:

| Option | Next step | Completion requirements |
| --- | --- | --- |
| **Calibration is required** | Complete the calibration and fill in Calibration details. | Upload documentation, tick the confirmation and enter a signature. The comment is optional. |
| **Calibration is not required** | Record the assessment and continue with the case. | The selection alone completes the calibration section. No reason, documentation, confirmation or signature is required. |

Before a selection, the section shows **Awaiting vehicle inspection. Choose a result to complete this section.** After a selection, a status message explains whether to complete the details below or continue with the case.

The workshop can change its selection. Changing the assessment clears the confirmation and signature, so selecting required again needs a fresh confirmation and signature. Existing uploaded documentation and comments are retained.

## Existing Yes and No overrides

When the source says `yes`, the workshop can select **Mark calibration as not required**. This override requires a non-empty reason. Supporting documentation is optional. This differs from selecting not required after a `Possible` response, where no reason is required.

When the source says `No`, the workshop can select **Mark calibration as required**. The documentation, confirmation and signature requirements then apply.

## Completion and approval

| Calibration state | Section complete |
| --- | --- |
| `Possible`, with no workshop assessment | No |
| `Possible`, assessed as not required | Yes |
| Calibration required, with missing documentation, confirmation or signature | No |
| Calibration required, with documentation, confirmation and a non-empty signature | Yes |
| Source says `yes`, workshop marks not required, but the reason is missing | No |
| Source says `yes`, workshop marks not required and provides a reason | Yes |
| Source says `No`, with no workshop requirement | Yes |

### Case Details

An unresolved `Possible` response produces an `incomplete` status, even if the case previously had an approved calibration status. A completed section without an existing approval becomes `ready_for_approval`; completing the workshop assessment does not automatically approve it.

Calibration completion also contributes to case progress and the checks for finishing a case. If the assessment is missing, the completion guidance asks the workshop to inspect the vehicle and confirm whether calibration is required.

### Create new case

The normal Continue action from Parts & Labor requires repair items and completed calibration information. An unresolved `Possible` response or incomplete required calibration keeps this condition unmet.

The existing Save as Draft and Skip Step actions remain available. Skipping Parts & Labor marks the step as pending. Unresolved or incomplete calibration requires `manual_review` at submission and cannot produce `auto_approved`. Completed calibration still needs the other submission checks to pass before auto-approval is possible.

## Developer mode

Open **Developer mode** within the Calibration section on either page. Under **API response**, select:

- **Yes — Calibration required**
- **Possible — Inspect vehicle**
- **No — Calibration not required**

The **Workshop overrides** group also provides Yes with a not-required override and No with a required override.

Selecting a developer scenario resets the workshop assessment, confirmation and signature. Selecting Possible therefore starts with an unresolved assessment, even if the previous scenario was complete. Existing files and comments are retained.

## Frontend model and shared implementation

`pidRequiresCalibration` and `arRequiresCalibration` accept the three string responses and existing boolean values. The shared logic normalizes supported string casing to `yes`, `possible` and `no`. If either source says yes, the effective requirement is yes. Otherwise, Possible takes precedence over No. When both source fields are unset, the logic uses the legacy `required` flag.

`workshopAssessment` stores `required` or `not_required` for a Possible response. An unset assessment means the vehicle inspection result has not been recorded. The existing `workshopDisagrees` and `workshopRequiresCalibration` fields continue to represent overrides of Yes and No.

For example, an inspection that finds calibration unnecessary keeps the original source response:

```ts
{
  pidRequiresCalibration: 'Possible',
  arRequiresCalibration: false,
  workshopAssessment: 'not_required'
}
```

The implementation is shared through:

- [CalibrationAssessment.tsx](../src/components/common/CalibrationAssessment.tsx): the Possible explanation, choices and next-step messages used on both pages.
- [calibration.ts](../src/utils/calibration.ts): source normalization, effective requirement and completion rules.
- [Case Details CalibrationSection.tsx](../src/components/sections/CalibrationSection.tsx): case updates, attachments and section status.
- [Create new case CalibrationSection.tsx](../src/features/case-creation/components/CalibrationSection.tsx): creation state, document upload and developer scenarios.
- [Create new case calibration.ts](../src/features/case-creation/utils/calibration.ts): applies the shared completion rules using the uploaded `document`, while Case Details uses `files`.

## Verification

Run the calibration regression checks with:

```bash
npm run test:calibration
```

When checking the flow manually, verify that Possible starts without a selection, not required completes without a reason, and required stays incomplete until all three completion requirements are met. Also verify that switching assessments clears the confirmation and signature and that an unresolved assessment cannot be auto-approved through the creation workflow.
