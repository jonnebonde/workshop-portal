# Sende DDF-SMS – arbeidsnotater

## Formål og kildegrunnlag

Vise et skjema for DDF-lenke via SMS. Inngang: **/send-ddf-sms**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](send-ddf-sms-copy.md).

- [SendDdfSmsPage.tsx](../src/pages/SendDdfSmsPage.tsx)

## Brukerflyt

Fyll telefon og registreringsnummer, se meldingspreview og trykk Send SMS.

## Data, tilstander og begrensninger

handleSubmit viser en lokal success-toast og tømmer feltene; ingen SMS-API kalles. En success-tekst her er en simulering.

## Åpne spørsmål og TODO

- [ ] Avklar tilgjengelighet, servervalidering, samtykke, sending, feil og gjentatt innsending.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
