# Deler og arbeid – arbeidsnotater

## Formål og kildegrunnlag

Vise og redigere reparasjonslinjer. Inngang: **Saksdetaljer**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](parts-labor-copy.md).

- [PartsLaborSection.tsx](../src/components/sections/PartsLaborSection.tsx)

## Brukerflyt

Seksjonen bruker lokale linjer, kategorivalg og handlinger for tillegg og fjerning.

## Data, tilstander og begrensninger

Kodeobservasjonen gjelder lokal oppdatering via onUpdate, ikke agentens mottak og godkjenning.

## Åpne spørsmål og TODO

- [ ] Avklar og test hvilke felt som kan endres i hver saksstatus og hvordan forslag skiller seg fra godkjente verdier.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
