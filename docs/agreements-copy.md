# Agreements – tekstark

Kilde: [AgreementsView.tsx](../src/features/agreements/AgreementsView.tsx), [AgreementsPage.tsx](../src/pages/AgreementsPage.tsx) og [Layout.tsx](../src/components/Layout.tsx), arbeidsgren `docs/workshop-agreements-task`, 2026-10-29. Se [notater](agreements-notes.md). Fiktive avtalenavn, selskapsnavn, artikkeltekster og beløp er data, ikke felles UI-tekst.

Behold ID og plassholdere. Tomt Forslag betyr ingen endring.

Eksportvalg, versjonsbekreftelse og eksportfeil ligger nå i [AgreementExportModal.tsx](../src/features/agreements/AgreementExportModal.tsx). Åpningsknappen ligger fortsatt i AgreementsView. Eksportens dataoverskrifter ligger i [export.ts](../src/features/agreements/export.ts).

| ID | Hvor | Dagens tekst | Forslag |
| --- | --- | --- | --- |
| WP-AGR-001 | Sidetittel og navigasjon | Agreements | |
| WP-AGR-002 | Introduksjon | Your workshop’s prices, terms and published version history. | |
| WP-AGR-003 | Rettighet | Read-only access | |
| WP-AGR-004 | Demoopplysning | Demo preview · Fictional agreements and prices for review. | |
| WP-AGR-005 | Kontekst | Workshop | |
| WP-AGR-006 | Selskapsvelger | Insurance company | |
| WP-AGR-007 | Avtaletype fra datamodell | Price agreement / Framework terms / Windscreen prices | |
| WP-AGR-008 | Versjonsvelger | Version history | |
| WP-AGR-009 | Versjonsstatus | Active / Historical | |
| WP-AGR-010 | Gjeldende | Current prices | |
| WP-AGR-011 | Historisk advarsel | Historical version — not current prices | |
| WP-AGR-012 | Gyldighet | Valid from [dato] to [dato] | |
| WP-AGR-013 | Valuta | Currency: [valuta] · Prices excl. VAT | |
| WP-AGR-014 | Søk | Search articles or comments | |
| WP-AGR-015 | Søk, placeholder | Search by ID, article or comment | |
| WP-AGR-016 | Kjøretøyfilter | Vehicle type | |
| WP-AGR-017 | Alle kjøretøy | All vehicle types | |
| WP-AGR-018 | Kategorifilter | Category | |
| WP-AGR-019 | Alle kategorier | All categories | |
| WP-AGR-020 | Antall treff | [antall] of [total] price lines | |
| WP-AGR-021 | Nullstill | Clear filters | |
| WP-AGR-022 | Tabellkolonner | ID / Article / Price / Discount / Max. hours / Comment / Billable | |
| WP-AGR-023 | Fakturerbar | Yes / No | |
| WP-AGR-024 | Ingen søketreff | No matching price lines | |
| WP-AGR-025 | Søkehjelp | Try another search or clear the filters. | |
| WP-AGR-026 | Tom tilordning | No agreements available | |
| WP-AGR-027 | Tom tilordning, hjelp | No published agreements have been assigned to this workshop. Contact your administrator if you expected to see an agreement. | |
| WP-AGR-028 | Ingen versjon | No published version is available. | |
| WP-AGR-029 | Laster | Loading agreements… | |
| WP-AGR-030 | Ikke innlogget | Sign in to view workshop agreements. | |
| WP-AGR-031 | Ukjent verksted | No assigned workshop | |
| WP-AGR-032 | Tilgjengelig navn | Agreement areas / Agreement price table | |
| WP-AGR-033 | Tom avtaleversjon | This agreement has no price lines | |
| WP-AGR-034 | Tom avtaleversjon, hjelp | No prices have been provided for this version. | |
| WP-AGR-035 | Skjermleser, tabelltekst | [avtale], [versjon], [status], [fra-dato] to [til-dato], prices in [valuta] excluding VAT | |
| WP-AGR-036 | Eksportkontekst, flyttet til modal 2026-10-29; prefikset Export: er fjernet | [avtale] / [verksted] · [selskap] / [versjon] · [status] | |
| WP-AGR-037 | Eksportomfang, flyttet til modal og delt i gyldighet og omfang 2026-10-29 | Valid from [fra-dato] to [til-dato] / All [antall] price lines. Search filters do not apply. | |
| WP-AGR-038 | Eksportknapp, utvidet med formatvalg 2026-10-29 | Export [versjon] ([format]) | |
| WP-AGR-039 | Eksportfeil | Export failed. Please try again. | |
| WP-AGR-040 | CSV-kontekst i export.ts | Data source / Fictional demo data / Workshop / Insurance company / Agreement ID / Agreement / Scope / Version ID / Version / Status / Valid from / Valid to / Currency / VAT / Excluded / Vehicle type / Category / Discount (%) | |
| WP-AGR-041 | Eksportformat, feltnavn | File format | |
| WP-AGR-042 | Eksportformat, valg | Excel (.xlsx) / CSV (.csv) | |
| WP-AGR-043 | Eksport pågår | Preparing export… | |
| WP-AGR-044 | Åpne eksportmodal | Export [versjon]… | |
| WP-AGR-045 | Eksportmodal, tittel | Export agreement | |
| WP-AGR-046 | Eksportmodal, beskrivelse | Choose a file format for the selected price version. | |
| WP-AGR-047 | Eksportmodal, lukkeknapp | Close export | |
| WP-AGR-048 | Eksportmodal, avbryt | Cancel | |
