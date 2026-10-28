# Opprette sak – skademelding – tekstark

Kodegrunnlag: `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`, lest 2026-10-28. Se [notater](create-claim-notes.md) og [brukerveiledning](editing-copy.md).

Fyll inn **Forslag**, behold ID og plassholdere. Tom celle betyr ingen endring. Språket er bevart fra koden. Tekstfragmenter følger plasseringen i JSX; se kildekonteksten før sammenslåing. Betingede tekster og utviklerscenarier er ikke nødvendigvis synlige samtidig. Dynamiske verdier og eksempeldata er utelatt; nettleser-/API-tekster krever separat kontroll.

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-CLM-001 | Synlig tekst; [ClaimFormStep.tsx:437](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L437) | Claim Form | |
| WP-CLM-002 | Synlig tekst; [ClaimFormStep.tsx:448](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L448) | Developer Mode | |
| WP-CLM-003 | Synlig tekst; [ClaimFormStep.tsx:457](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L457) | Developer Testing Tool | |
| WP-CLM-004 | Synlig tekst; [ClaimFormStep.tsx:460](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L460) | Select a scenario to instantly test different claim form processing outcomes: | |
| WP-CLM-005 | Synlig tekst; [ClaimFormStep.tsx:472](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L472) | Existing Claim Found | |
| WP-CLM-006 | Synlig tekst; [ClaimFormStep.tsx:482](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L482) | No Existing Claim | |
| WP-CLM-007 | Synlig tekst; [ClaimFormStep.tsx:492](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L492) | Upload Success | |
| WP-CLM-008 | Synlig tekst; [ClaimFormStep.tsx:502](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L502) | Upload Failed | |
| WP-CLM-009 | Synlig tekst; [ClaimFormStep.tsx:512](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L512) | SMS Sent | |
| WP-CLM-010 | Synlig tekst; [ClaimFormStep.tsx:519](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L519) | Active Scenario: | |
| WP-CLM-011 | Visning / betinget tekst; [ClaimFormStep.tsx:520](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L520) | Existing Claim Found - Shows existing claim form with action choices | |
| WP-CLM-012 | Visning / betinget tekst; [ClaimFormStep.tsx:521](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L521) | No Existing Claim - Shows input method selection (Upload/SMS) | |
| WP-CLM-013 | Visning / betinget tekst; [ClaimFormStep.tsx:522](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L522) | Upload Success - Shows successful document upload and processing | |
| WP-CLM-014 | Visning / betinget tekst; [ClaimFormStep.tsx:523](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L523) | Upload Failed - Shows failed document processing with retry options | |
| WP-CLM-015 | Visning / betinget tekst; [ClaimFormStep.tsx:524](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L524) | SMS Sent - Shows SMS sent confirmation with action choices | |
| WP-CLM-016 | Visning / betinget tekst; [ClaimFormStep.tsx:525](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L525) | Unknown scenario | |
| WP-CLM-017 | Synlig tekst; [ClaimFormStep.tsx:535](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L535) | Case Information | |
| WP-CLM-018 | Synlig tekst; [ClaimFormStep.tsx:538](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L538) | VRN: | |
| WP-CLM-019 | Synlig tekst; [ClaimFormStep.tsx:542](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L542) | Damage Date: | |
| WP-CLM-020 | Synlig tekst; [ClaimFormStep.tsx:546](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L546) | Insurance: | |
| WP-CLM-021 | Synlig tekst; [ClaimFormStep.tsx:550](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L550) | Glass Type: | |
| WP-CLM-022 | Synlig tekst; [ClaimFormStep.tsx:562](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L562) | No Existing Claim Form Found | |
| WP-CLM-023 | Synlig tekst; [ClaimFormStep.tsx:564](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L564) | No claim form exists for VRN | |
| WP-CLM-024 | Synlig tekst; [ClaimFormStep.tsx:564](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L564) | . Please choose how you would like to provide the claim information. | |
| WP-CLM-025 | Synlig tekst; [ClaimFormStep.tsx:578](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L578) | Existing Claim Form Found | |
| WP-CLM-026 | Synlig tekst; [ClaimFormStep.tsx:580](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L580) | Great! A claim form for this vehicle was automatically located and loaded from our database. | |
| WP-CLM-027 | Synlig tekst; [ClaimFormStep.tsx:585](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L585) | Damage Date: | |
| WP-CLM-028 | Synlig tekst; [ClaimFormStep.tsx:589](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L589) | Location: | |
| WP-CLM-029 | Synlig tekst; [ClaimFormStep.tsx:593](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L593) | Insurance Company: | |
| WP-CLM-030 | Synlig tekst; [ClaimFormStep.tsx:597](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L597) | Glass Type: | |
| WP-CLM-031 | Synlig tekst; [ClaimFormStep.tsx:609](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L609) | View Document | |
| WP-CLM-032 | Synlig tekst; [ClaimFormStep.tsx:625](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L625) | No Existing Claim Form Found | |
| WP-CLM-033 | Synlig tekst; [ClaimFormStep.tsx:627](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L627) | No claim form exists for VRN | |
| WP-CLM-034 | Synlig tekst; [ClaimFormStep.tsx:627](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L627) | . Please choose how you would like to provide the claim information. | |
| WP-CLM-035 | Synlig tekst; [ClaimFormStep.tsx:634](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L634) | Choose Input Method | |
| WP-CLM-036 | Synlig tekst; [ClaimFormStep.tsx:643](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L643) | Upload Claim Form | |
| WP-CLM-037 | Synlig tekst; [ClaimFormStep.tsx:644](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L644) | Upload an existing claim form document for processing | |
| WP-CLM-038 | Synlig tekst; [ClaimFormStep.tsx:646](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L646) | • Faster processing | |
| WP-CLM-039 | Synlig tekst; [ClaimFormStep.tsx:647](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L647) | • Automatic data extraction | |
| WP-CLM-040 | Synlig tekst; [ClaimFormStep.tsx:648](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L648) | • Supports PDF, JPG, PNG | |
| WP-CLM-041 | Synlig tekst; [ClaimFormStep.tsx:660](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L660) | Send SMS to Customer | |
| WP-CLM-042 | Synlig tekst; [ClaimFormStep.tsx:661](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L661) | Send an SMS to the customer to create a claim form using our platform | |
| WP-CLM-043 | Synlig tekst; [ClaimFormStep.tsx:663](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L663) | • Customer creates their own form | |
| WP-CLM-044 | Synlig tekst; [ClaimFormStep.tsx:664](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L664) | • Automatic data validation | |
| WP-CLM-045 | Synlig tekst; [ClaimFormStep.tsx:665](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L665) | • Reduces workshop workload | |
| WP-CLM-046 | Synlig tekst; [ClaimFormStep.tsx:682](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L682) | ← Back to options | |
| WP-CLM-047 | Synlig tekst; [ClaimFormStep.tsx:684](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L684) | Upload Claim Form Document | |
| WP-CLM-048 | Synlig tekst; [ClaimFormStep.tsx:697](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L697) | Upload Claim Form Document | |
| WP-CLM-049 | Synlig tekst; [ClaimFormStep.tsx:699](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L699) | Drag and drop your file here, or click to select | |
| WP-CLM-050 | Synlig tekst; [ClaimFormStep.tsx:714](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L714) | Choose File | |
| WP-CLM-051 | Synlig tekst; [ClaimFormStep.tsx:729](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L729) | MB | |
| WP-CLM-052 | Synlig tekst; [ClaimFormStep.tsx:747](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L747) | Processing Document | |
| WP-CLM-053 | Synlig tekst; [ClaimFormStep.tsx:749](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L749) | Processing the uploaded document... | |
| WP-CLM-054 | Synlig tekst; [ClaimFormStep.tsx:761](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L761) | Upload Success | |
| WP-CLM-055 | Synlig tekst; [ClaimFormStep.tsx:763](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L763) | Document uploaded successfully. Please verify and complete any missing information below. | |
| WP-CLM-056 | Synlig tekst; [ClaimFormStep.tsx:775](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L775) | Upload Failed | |
| WP-CLM-057 | Synlig tekst; [ClaimFormStep.tsx:777](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L777) | Document could not be processed successfully. Please try uploading again or enter the information manually. | |
| WP-CLM-058 | Synlig tekst; [ClaimFormStep.tsx:784](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L784) | Try Upload Again | |
| WP-CLM-059 | Synlig tekst; [ClaimFormStep.tsx:790](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L790) | Change File | |
| WP-CLM-060 | Synlig tekst; [ClaimFormStep.tsx:819](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L819) | ← Back to options | |
| WP-CLM-061 | Synlig tekst; [ClaimFormStep.tsx:821](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L821) | SMS Sent to Customer | |
| WP-CLM-062 | Synlig tekst; [ClaimFormStep.tsx:828](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L828) | Send SMS to Customer | |
| WP-CLM-063 | Synlig tekst; [ClaimFormStep.tsx:831](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L831) | Enter the customer's phone number and customize the message before sending the SMS. | |
| WP-CLM-064 | Synlig tekst; [ClaimFormStep.tsx:838](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L838) | Customer Phone Number | |
| WP-CLM-065 | placeholder; [ClaimFormStep.tsx:844](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L844) | e.g., +44 20 7946 0958 | |
| WP-CLM-066 | Synlig tekst; [ClaimFormStep.tsx:858](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L858) | SMS Message | |
| WP-CLM-067 | Synlig tekst; [ClaimFormStep.tsx:874](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L874) | This is a standard message that will be sent to the customer. | |
| WP-CLM-068 | Synlig tekst; [ClaimFormStep.tsx:888](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L888) | Sending... | |
| WP-CLM-069 | Synlig tekst; [ClaimFormStep.tsx:893](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L893) | Send SMS | |
| WP-CLM-070 | Synlig tekst; [ClaimFormStep.tsx:905](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L905) | SMS Successfully Sent | |
| WP-CLM-071 | Synlig tekst; [ClaimFormStep.tsx:907](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L907) | An SMS has been sent to the customer with a link to create their claim form on our platform. | |
| WP-CLM-072 | Synlig tekst; [ClaimFormStep.tsx:914](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L914) | Phone: | |
| WP-CLM-073 | Synlig tekst; [ClaimFormStep.tsx:917](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L917) | Message: | |
| WP-CLM-074 | Synlig tekst; [ClaimFormStep.tsx:931](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L931) | What happens next: | |
| WP-CLM-075 | Synlig tekst; [ClaimFormStep.tsx:933](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L933) | • Customer receives SMS with secure link | |
| WP-CLM-076 | Synlig tekst; [ClaimFormStep.tsx:934](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L934) | • Customer fills out claim form on our platform | |
| WP-CLM-077 | Synlig tekst; [ClaimFormStep.tsx:935](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L935) | • Form data automatically appears in this case | |
| WP-CLM-078 | Synlig tekst; [ClaimFormStep.tsx:948](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L948) | Additional Information | |
| WP-CLM-079 | Synlig tekst; [ClaimFormStep.tsx:950](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L950) | Please provide additional details about the damage and circumstances. | |
| WP-CLM-080 | Synlig tekst; [ClaimFormStep.tsx:957](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L957) | Cause of Damage | |
| WP-CLM-081 | Synlig tekst; [ClaimFormStep.tsx:967](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L967) | Select cause of damage | |
| WP-CLM-082 | Synlig tekst; [ClaimFormStep.tsx:977](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L977) | Pre-existing Wear and Tear | |
| WP-CLM-083 | Synlig tekst; [ClaimFormStep.tsx:987](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L987) | Select wear and tear level | |
| WP-CLM-084 | Synlig tekst; [ClaimFormStep.tsx:997](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L997) | Location of Damage | |
| WP-CLM-085 | placeholder; [ClaimFormStep.tsx:1006](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L1006) | Where did the damage occur? (e.g., M25 motorway, shopping center car park, home driveway) | |
| WP-CLM-086 | Synlig tekst; [ClaimFormStep.tsx:1022](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L1022) | Claim Form Document | |
| WP-CLM-087 | title; [ClaimFormStep.tsx:1037](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L1037) | Claim Form Document | |
| WP-CLM-088 | Synlig tekst; [ClaimFormStep.tsx:1047](../src/features/case-creation/components/steps/ClaimFormStep.tsx#L1047) | Close | |
