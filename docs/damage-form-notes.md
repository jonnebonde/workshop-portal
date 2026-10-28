# Skademelding og DDF – arbeidsnotater

## Formål og kildegrunnlag

Se og håndtere skademeldingsdokumenter og SMS-dialog. Inngang: **Saksdetaljer**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](damage-form-copy.md).

- [DdfFileManagement.tsx](../src/components/sections/DdfFileManagement.tsx)
- [SendDdfSmsModal.tsx](../src/components/SendDdfSmsModal.tsx)

## Brukerflyt

Dokumentvisning/opplasting, felter og SMS-dialog finnes i egne komponenter. Generelle opplastingstekster dokumenteres under shared.

## Data, tilstander og begrensninger

Komponentene bruker lokale saksfunksjoner og metadata. Synlige knapper bekrefter ikke SMS-leveranse eller faktisk dokumentlagring.

## Åpne spørsmål og TODO

- [ ] Avklar datakilder, felteierskap, tilgang og feiltilstander før integrasjon.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
