# Nyheter – arbeidsnotater

## Formål og kildegrunnlag

Lese meldinger og bekrefte viktige nyheter. Inngang: **/news**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](news-copy.md).

- [NewsPage.tsx](../src/pages/NewsPage.tsx)

## Brukerflyt

View åpner en modal. Vanlig nyhet markeres lest ved lukking; viktig nyhet krever Confirm read. Vedlegg har nedlastingsvalg.

## Data, tilstander og begrensninger

mockNews og confirmedRead er lokal komponenttilstand. Navigasjonens badge er hardkodet. Det eksisterende news-page-ux-ui.md er beholdt.

## Åpne spørsmål og TODO

- [ ] Kontroller tomtilstand, bekreftelse uten lukking, tastatur/fokus og varig lest-status.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
