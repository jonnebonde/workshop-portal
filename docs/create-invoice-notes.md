# Opprette sak – faktura – arbeidsnotater

## Formål og kildegrunnlag

Legge til fakturagrunnlag før avslutning. Inngang: **/new-case · steg 5**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](create-invoice-copy.md).

- [InvoiceStep.tsx](../src/features/case-creation/components/steps/InvoiceStep.tsx)

## Brukerflyt

Steget inneholder filvalg, forhåndsvisning og simulerte faktura-/OCR-tilstander samt korrigeringsvisninger.

## Data, tilstander og begrensninger

Eksisterende tekst beskrives som kode, ikke godkjent krav om manuell fakturaregistrering. Sluttinnsending håndteres i CaseCreationFeature.

## Åpne spørsmål og TODO

- [ ] Avklar hvilke felt som faktisk skal vises/redigeres og test manglende faktura og mislykket behandling.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
