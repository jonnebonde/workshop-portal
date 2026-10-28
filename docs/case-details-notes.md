# Saksdetaljer – arbeidsnotater

## Formål og kildegrunnlag

Følge opp en eksisterende sak og dens seksjoner. Inngang: **/cases/:id**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](case-details-copy.md).

- [CaseDetail.tsx](../src/pages/CaseDetail.tsx)
- [CaseDetailHeader.tsx](../src/components/CaseDetailHeader.tsx)
- [CaseInfoSection.tsx](../src/components/CaseInfoSection.tsx)
- [ProgressTracker.tsx](../src/components/ProgressTracker.tsx)
- [DeleteCaseModal.tsx](../src/components/DeleteCaseModal.tsx)

## Brukerflyt

Åpne fra sakstabellen. Undersøk dekning, skademelding, bilder, vedlegg, deler/arbeid, kalibrering, faktura og logg. Header og lokale kontroller styrer overgangene; sletting har bekreftelsesdialog.

## Data, tilstander og begrensninger

useCaseData leser og oppdaterer mockData. Fakturabehandling og dokumentmetadata simuleres. Saksopprettelsen bruker en separat hook; en opprettet sak er ikke dermed dokumentert persistert i denne listen.

## Åpne spørsmål og TODO

- [ ] Brukerønske 2026-10-28: La headeren på saksdetaljsiden forklare status og tilbakemeldinger på saksdata og seksjoner mer detaljert. Avklar hvilke tilstander, tilbakemeldinger og neste handlinger som skal vises, i sammenheng med [fjerning av progressikoner fra sakslisten](cases-notes.md).
- [ ] Verifiser statusoverganger, avbrudd, manglende sak og sammenhengen mellom opprettelse og saksdetaljer.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
