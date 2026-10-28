# Kalibrering – arbeidsnotater

## Formål og kildegrunnlag

Vise kalibreringsvurdering og verkstedets dokumentasjon. Inngang: **Saksdetaljer og opprettelse**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](calibration-copy.md).

- [CalibrationSection.tsx](../src/components/sections/CalibrationSection.tsx)
- [CalibrationAssessment.tsx](../src/components/common/CalibrationAssessment.tsx)
- [CalibrationSection.tsx](../src/features/case-creation/components/CalibrationSection.tsx)

## Brukerflyt

Detaljvisning og opprettelse har hver sin CalibrationSection. Mulig behov kan be verkstedet velge required eller not_required. Se eksisterende calibration-ux-ui.md for spesifikke scenarier.

## Data, tilstander og begrensninger

Tekst og lokal logikk er undersøkt som kode. API-mapping, tverrportalregler og faktisk godkjenning er ikke bekreftet. Eksisterende UX-notat beholdes.

## Åpne spørsmål og TODO

- [ ] Kontroller begge komponenter ved tekstendringer og kjør kalibreringstestene når regler eller flyt endres.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
