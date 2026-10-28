# Logg og meldinger – arbeidsnotater

## Formål og kildegrunnlag

Lese hendelser og sende en melding i saken. Inngang: **Saksdetaljer**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](communication-copy.md).

- [CommunicationLogSection.tsx](../src/components/sections/CommunicationLogSection.tsx)
- [ActionLogView.tsx](../src/components/sections/ActionLogView.tsx)

## Brukerflyt

Synlig logg markeres sett gjennom IntersectionObserver. Tom melding avvises lokalt; Enter sender og Shift+Enter lar brukeren skrive videre.

## Data, tilstander og begrensninger

Melding legges til lokal actionLog gjennom onUpdate. Dette bekrefter ikke mottak hos agent, varsling eller tilgang til interne notater.

## Åpne spørsmål og TODO

- [ ] Avklar meldings-/hendelsestyper, mottak, feilhåndtering og serverstyrt tilgang.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
