# Opprette sak – bilder – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](create-photos-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-CPHO-001 | Synlig tekst; [PhotoUploadStep.tsx:57](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L57) | - Example | |
| WP-CPHO-002 | Synlig tekst; [PhotoUploadStep.tsx:60](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L60) | of | |
| WP-CPHO-003 | alt; [PhotoUploadStep.tsx:79](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L79) | [verdi1] Example | |
| WP-CPHO-004 | aria-label; [PhotoUploadStep.tsx:88](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L88) | Previous example | |
| WP-CPHO-005 | aria-label; [PhotoUploadStep.tsx:95](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L95) | Next example | |
| WP-CPHO-006 | Synlig tekst; [PhotoUploadStep.tsx:106](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L106) | Key Requirements | |
| WP-CPHO-007 | aria-label; [PhotoUploadStep.tsx:130](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L130) | Go to example [verdi1] | |
| WP-CPHO-008 | Synlig tekst; [PhotoUploadStep.tsx:138](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L138) | Got it | |
| WP-CPHO-009 | Etikett / valg; [PhotoUploadStep.tsx:214](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L214) | Vehicle Overview | |
| WP-CPHO-010 | Etikett / valg; [PhotoUploadStep.tsx:215](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L215) | Full view of the vehicle showing the damaged area | |
| WP-CPHO-011 | Etikett / valg; [PhotoUploadStep.tsx:221](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L221) | Glass Close-up | |
| WP-CPHO-012 | Etikett / valg; [PhotoUploadStep.tsx:222](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L222) | Close-up view of the damaged glass | |
| WP-CPHO-013 | Etikett / valg; [PhotoUploadStep.tsx:228](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L228) | Damage Detail | |
| WP-CPHO-014 | Etikett / valg; [PhotoUploadStep.tsx:229](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L229) | Detailed view of the specific damage area | |
| WP-CPHO-015 | Etikett / valg; [PhotoUploadStep.tsx:235](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L235) | Additional Documentation | |
| WP-CPHO-016 | Etikett / valg; [PhotoUploadStep.tsx:236](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L236) | Any additional photos or documentation | |
| WP-CPHO-017 | Etikett / valg; [PhotoUploadStep.tsx:324](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L324) | JPG, PNG, WebP, PDF, DOC, DOCX, XLS, XLSX, CSV, or TXT files | |
| WP-CPHO-018 | Etikett / valg; [PhotoUploadStep.tsx:330](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L330) | JPG, PNG, or WebP images | |
| WP-CPHO-019 | Synlig tekst; [PhotoUploadStep.tsx:597](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L597) | Photo Documentation | |
| WP-CPHO-020 | Synlig tekst; [PhotoUploadStep.tsx:599](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L599) | Progress: | |
| WP-CPHO-021 | Synlig tekst; [PhotoUploadStep.tsx:611](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L611) | Developer Mode | |
| WP-CPHO-022 | Synlig tekst; [PhotoUploadStep.tsx:620](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L620) | Developer Testing Tool | |
| WP-CPHO-023 | Synlig tekst; [PhotoUploadStep.tsx:623](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L623) | Select a scenario to instantly test different photo upload outcomes: | |
| WP-CPHO-024 | Synlig tekst; [PhotoUploadStep.tsx:635](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L635) | All Photos Uploaded | |
| WP-CPHO-025 | Synlig tekst; [PhotoUploadStep.tsx:645](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L645) | Upload Failed | |
| WP-CPHO-026 | Synlig tekst; [PhotoUploadStep.tsx:655](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L655) | No Photos | |
| WP-CPHO-027 | Synlig tekst; [PhotoUploadStep.tsx:665](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L665) | Skipped Photos | |
| WP-CPHO-028 | Synlig tekst; [PhotoUploadStep.tsx:672](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L672) | Active Scenario: | |
| WP-CPHO-029 | Visning / betinget tekst; [PhotoUploadStep.tsx:673](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L673) | All Photos Uploaded - Shows completed photo documentation with all required photos | |
| WP-CPHO-030 | Visning / betinget tekst; [PhotoUploadStep.tsx:674](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L674) | Upload Failed - Shows file validation errors for multiple photo types | |
| WP-CPHO-031 | Visning / betinget tekst; [PhotoUploadStep.tsx:675](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L675) | No Photos - Shows initial state with empty photo sections | |
| WP-CPHO-032 | Visning / betinget tekst; [PhotoUploadStep.tsx:676](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L676) | Skipped Photos - Shows photos skipped with reason provided | |
| WP-CPHO-033 | Visning / betinget tekst; [PhotoUploadStep.tsx:677](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L677) | Unknown scenario | |
| WP-CPHO-034 | Synlig tekst; [PhotoUploadStep.tsx:691](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L691) | Photo Requirements | |
| WP-CPHO-035 | Synlig tekst; [PhotoUploadStep.tsx:693](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L693) | • Take clear, well-lit photos of all required areas | |
| WP-CPHO-036 | Synlig tekst; [PhotoUploadStep.tsx:694](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L694) | • Ensure damage is clearly visible in close-up shots | |
| WP-CPHO-037 | Synlig tekst; [PhotoUploadStep.tsx:695](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L695) | • Include overview shots showing vehicle context | |
| WP-CPHO-038 | Synlig tekst; [PhotoUploadStep.tsx:705](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L705) | View photo examples | |
| WP-CPHO-039 | Synlig tekst; [PhotoUploadStep.tsx:723](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L723) | No photo documentation is needed for this case | |
| WP-CPHO-040 | Synlig tekst; [PhotoUploadStep.tsx:726](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L726) | Check this if photos are not required for this specific case | |
| WP-CPHO-041 | Synlig tekst; [PhotoUploadStep.tsx:734](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L734) | Reason for skipping photos | |
| WP-CPHO-042 | placeholder; [PhotoUploadStep.tsx:740](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L740) | Please explain why photos are being skipped for this case... | |
| WP-CPHO-043 | Synlig tekst; [PhotoUploadStep.tsx:752](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L752) | Reason provided | |
| WP-CPHO-044 | Synlig tekst; [PhotoUploadStep.tsx:778](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L778) | (Optional) | |
| WP-CPHO-045 | Synlig tekst; [PhotoUploadStep.tsx:788](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L788) | Tips: | |
| WP-CPHO-046 | Synlig tekst; [PhotoUploadStep.tsx:799](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L799) | Uploaded files ( | |
| WP-CPHO-047 | Visning / betinget tekst; [PhotoUploadStep.tsx:818](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L818) | FILE | |
| WP-CPHO-048 | Synlig tekst; [PhotoUploadStep.tsx:826](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L826) | MB | |
| WP-CPHO-049 | title; [PhotoUploadStep.tsx:834](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L834) | Remove | |
| WP-CPHO-050 | Visning / betinget tekst; [PhotoUploadStep.tsx:856](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L856) | Upload Additional Files | |
| WP-CPHO-051 | Visning / betinget tekst; [PhotoUploadStep.tsx:856](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L856) | Upload [verdi1] | |
| WP-CPHO-052 | Synlig tekst; [PhotoUploadStep.tsx:859](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L859) | Drag and drop your files here, or click to select | |
| WP-CPHO-053 | Visning / betinget tekst; [PhotoUploadStep.tsx:880](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L880) | Add More | |
| WP-CPHO-054 | Visning / betinget tekst; [PhotoUploadStep.tsx:880](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L880) | Choose Files | |
| WP-CPHO-055 | Synlig tekst; [PhotoUploadStep.tsx:907](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L907) | Photo Uploaded | |
| WP-CPHO-056 | Synlig tekst; [PhotoUploadStep.tsx:941](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L941) | Replace Photo | |
| WP-CPHO-057 | Synlig tekst; [PhotoUploadStep.tsx:959](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L959) | Upload | |
| WP-CPHO-058 | Synlig tekst; [PhotoUploadStep.tsx:962](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L962) | Drag and drop your file here, or click to select | |
| WP-CPHO-059 | Synlig tekst; [PhotoUploadStep.tsx:983](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L983) | Choose File | |
| WP-CPHO-060 | Synlig tekst; [PhotoUploadStep.tsx:1004](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1004) | Try Again | |
| WP-CPHO-061 | Synlig tekst; [PhotoUploadStep.tsx:1013](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1013) | Choose Another File | |
| WP-CPHO-062 | Synlig tekst; [PhotoUploadStep.tsx:1034](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1034) | Missing Required Photos | |
| WP-CPHO-063 | Synlig tekst; [PhotoUploadStep.tsx:1036](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1036) | Please upload all required photos to complete this step | |
| WP-CPHO-064 | Synlig tekst; [PhotoUploadStep.tsx:1059](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1059) | All Photos Uploaded | |
| WP-CPHO-065 | Synlig tekst; [PhotoUploadStep.tsx:1061](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1061) | All required photos have been successfully uploaded | |
| WP-CPHO-066 | Synlig tekst; [PhotoUploadStep.tsx:1074](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1074) | Photos Skipped | |
| WP-CPHO-067 | Synlig tekst; [PhotoUploadStep.tsx:1076](../src/features/case-creation/components/steps/PhotoUploadStep.tsx#L1076) | Photos have been skipped for this case. Reason: | |
