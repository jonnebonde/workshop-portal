# Navigasjon og støtte – arbeidsnotater

## Formål og kildegrunnlag

Finne sider, profil, utlogging og støtte. Inngang: **Felles skall**. Kodeobservasjon 2026-10-28 ved `workshop-portal/main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Confidence: Confirmed for statisk kode, ikke runtime eller produktgodkjenning. Se [tekstark](navigation-copy.md).

- [Layout.tsx](../src/components/Layout.tsx)
- [CreateCaseFab.tsx](../src/components/CreateCaseFab.tsx)
- [ChatbotButton.tsx](../src/components/ChatbotButton.tsx)

## Brukerflyt

Navigasjon viser Dashboard, Create new case, News og Send DDF SMS. Profilmenyen åpner Settings og Sign Out; flytende knapper åpner opprettelse og støtte.

## Data, tilstander og begrensninger

App har ingen /login-rute, selv om utlogging navigerer dit. AuthContext er en lokal demo og Layout filtrerer ikke disse menyvalgene etter rolle. Støtteknappens Send har ingen handler.

## Åpne spørsmål og TODO

- [ ] Avklar reell innlogging, navigasjon per rolle, støtteintegrasjon og bunnlenker som nå peker til #.
- [ ] Gjennomgå og velg ønskede tekstforslag i tekstarket før implementering.
- [ ] Kontroller berørte tilstander i nettleseren når UI endres.

TODO er videre arbeid, ikke rapporterte feil eller vedtatt leveranseplan. Produktkrav må kontrolleres i autorisert produktkilde; lokale kodefunn erstatter ikke dem.
