# Opprette sak – kjøretøy og dekning – arbeidsnotater

## Formål og kildegrunnlag

Samle oppslagsgrunnlag og vise kjøretøy/dekning. Inngang: **/new-case · steg 1**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](create-vehicle-copy.md).

- [VRNLookupStep.tsx](../src/features/case-creation/components/steps/VRNLookupStep.tsx)

## Brukerflyt

Fyll ut oppslagsfeltene, les resultatet og bekreft grunnlaget før neste steg. Komponenten inneholder utviklerscenarier og eksisterende-sak-tilstander.

## Data, tilstander og begrensninger

Simulerte oppslag og utviklervalg må ikke fremstilles som verifiserte eksterne API-er. Eksempelpersoner, kjøretøyverdier og saksdata er ikke tekstgrunnlag.

## Åpne spørsmål og TODO

- [ ] Avklar manglende treff, manuell behandling og hvilke inndata som nullstiller avhengige data.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
