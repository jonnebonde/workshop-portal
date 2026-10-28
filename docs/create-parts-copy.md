# Opprette sak – deler og arbeid – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](create-parts-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-CPAR-001 | Validering; [PartsLaborStep.tsx:321](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L321) | At least one repair item is required | |
| WP-CPAR-002 | Validering; [PartsLaborStep.tsx:326](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L326) | Item [verdi1]: Quantity must be greater than 0 | |
| WP-CPAR-003 | Validering; [PartsLaborStep.tsx:329](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L329) | Item [verdi1]: Unit price cannot be negative | |
| WP-CPAR-004 | Synlig tekst; [PartsLaborStep.tsx:348](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L348) | Parts &amp; Labor Details | |
| WP-CPAR-005 | Synlig tekst; [PartsLaborStep.tsx:349](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L349) | Add repair items and specify calibration requirements | |
| WP-CPAR-006 | Synlig tekst; [PartsLaborStep.tsx:365](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L365) | No repair items added | |
| WP-CPAR-007 | Synlig tekst; [PartsLaborStep.tsx:366](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L366) | Start by adding your first repair item | |
| WP-CPAR-008 | Synlig tekst; [PartsLaborStep.tsx:372](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L372) | Add First Item | |
| WP-CPAR-009 | title; [PartsLaborStep.tsx:393](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L393) | Remove item | |
| WP-CPAR-010 | Synlig tekst; [PartsLaborStep.tsx:403](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L403) | Category | |
| WP-CPAR-011 | Synlig tekst; [PartsLaborStep.tsx:419](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L419) | Article Number | |
| WP-CPAR-012 | placeholder; [PartsLaborStep.tsx:425](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L425) | Enter article number | |
| WP-CPAR-013 | Synlig tekst; [PartsLaborStep.tsx:434](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L434) | Quantity | |
| WP-CPAR-014 | Synlig tekst; [PartsLaborStep.tsx:448](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L448) | Unit Price (£) | |
| WP-CPAR-015 | Synlig tekst; [PartsLaborStep.tsx:463](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L463) | Discount (%) | |
| WP-CPAR-016 | Synlig tekst; [PartsLaborStep.tsx:478](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L478) | Item Total | |
| WP-CPAR-017 | Synlig tekst; [PartsLaborStep.tsx:509](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L509) | Add Item | |
| WP-CPAR-018 | Synlig tekst; [PartsLaborStep.tsx:523](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L523) | Subtotal: | |
| WP-CPAR-019 | Synlig tekst; [PartsLaborStep.tsx:529](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L529) | VAT (25%): | |
| WP-CPAR-020 | Synlig tekst; [PartsLaborStep.tsx:535](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L535) | Deductible: | |
| WP-CPAR-021 | Synlig tekst; [PartsLaborStep.tsx:544](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L544) | Total to Pay: | |
| WP-CPAR-022 | Synlig tekst; [PartsLaborStep.tsx:567](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L567) | Job execution date | |
| WP-CPAR-023 | Synlig tekst; [PartsLaborStep.tsx:570](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L570) | When was this repair work completed? | |
| WP-CPAR-024 | Synlig tekst; [PartsLaborStep.tsx:594](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L594) | Complete the following to finish this step: | |
| WP-CPAR-025 | Visning / betinget tekst; [PartsLaborStep.tsx:601](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L601) | Inspect the vehicle and choose whether calibration is required, or save the case as a draft | |
| WP-CPAR-026 | Visning / betinget tekst; [PartsLaborStep.tsx:602](../src/features/case-creation/components/steps/PartsLaborStep.tsx#L602) | Complete the required calibration information or save the case as a draft | |
