# Opprette sak – faktura – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](create-invoice-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-CINV-001 | Synlig tekst; [InvoiceStep.tsx:228](../src/features/case-creation/components/steps/InvoiceStep.tsx#L228) | Invoice Upload | |
| WP-CINV-002 | Synlig tekst; [InvoiceStep.tsx:239](../src/features/case-creation/components/steps/InvoiceStep.tsx#L239) | Developer Mode | |
| WP-CINV-003 | Synlig tekst; [InvoiceStep.tsx:248](../src/features/case-creation/components/steps/InvoiceStep.tsx#L248) | Developer Testing Tool | |
| WP-CINV-004 | Synlig tekst; [InvoiceStep.tsx:251](../src/features/case-creation/components/steps/InvoiceStep.tsx#L251) | Select a scenario to instantly test different invoice upload outcomes: | |
| WP-CINV-005 | Synlig tekst; [InvoiceStep.tsx:263](../src/features/case-creation/components/steps/InvoiceStep.tsx#L263) | Upload Success | |
| WP-CINV-006 | Synlig tekst; [InvoiceStep.tsx:273](../src/features/case-creation/components/steps/InvoiceStep.tsx#L273) | Upload Failed | |
| WP-CINV-007 | Synlig tekst; [InvoiceStep.tsx:283](../src/features/case-creation/components/steps/InvoiceStep.tsx#L283) | No Invoice | |
| WP-CINV-008 | Synlig tekst; [InvoiceStep.tsx:293](../src/features/case-creation/components/steps/InvoiceStep.tsx#L293) | Show Manual Input | |
| WP-CINV-009 | Synlig tekst; [InvoiceStep.tsx:300](../src/features/case-creation/components/steps/InvoiceStep.tsx#L300) | Active Scenario: | |
| WP-CINV-010 | Visning / betinget tekst; [InvoiceStep.tsx:301](../src/features/case-creation/components/steps/InvoiceStep.tsx#L301) | Upload Success - Shows successful invoice upload | |
| WP-CINV-011 | Visning / betinget tekst; [InvoiceStep.tsx:302](../src/features/case-creation/components/steps/InvoiceStep.tsx#L302) | Upload Failed - Shows upload failure with retry options | |
| WP-CINV-012 | Visning / betinget tekst; [InvoiceStep.tsx:303](../src/features/case-creation/components/steps/InvoiceStep.tsx#L303) | No Invoice - Shows initial upload state | |
| WP-CINV-013 | Visning / betinget tekst; [InvoiceStep.tsx:304](../src/features/case-creation/components/steps/InvoiceStep.tsx#L304) | Manual Input - Shows manual data entry form | |
| WP-CINV-014 | Visning / betinget tekst; [InvoiceStep.tsx:305](../src/features/case-creation/components/steps/InvoiceStep.tsx#L305) | Unknown scenario | |
| WP-CINV-015 | Synlig tekst; [InvoiceStep.tsx:322](../src/features/case-creation/components/steps/InvoiceStep.tsx#L322) | Invoice Upload Failed | |
| WP-CINV-016 | Synlig tekst; [InvoiceStep.tsx:329](../src/features/case-creation/components/steps/InvoiceStep.tsx#L329) | Try Again | |
| WP-CINV-017 | Synlig tekst; [InvoiceStep.tsx:335](../src/features/case-creation/components/steps/InvoiceStep.tsx#L335) | Enter Manually | |
| WP-CINV-018 | Synlig tekst; [InvoiceStep.tsx:344](../src/features/case-creation/components/steps/InvoiceStep.tsx#L344) | Failed File: | |
| WP-CINV-019 | Synlig tekst; [InvoiceStep.tsx:345](../src/features/case-creation/components/steps/InvoiceStep.tsx#L345) | Size: | |
| WP-CINV-020 | Synlig tekst; [InvoiceStep.tsx:345](../src/features/case-creation/components/steps/InvoiceStep.tsx#L345) | MB | |
| WP-CINV-021 | Synlig tekst; [InvoiceStep.tsx:346](../src/features/case-creation/components/steps/InvoiceStep.tsx#L346) | Type: | |
| WP-CINV-022 | Synlig tekst; [InvoiceStep.tsx:357](../src/features/case-creation/components/steps/InvoiceStep.tsx#L357) | Invoice Uploaded Successfully | |
| WP-CINV-023 | Synlig tekst; [InvoiceStep.tsx:359](../src/features/case-creation/components/steps/InvoiceStep.tsx#L359) | File: | |
| WP-CINV-024 | Synlig tekst; [InvoiceStep.tsx:360](../src/features/case-creation/components/steps/InvoiceStep.tsx#L360) | Size: | |
| WP-CINV-025 | Synlig tekst; [InvoiceStep.tsx:360](../src/features/case-creation/components/steps/InvoiceStep.tsx#L360) | MB | |
| WP-CINV-026 | Synlig tekst; [InvoiceStep.tsx:361](../src/features/case-creation/components/steps/InvoiceStep.tsx#L361) | Type: | |
| WP-CINV-027 | title; [InvoiceStep.tsx:368](../src/features/case-creation/components/steps/InvoiceStep.tsx#L368) | Remove invoice | |
| WP-CINV-028 | Synlig tekst; [InvoiceStep.tsx:387](../src/features/case-creation/components/steps/InvoiceStep.tsx#L387) | Replace Invoice | |
| WP-CINV-029 | Synlig tekst; [InvoiceStep.tsx:396](../src/features/case-creation/components/steps/InvoiceStep.tsx#L396) | Upload Invoice Document | |
| WP-CINV-030 | Synlig tekst; [InvoiceStep.tsx:403](../src/features/case-creation/components/steps/InvoiceStep.tsx#L403) | Upload Requirements: | |
| WP-CINV-031 | Synlig tekst; [InvoiceStep.tsx:405](../src/features/case-creation/components/steps/InvoiceStep.tsx#L405) | Supported formats: | |
| WP-CINV-032 | Synlig tekst; [InvoiceStep.tsx:405](../src/features/case-creation/components/steps/InvoiceStep.tsx#L405) | PDF, JPG, PNG | |
| WP-CINV-033 | Synlig tekst; [InvoiceStep.tsx:406](../src/features/case-creation/components/steps/InvoiceStep.tsx#L406) | Maximum file size: | |
| WP-CINV-034 | Synlig tekst; [InvoiceStep.tsx:406](../src/features/case-creation/components/steps/InvoiceStep.tsx#L406) | 10MB | |
| WP-CINV-035 | Synlig tekst; [InvoiceStep.tsx:407](../src/features/case-creation/components/steps/InvoiceStep.tsx#L407) | Quality: | |
| WP-CINV-036 | Synlig tekst; [InvoiceStep.tsx:407](../src/features/case-creation/components/steps/InvoiceStep.tsx#L407) | Document should be clear and readable | |
| WP-CINV-037 | Synlig tekst; [InvoiceStep.tsx:408](../src/features/case-creation/components/steps/InvoiceStep.tsx#L408) | Content: | |
| WP-CINV-038 | Synlig tekst; [InvoiceStep.tsx:408](../src/features/case-creation/components/steps/InvoiceStep.tsx#L408) | Must include repair items and total amounts | |
| WP-CINV-039 | Synlig tekst; [InvoiceStep.tsx:420](../src/features/case-creation/components/steps/InvoiceStep.tsx#L420) | Upload Error | |
| WP-CINV-040 | Synlig tekst; [InvoiceStep.tsx:441](../src/features/case-creation/components/steps/InvoiceStep.tsx#L441) | Upload Invoice Document | |
| WP-CINV-041 | Synlig tekst; [InvoiceStep.tsx:443](../src/features/case-creation/components/steps/InvoiceStep.tsx#L443) | Drag and drop your invoice here, or click to select a file | |
| WP-CINV-042 | Synlig tekst; [InvoiceStep.tsx:458](../src/features/case-creation/components/steps/InvoiceStep.tsx#L458) | Choose File | |
| WP-CINV-043 | Synlig tekst; [InvoiceStep.tsx:470](../src/features/case-creation/components/steps/InvoiceStep.tsx#L470) | Manual Invoice Entry | |
| WP-CINV-044 | Synlig tekst; [InvoiceStep.tsx:473](../src/features/case-creation/components/steps/InvoiceStep.tsx#L473) | Please enter the invoice information manually and upload a copy of the invoice. | |
| WP-CINV-045 | Synlig tekst; [InvoiceStep.tsx:480](../src/features/case-creation/components/steps/InvoiceStep.tsx#L480) | Invoice Number | |
| WP-CINV-046 | placeholder; [InvoiceStep.tsx:486](../src/features/case-creation/components/steps/InvoiceStep.tsx#L486) | Enter invoice number | |
| WP-CINV-047 | Synlig tekst; [InvoiceStep.tsx:499](../src/features/case-creation/components/steps/InvoiceStep.tsx#L499) | KID Number | |
| WP-CINV-048 | placeholder; [InvoiceStep.tsx:505](../src/features/case-creation/components/steps/InvoiceStep.tsx#L505) | Enter KID number (optional) | |
| WP-CINV-049 | Synlig tekst; [InvoiceStep.tsx:513](../src/features/case-creation/components/steps/InvoiceStep.tsx#L513) | Due Date | |
| WP-CINV-050 | Synlig tekst; [InvoiceStep.tsx:526](../src/features/case-creation/components/steps/InvoiceStep.tsx#L526) | Total Sum (£) | |
| WP-CINV-051 | placeholder; [InvoiceStep.tsx:534](../src/features/case-creation/components/steps/InvoiceStep.tsx#L534) | Enter total amount | |
| WP-CINV-052 | Synlig tekst; [InvoiceStep.tsx:548](../src/features/case-creation/components/steps/InvoiceStep.tsx#L548) | Upload Invoice Copy | |
| WP-CINV-053 | Synlig tekst; [InvoiceStep.tsx:558](../src/features/case-creation/components/steps/InvoiceStep.tsx#L558) | MB | |
| WP-CINV-054 | Synlig tekst; [InvoiceStep.tsx:591](../src/features/case-creation/components/steps/InvoiceStep.tsx#L591) | Choose File | |
| WP-CINV-055 | Synlig tekst; [InvoiceStep.tsx:593](../src/features/case-creation/components/steps/InvoiceStep.tsx#L593) | PDF, JPG, PNG (max 10MB) | |
| WP-CINV-056 | Synlig tekst; [InvoiceStep.tsx:608](../src/features/case-creation/components/steps/InvoiceStep.tsx#L608) | Confirm Manual Input | |
| WP-CINV-057 | Synlig tekst; [InvoiceStep.tsx:614](../src/features/case-creation/components/steps/InvoiceStep.tsx#L614) | Cancel | |
