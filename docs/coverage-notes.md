# Forsikringsdekning – arbeidsnotater

## Formål og kildegrunnlag

Vise dekningsgrunnlag og status. Inngang: **Saksdetaljer**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](coverage-copy.md).

- [InsuranceCoverageSection.tsx](../src/components/sections/InsuranceCoverageSection.tsx)

## Brukerflyt

Les dekning og tilhørende informasjon i sakens dekningsseksjon.

## Data, tilstander og begrensninger

Saksdata tilføres som props fra den lokale saksmodellen. Visning er ikke bevis på reelt dekningsoppslag.

## Åpne spørsmål og TODO

- [ ] Avklar ordlyd for ventende, ukjent og manglende dekning; disse må ikke utilsiktet få samme betydning.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
