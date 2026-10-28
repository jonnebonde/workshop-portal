# Faktura i saksdetaljer – arbeidsnotater

## Formål og kildegrunnlag

Vise fakturafil og tilhørende vurdering. Inngang: **Saksdetaljer**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](invoice-copy.md).

- [InvoiceFileManagement.tsx](../src/components/sections/InvoiceFileManagement.tsx)

## Brukerflyt

Fakturakomponenten viser dokumentet og bruker FileUploadSection. Opprettelsesflyten har et eget tekstark.

## Data, tilstander og begrensninger

Lokal modell og simulerte metadata er ikke et OCR- eller fakturaintegrasjonsresultat.

## Åpne spørsmål og TODO

- [ ] Avklar opplasting, erstatning, sletting, feil og hvilken informasjon som kommer fra dokumenttjenesten.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
