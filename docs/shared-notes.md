# Felles status og opplasting – arbeidsnotater

## Formål og kildegrunnlag

Gjenbruke statusvisning, filvalg og tilbakemeldinger. Inngang: **Delte komponenter**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](shared-copy.md).

- [SectionWrapper.tsx](../src/components/sections/SectionWrapper.tsx)
- [FileUploadSection.tsx](../src/components/sections/FileUploadSection.tsx)
- [Toast.tsx](../src/components/Toast.tsx)

## Brukerflyt

Tekster fra wrapper, filopplasting og toast dokumenteres ett sted; sidene bruker komponentene med egne props.

## Data, tilstander og begrensninger

Nettleserens standardtekster for filvalg og validering kan variere. Faktiske runtime-feilmeldinger og dynamiske verdier er ikke uttømmende kjent fra koden.

## Åpne spørsmål og TODO

- [ ] Ved endring: kontroller alle brukere av komponenten og behold forskjellen på fullført og godkjent.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
