# Opprette sak – skademelding – arbeidsnotater

## Formål og kildegrunnlag

Registrere eller håndtere skademeldingsgrunnlaget. Inngang: **/new-case · steg 2**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](create-claim-copy.md).

- [ClaimFormStep.tsx](../src/features/case-creation/components/steps/ClaimFormStep.tsx)

## Brukerflyt

Steget har opplasting, informasjon, alternative handlinger og demonstrasjonstilstander. Navigasjonen får beskjed om valgt handling.

## Data, tilstander og begrensninger

Lokale scenarioer og dokumentbehandling bekrefter ikke reell DDF-tilgang eller levering.

## Åpne spørsmål og TODO

- [ ] Avklar tillatte valg, samtykke/tilgang, reserveflyt og når brukeren kan fortsette.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
