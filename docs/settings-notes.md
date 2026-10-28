# Innstillinger – arbeidsnotater

## Formål og kildegrunnlag

Redigere profil og se organisasjon/logg. Inngang: **/settings**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](settings-copy.md).

- [SettingsPage.tsx](../src/pages/SettingsPage.tsx)

## Brukerflyt

Åpne fra kontomenyen, rediger profilfelter og velg lagring. Organisasjon og logg vises separat.

## Data, tilstander og begrensninger

Lagre venter ett sekund og oppdaterer lokal AuthContext. Loggen er statisk; personverdiene er utelatt fra tekstarket.

## Åpne spørsmål og TODO

- [ ] Avklar redigerbare felt, rollegrense og reell lagring/feilrespons.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
