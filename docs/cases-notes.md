# Saksoversikt – arbeidsnotater

## Formål og kildegrunnlag

Søke, filtrere og åpne saker. Inngang: **/**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](cases-copy.md).

- [Dashboard.tsx](../src/pages/Dashboard.tsx)
- [CasesTable.tsx](../src/components/CasesTable.tsx)
- [CaseCard.tsx](../src/components/CaseCard.tsx)
- [TableToolbar.tsx](../src/components/TableToolbar.tsx)
- [CaseStatusIcons.tsx](../src/components/CaseStatusIcons.tsx)

## Brukerflyt

Fanene Open, Awaiting Invoice, On Hold og All Cases styres av URL-parameteren tab. Søket filtrerer listen før CasesTable rendres. Desktop-tabell og mobilkort har egne presentasjoner.

## Data, tilstander og begrensninger

Dashboard henter lokale mockdata. Sideoverskriften er Cases, mens navigasjonen fortsatt sier Dashboard. Nettleserkjøring, reelle tall og API er ikke verifisert.

## Åpne spørsmål og TODO

- [ ] Brukerønske 2026-10-28: Fjern progress-/seksjonsikonene fra sakslisten, både i desktop-tabellen og mobilkortene. Begrunnelse: «Åpen» skal formidle at det er Workshop Portal-brukerens tur til å arbeide med saken. Detaljert seksjonsstatus og tilbakemeldinger skal forklares i [headeren på saksdetaljsiden](case-details-notes.md). Dette er ønsket retning, ikke verifisert nåværende statuslogikk.
- [ ] Vurder behov for sortering, filtrering eller gruppering av saker per verksted for kjedebrukere. Selve visningsformen er uavklart; se [støtte for kjedebrukere og verkstedvalg](create-case-notes.md).
- [ ] Avklar ønsket standardfane, søkefelt og konsistent navigasjonstekst.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
