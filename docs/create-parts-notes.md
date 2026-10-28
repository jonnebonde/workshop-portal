# Opprette sak – deler og arbeid – arbeidsnotater

## Formål og kildegrunnlag

Registrere reparasjonslinjer og kalibreringsgrunnlag. Inngang: **/new-case · steg 3**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](create-parts-copy.md).

- [PartsLaborStep.tsx](../src/features/case-creation/components/steps/PartsLaborStep.tsx)

## Brukerflyt

Legg til eller endre linjer og fyll ut relevant kalibrering. Kalibreringstekster er samlet i calibration-copy.md.

## Data, tilstander og begrensninger

Stegets fullføring avhenger av linjer og lokal kalibreringslogikk. Priser og dataverdier fra scenarioer er utelatt.

## Åpne spørsmål og TODO

- [ ] Test endret jobbtype, tomme linjer, vurderingsbytte og hopp-over-flyt.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
