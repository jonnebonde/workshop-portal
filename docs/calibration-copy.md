# Kalibrering – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](calibration-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-CAL-001 | title; [CalibrationSection.tsx:63](../src/components/sections/CalibrationSection.tsx#L63) | Calibration | |
| WP-CAL-002 | Synlig tekst; [CalibrationSection.tsx:67](../src/components/sections/CalibrationSection.tsx#L67) | Developer mode | |
| WP-CAL-003 | Synlig tekst; [CalibrationSection.tsx:73](../src/components/sections/CalibrationSection.tsx#L73) | API response | |
| WP-CAL-004 | Synlig tekst; [CalibrationSection.tsx:85](../src/components/sections/CalibrationSection.tsx#L85) | Workshop overrides | |
| WP-CAL-005 | Synlig tekst; [CalibrationSection.tsx:96](../src/components/sections/CalibrationSection.tsx#L96) | Local override for testing. | |
| WP-CAL-006 | Synlig tekst; [CalibrationSection.tsx:106](../src/components/sections/CalibrationSection.tsx#L106) | Calibration is marked as not required | |
| WP-CAL-007 | Synlig tekst; [CalibrationSection.tsx:107](../src/components/sections/CalibrationSection.tsx#L107) | Based on the case information, calibration is not required. | |
| WP-CAL-008 | Synlig tekst; [CalibrationSection.tsx:110](../src/components/sections/CalibrationSection.tsx#L110) | Mark calibration as required | |
| WP-CAL-009 | Synlig tekst; [CalibrationSection.tsx:117](../src/components/sections/CalibrationSection.tsx#L117) | Calibration is marked as required | |
| WP-CAL-010 | Synlig tekst; [CalibrationSection.tsx:118](../src/components/sections/CalibrationSection.tsx#L118) | Based on the case information, calibration is required. | |
| WP-CAL-011 | Synlig tekst; [CalibrationSection.tsx:121](../src/components/sections/CalibrationSection.tsx#L121) | Mark calibration as not required | |
| WP-CAL-012 | Synlig tekst; [CalibrationSection.tsx:128](../src/components/sections/CalibrationSection.tsx#L128) | Calibration details | |
| WP-CAL-013 | Synlig tekst; [CalibrationSection.tsx:129](../src/components/sections/CalibrationSection.tsx#L129) | Upload documentation from the completed calibration and sign when the work is finished. | |
| WP-CAL-014 | Synlig tekst; [CalibrationSection.tsx:131](../src/components/sections/CalibrationSection.tsx#L131) | Documentation | |
| WP-CAL-015 | Synlig tekst; [CalibrationSection.tsx:132](../src/components/sections/CalibrationSection.tsx#L132) | Required to complete this section. | |
| WP-CAL-016 | Synlig tekst; [CalibrationSection.tsx:136](../src/components/sections/CalibrationSection.tsx#L136) | Comment (optional) | |
| WP-CAL-017 | placeholder; [CalibrationSection.tsx:137](../src/components/sections/CalibrationSection.tsx#L137) | Add any relevant information | |
| WP-CAL-018 | Synlig tekst; [CalibrationSection.tsx:140](../src/components/sections/CalibrationSection.tsx#L140) | Confirmation | |
| WP-CAL-019 | Synlig tekst; [CalibrationSection.tsx:144](../src/components/sections/CalibrationSection.tsx#L144) | I confirm that the workshop has carried out the necessary work according to the car manufacturer's requirements and instructions. The workshop has the necessary expertise, tools and equipment to carry this out. | |
| WP-CAL-020 | Synlig tekst; [CalibrationSection.tsx:149](../src/components/sections/CalibrationSection.tsx#L149) | Signature | |
| WP-CAL-021 | Synlig tekst; [CalibrationSection.tsx:150](../src/components/sections/CalibrationSection.tsx#L150) | Sign when the calibration is complete and the documentation has been uploaded. | |
| WP-CAL-022 | placeholder; [CalibrationSection.tsx:151](../src/components/sections/CalibrationSection.tsx#L151) | Enter full name | |
| WP-CAL-023 | Synlig tekst; [CalibrationSection.tsx:158](../src/components/sections/CalibrationSection.tsx#L158) | Calibration requirement change | |
| WP-CAL-024 | Synlig tekst; [CalibrationSection.tsx:159](../src/components/sections/CalibrationSection.tsx#L159) | Provide a reason for changing the calibration requirement. | |
| WP-CAL-025 | Synlig tekst; [CalibrationSection.tsx:161](../src/components/sections/CalibrationSection.tsx#L161) | Reason | |
| WP-CAL-026 | Synlig tekst; [CalibrationSection.tsx:162](../src/components/sections/CalibrationSection.tsx#L162) | Required to complete this section. | |
| WP-CAL-027 | placeholder; [CalibrationSection.tsx:163](../src/components/sections/CalibrationSection.tsx#L163) | Describe why calibration is not required | |
| WP-CAL-028 | Synlig tekst; [CalibrationSection.tsx:166](../src/components/sections/CalibrationSection.tsx#L166) | Supporting documentation (optional) | |
| WP-CAL-029 | Synlig tekst; [CalibrationSection.tsx:167](../src/components/sections/CalibrationSection.tsx#L167) | Attach documentation that supports the change. | |
| WP-CAL-030 | Synlig tekst; [CalibrationAssessment.tsx:10](../src/components/common/CalibrationAssessment.tsx#L10) | Calibration may be required | |
| WP-CAL-031 | Synlig tekst; [CalibrationAssessment.tsx:12](../src/components/common/CalibrationAssessment.tsx#L12) | The vehicle information indicates that calibration may be needed. | |
| WP-CAL-032 | Etikett / valg; [CalibrationAssessment.tsx:19](../src/components/common/CalibrationAssessment.tsx#L19) | Calibration is required | |
| WP-CAL-033 | Etikett / valg; [CalibrationAssessment.tsx:19](../src/components/common/CalibrationAssessment.tsx#L19) | Complete the calibration, then upload documentation and sign. | |
| WP-CAL-034 | Etikett / valg; [CalibrationAssessment.tsx:20](../src/components/common/CalibrationAssessment.tsx#L20) | Calibration is not required | |
| WP-CAL-035 | Etikett / valg; [CalibrationAssessment.tsx:20](../src/components/common/CalibrationAssessment.tsx#L20) | Record this assessment and continue. No explanation is needed. | |
| WP-CAL-036 | Visning / betinget tekst; [CalibrationAssessment.tsx:42](../src/components/common/CalibrationAssessment.tsx#L42) | Awaiting vehicle inspection. Choose a result to complete this section. | |
| WP-CAL-037 | Visning / betinget tekst; [CalibrationAssessment.tsx:44](../src/components/common/CalibrationAssessment.tsx#L44) | Next: complete the calibration details below. | |
| WP-CAL-038 | Visning / betinget tekst; [CalibrationAssessment.tsx:45](../src/components/common/CalibrationAssessment.tsx#L45) | Assessment recorded: calibration is not required. You can continue with the case. | |
| WP-CAL-039 | Visning / betinget tekst; [CalibrationSection.tsx:101](../src/features/case-creation/components/CalibrationSection.tsx#L101) | Supporting documentation (optional) | |
| WP-CAL-040 | Visning / betinget tekst; [CalibrationSection.tsx:101](../src/features/case-creation/components/CalibrationSection.tsx#L101) | Documentation | |
| WP-CAL-041 | Visning / betinget tekst; [CalibrationSection.tsx:105](../src/features/case-creation/components/CalibrationSection.tsx#L105) | Attach documentation that supports the change. | |
| WP-CAL-042 | Visning / betinget tekst; [CalibrationSection.tsx:105](../src/features/case-creation/components/CalibrationSection.tsx#L105) | Required to complete this section. | |
| WP-CAL-043 | Synlig tekst; [CalibrationSection.tsx:114](../src/features/case-creation/components/CalibrationSection.tsx#L114) | MB | |
| WP-CAL-044 | aria-label; [CalibrationSection.tsx:117](../src/features/case-creation/components/CalibrationSection.tsx#L117) | Remove document | |
| WP-CAL-045 | Visning / betinget tekst; [CalibrationSection.tsx:125](../src/features/case-creation/components/CalibrationSection.tsx#L125) | Upload supporting documentation | |
| WP-CAL-046 | Visning / betinget tekst; [CalibrationSection.tsx:125](../src/features/case-creation/components/CalibrationSection.tsx#L125) | Upload calibration documentation | |
| WP-CAL-047 | Synlig tekst; [CalibrationSection.tsx:127](../src/features/case-creation/components/CalibrationSection.tsx#L127) | PDF, Word, JPG or PNG (max 10 MB) | |
| WP-CAL-048 | Synlig tekst; [CalibrationSection.tsx:140](../src/features/case-creation/components/CalibrationSection.tsx#L140) | Calibration | |
| WP-CAL-049 | Synlig tekst; [CalibrationSection.tsx:141](../src/features/case-creation/components/CalibrationSection.tsx#L141) | Review the calibration requirement and add the relevant case information. | |
| WP-CAL-050 | Synlig tekst; [CalibrationSection.tsx:144](../src/features/case-creation/components/CalibrationSection.tsx#L144) | Developer mode | |
| WP-CAL-051 | Synlig tekst; [CalibrationSection.tsx:150](../src/features/case-creation/components/CalibrationSection.tsx#L150) | API response | |
| WP-CAL-052 | Synlig tekst; [CalibrationSection.tsx:162](../src/features/case-creation/components/CalibrationSection.tsx#L162) | Workshop overrides | |
| WP-CAL-053 | Synlig tekst; [CalibrationSection.tsx:173](../src/features/case-creation/components/CalibrationSection.tsx#L173) | Local override for demonstration and testing. | |
| WP-CAL-054 | Synlig tekst; [CalibrationSection.tsx:185](../src/features/case-creation/components/CalibrationSection.tsx#L185) | Calibration is marked as | |
| WP-CAL-055 | Visning / betinget tekst; [CalibrationSection.tsx:185](../src/features/case-creation/components/CalibrationSection.tsx#L185) | required | |
| WP-CAL-056 | Visning / betinget tekst; [CalibrationSection.tsx:185](../src/features/case-creation/components/CalibrationSection.tsx#L185) | not required | |
| WP-CAL-057 | Synlig tekst; [CalibrationSection.tsx:188](../src/features/case-creation/components/CalibrationSection.tsx#L188) | Based on the case information, calibration is | |
| WP-CAL-058 | Visning / betinget tekst; [CalibrationSection.tsx:188](../src/features/case-creation/components/CalibrationSection.tsx#L188) | required | |
| WP-CAL-059 | Visning / betinget tekst; [CalibrationSection.tsx:188](../src/features/case-creation/components/CalibrationSection.tsx#L188) | not required | |
| WP-CAL-060 | Synlig tekst; [CalibrationSection.tsx:194](../src/features/case-creation/components/CalibrationSection.tsx#L194) | Mark calibration as not required | |
| WP-CAL-061 | Synlig tekst; [CalibrationSection.tsx:199](../src/features/case-creation/components/CalibrationSection.tsx#L199) | Mark calibration as required | |
| WP-CAL-062 | Synlig tekst; [CalibrationSection.tsx:207](../src/features/case-creation/components/CalibrationSection.tsx#L207) | Calibration details | |
| WP-CAL-063 | Synlig tekst; [CalibrationSection.tsx:208](../src/features/case-creation/components/CalibrationSection.tsx#L208) | Upload documentation from the completed calibration and sign when the work is finished. | |
| WP-CAL-064 | Synlig tekst; [CalibrationSection.tsx:213](../src/features/case-creation/components/CalibrationSection.tsx#L213) | Comment (optional) | |
| WP-CAL-065 | placeholder; [CalibrationSection.tsx:214](../src/features/case-creation/components/CalibrationSection.tsx#L214) | Add any relevant information | |
| WP-CAL-066 | Synlig tekst; [CalibrationSection.tsx:218](../src/features/case-creation/components/CalibrationSection.tsx#L218) | Confirmation | |
| WP-CAL-067 | Synlig tekst; [CalibrationSection.tsx:221](../src/features/case-creation/components/CalibrationSection.tsx#L221) | I confirm that the workshop has carried out the necessary work according to the car manufacturer's requirements and instructions. The workshop has the necessary expertise, tools and equipment to carry this out. | |
| WP-CAL-068 | Synlig tekst; [CalibrationSection.tsx:226](../src/features/case-creation/components/CalibrationSection.tsx#L226) | Signature | |
| WP-CAL-069 | Synlig tekst; [CalibrationSection.tsx:227](../src/features/case-creation/components/CalibrationSection.tsx#L227) | Sign when the calibration is complete and the documentation has been uploaded. | |
| WP-CAL-070 | placeholder; [CalibrationSection.tsx:228](../src/features/case-creation/components/CalibrationSection.tsx#L228) | Enter full name | |
| WP-CAL-071 | Synlig tekst; [CalibrationSection.tsx:235](../src/features/case-creation/components/CalibrationSection.tsx#L235) | Calibration requirement change | |
| WP-CAL-072 | Synlig tekst; [CalibrationSection.tsx:236](../src/features/case-creation/components/CalibrationSection.tsx#L236) | Provide a reason for changing the calibration requirement. | |
| WP-CAL-073 | Synlig tekst; [CalibrationSection.tsx:239](../src/features/case-creation/components/CalibrationSection.tsx#L239) | Reason | |
| WP-CAL-074 | Synlig tekst; [CalibrationSection.tsx:240](../src/features/case-creation/components/CalibrationSection.tsx#L240) | Required to complete this section. | |
| WP-CAL-075 | placeholder; [CalibrationSection.tsx:241](../src/features/case-creation/components/CalibrationSection.tsx#L241) | Describe why calibration is not required | |
