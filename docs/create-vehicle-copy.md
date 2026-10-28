# Opprette sak – kjøretøy og dekning – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](create-vehicle-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-VEH-001 | Synlig tekst; [VRNLookupStep.tsx:367](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L367) | Vehicle &amp; Damage Information | |
| WP-VEH-002 | Synlig tekst; [VRNLookupStep.tsx:378](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L378) | Developer Mode | |
| WP-VEH-003 | Synlig tekst; [VRNLookupStep.tsx:387](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L387) | Developer Testing Tool | |
| WP-VEH-004 | Synlig tekst; [VRNLookupStep.tsx:390](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L390) | Select a scenario to instantly test different VRN lookup outcomes: | |
| WP-VEH-005 | Synlig tekst; [VRNLookupStep.tsx:402](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L402) | Vehicle Found | |
| WP-VEH-006 | Synlig tekst; [VRNLookupStep.tsx:412](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L412) | VRN Not Found | |
| WP-VEH-007 | Synlig tekst; [VRNLookupStep.tsx:422](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L422) | No Coverage | |
| WP-VEH-008 | Synlig tekst; [VRNLookupStep.tsx:432](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L432) | Existing Case Found | |
| WP-VEH-009 | Synlig tekst; [VRNLookupStep.tsx:442](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L442) | Coverage Needs Review | |
| WP-VEH-010 | Synlig tekst; [VRNLookupStep.tsx:449](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L449) | Active Scenario: | |
| WP-VEH-011 | Visning / betinget tekst; [VRNLookupStep.tsx:450](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L450) | Vehicle Found - Shows successful lookup with vehicle and owner details | |
| WP-VEH-012 | Visning / betinget tekst; [VRNLookupStep.tsx:451](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L451) | VRN Not Found - Shows error message when VRN is not in database | |
| WP-VEH-013 | Visning / betinget tekst; [VRNLookupStep.tsx:452](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L452) | No Coverage - Shows vehicle found but no insurance coverage | |
| WP-VEH-014 | Visning / betinget tekst; [VRNLookupStep.tsx:453](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L453) | Existing Case Found - Shows vehicle details with existing case warning | |
| WP-VEH-015 | Visning / betinget tekst; [VRNLookupStep.tsx:454](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L454) | Coverage Needs Review - Shows vehicle found but coverage requires manual review | |
| WP-VEH-016 | Visning / betinget tekst; [VRNLookupStep.tsx:455](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L455) | Unknown scenario | |
| WP-VEH-017 | Synlig tekst; [VRNLookupStep.tsx:465](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L465) | Search Information | |
| WP-VEH-018 | Synlig tekst; [VRNLookupStep.tsx:471](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L471) | Vehicle Registration Number (VRN) | |
| WP-VEH-019 | placeholder; [VRNLookupStep.tsx:478](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L478) | Enter VRN (e.g., AB12 CDE) | |
| WP-VEH-020 | Synlig tekst; [VRNLookupStep.tsx:499](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L499) | Damage Date | |
| WP-VEH-021 | Synlig tekst; [VRNLookupStep.tsx:514](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L514) | Insurance Company | |
| WP-VEH-022 | placeholder; [VRNLookupStep.tsx:520](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L520) | e.g., Aviva Insurance | |
| WP-VEH-023 | Synlig tekst; [VRNLookupStep.tsx:529](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L529) | Glass Type | |
| WP-VEH-024 | Synlig tekst; [VRNLookupStep.tsx:537](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L537) | Select glass type | |
| WP-VEH-025 | Synlig tekst; [VRNLookupStep.tsx:555](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L555) | Searching... | |
| WP-VEH-026 | Synlig tekst; [VRNLookupStep.tsx:560](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L560) | Search Vehicle &amp; Coverage | |
| WP-VEH-027 | Synlig tekst; [VRNLookupStep.tsx:570](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L570) | Please fill in all required fields | |
| WP-VEH-028 | Synlig tekst; [VRNLookupStep.tsx:581](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L581) | VRN Not Found | |
| WP-VEH-029 | Synlig tekst; [VRNLookupStep.tsx:584](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L584) | Common issues: | |
| WP-VEH-030 | Synlig tekst; [VRNLookupStep.tsx:586](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L586) | Check for typos (0 vs O, 1 vs I) | |
| WP-VEH-031 | Synlig tekst; [VRNLookupStep.tsx:587](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L587) | Verify spacing and format | |
| WP-VEH-032 | Synlig tekst; [VRNLookupStep.tsx:588](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L588) | Ensure the vehicle is registered in our system | |
| WP-VEH-033 | Synlig tekst; [VRNLookupStep.tsx:606](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L606) | Vehicle Details | |
| WP-VEH-034 | Synlig tekst; [VRNLookupStep.tsx:610](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L610) | VRN: | |
| WP-VEH-035 | Synlig tekst; [VRNLookupStep.tsx:614](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L614) | Make/Model: | |
| WP-VEH-036 | Synlig tekst; [VRNLookupStep.tsx:618](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L618) | Year: | |
| WP-VEH-037 | Synlig tekst; [VRNLookupStep.tsx:622](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L622) | Color: | |
| WP-VEH-038 | Synlig tekst; [VRNLookupStep.tsx:626](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L626) | VIN: | |
| WP-VEH-039 | Synlig tekst; [VRNLookupStep.tsx:636](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L636) | Owner Details | |
| WP-VEH-040 | Synlig tekst; [VRNLookupStep.tsx:640](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L640) | Name: | |
| WP-VEH-041 | Synlig tekst; [VRNLookupStep.tsx:644](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L644) | Address: | |
| WP-VEH-042 | Synlig tekst; [VRNLookupStep.tsx:648](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L648) | Phone: | |
| WP-VEH-043 | Synlig tekst; [VRNLookupStep.tsx:652](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L652) | Email: | |
| WP-VEH-044 | Synlig tekst; [VRNLookupStep.tsx:676](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L676) | Insurance Coverage | |
| WP-VEH-045 | Synlig tekst; [VRNLookupStep.tsx:681](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L681) | Status: | |
| WP-VEH-046 | Visning / betinget tekst; [VRNLookupStep.tsx:686](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L686) | Covered | |
| WP-VEH-047 | Visning / betinget tekst; [VRNLookupStep.tsx:687](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L687) | Needs Review | |
| WP-VEH-048 | Visning / betinget tekst; [VRNLookupStep.tsx:687](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L687) | Not Covered | |
| WP-VEH-049 | Synlig tekst; [VRNLookupStep.tsx:693](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L693) | Coverage: | |
| WP-VEH-050 | Synlig tekst; [VRNLookupStep.tsx:697](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L697) | Deductible: | |
| WP-VEH-051 | Synlig tekst; [VRNLookupStep.tsx:726](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L726) | Existing Case Found | |
| WP-VEH-052 | Synlig tekst; [VRNLookupStep.tsx:728](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L728) | Important: | |
| WP-VEH-053 | Synlig tekst; [VRNLookupStep.tsx:728](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L728) | An open case already exists for this vehicle. You must choose how to proceed: | |
| WP-VEH-054 | Synlig tekst; [VRNLookupStep.tsx:733](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L733) | Case ID: | |
| WP-VEH-055 | Synlig tekst; [VRNLookupStep.tsx:737](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L737) | Status: | |
| WP-VEH-056 | Synlig tekst; [VRNLookupStep.tsx:741](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L741) | Created: | |
| WP-VEH-057 | Synlig tekst; [VRNLookupStep.tsx:745](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L745) | Description: | |
| WP-VEH-058 | Synlig tekst; [VRNLookupStep.tsx:752](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L752) | Choose an option: | |
| WP-VEH-059 | Synlig tekst; [VRNLookupStep.tsx:757](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L757) | Continue Existing Case: | |
| WP-VEH-060 | Synlig tekst; [VRNLookupStep.tsx:757](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L757) | Add to or update the current case | |
| WP-VEH-061 | Synlig tekst; [VRNLookupStep.tsx:763](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L763) | Create New Case: | |
| WP-VEH-062 | Synlig tekst; [VRNLookupStep.tsx:763](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L763) | Start a separate case for this vehicle | |
| WP-VEH-063 | Synlig tekst; [VRNLookupStep.tsx:774](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L774) | Continue Existing Case | |
| WP-VEH-064 | Synlig tekst; [VRNLookupStep.tsx:780](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L780) | Create New Case | |
| WP-VEH-065 | Synlig tekst; [VRNLookupStep.tsx:794](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L794) | Ready to Continue | |
| WP-VEH-066 | Synlig tekst; [VRNLookupStep.tsx:796](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L796) | Vehicle and owner information verified. You can now proceed to the next step. | |
| WP-VEH-067 | Synlig tekst; [VRNLookupStep.tsx:813](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L813) | Continue Existing Case | |
| WP-VEH-068 | Synlig tekst; [VRNLookupStep.tsx:816](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L816) | User is guided to the existing case | |
| WP-VEH-069 | Synlig tekst; [VRNLookupStep.tsx:822](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L822) | Close | |
| WP-VEH-070 | Synlig tekst; [VRNLookupStep.tsx:837](../src/features/case-creation/components/steps/VRNLookupStep.tsx#L837) | Stop Process | |
