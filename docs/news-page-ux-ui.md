# News Page UX/UI-spec

## Formål

`/news` er en enkel nyhetsflate for verkstedbrukere. Siden skal gjøre det lett å:

- se hvilke nyheter som finnes
- forstå hvilke nyheter som er nye/uleste
- åpne en nyhet i en modal uten å forlate siden
- bekrefte at en nyhet er lest
- laste ned eventuelle vedlegg

Dette er per nå en mockup for å vise ønsket UX/UI til utviklere. Den bruker lokal mockdata og lokal state i komponenten.

## Sideoppsett

Siden består av:

- en toppseksjon med tittel `News`
- en kortliste med alle nyheter
- en empty state hvis listen er tom
- en modal som åpnes når bruker trykker `View`

Hver nyhet vises som et kort med:

- tittel
- statusbadge
- publiseringsdato
- kort oppsummering
- innholdstekst
- eventuell ekstern lenke
- knapp for å åpne nyheten i modal

## Kortlisten

Kortlisten skal gi rask oversikt uten å kreve navigasjon til egen detaljside.

Forventet UX:

- uleste nyheter skal være tydelig markert
- brukeren åpner nyheten via `View`
- listen beholdes i bakgrunnen mens modal er åpen

Nåværende mockup-logikk:

- ulest nyhet viser badge `New message`
- lest nyhet styres av `confirmedRead[newsItem.id]`

Merk:

- i dagens kode rendres badge for lest nyhet uten tekst på kortet. Utvikler bør erstatte dette med en tydelig label, for eksempel `Read` eller `Confirmed`.

## Modal for nyhet

Når brukeren trykker `View`, åpnes en sentrert modal over siden.

Modalen inneholder:

- lukkeknapp øverst til høyre
- tittel
- statusbadge (`Unconfirmed` eller `Confirmed`)
- publiseringsdato
- summary
- fullt innhold
- valgfritt bilde
- vedlegg med `Download`-knapp
- `Bekreft lest`-knapp nederst i innholdet

### Viktig UX-intensjon

Nyheten skal ikke åpne en ny side. Hele leseopplevelsen skal skje i modalen.

Det gjør at:

- brukeren beholder konteksten fra listen
- gjennomlesning går raskere
- det er tydelig at `Bekreft lest` hører til akkurat den åpne nyheten

## Bekreft lest

`Bekreft lest` er en eksplisitt handling brukeren må gjøre etter å ha lest nyheten.

Forventet oppførsel:

- knappen skal alltid være visuelt tydelig plassert nederst i nyhetsmodalen
- knappen skal ikke lukke modalen når den trykkes
- trykk på knappen skal markere nyheten som lest
- etter bekreftelse skal knappen bli disabled for å hindre dobbel handling
- knappetekst endres til `Lest bekreftet`

Dette gir tydelig feedback uten at brukeren mister innholdet.

## Vedlegg

Vedlegg vises som en enkel liste i modalen.

Forventet UX:

- filnavn skal være lesbart
- hver fil skal ha en tydelig `Download`-knapp
- nedlasting er sekundær handling og skal ikke konkurrere visuelt med `Bekreft lest`

## Empty state

Hvis det ikke finnes nyheter, skal siden vise:

- ikon
- overskrift `No news available`
- hjelpetekst om å komme tilbake senere

Dette hindrer at siden oppleves som tom eller ødelagt.

## Nåværende teknisk implementasjon

I dagens mockup ligger logikken i `src/pages/NewsPage.tsx`.

State:

- `selectedNewsId`: styrer hvilken nyhet som er åpen i modal
- `confirmedRead`: lokal map med lest-status per nyhets-ID

Data:

- nyheter kommer fra lokal konstant `mockNews`
- det finnes foreløpig ingen backend-kobling

Routing:

- siden er tilgjengelig på `/news`
- modal åpnes internt i komponenten, ikke via egen route

## Anbefalinger til utvikling

Ved reell implementasjon bør utvikler vurdere:

- hente nyheter fra API i stedet for mockdata
- persistere lest-status per bruker
- støtte filter for `all`, `unread`, `read`
- bruke mer konsistent språkvalg i UI, enten norsk eller engelsk
- gjøre statuslabel på kort og i modal helt konsistent
- vurdere om modaltilstand skal kunne deep-linkes med query parameter eller route state

## Filreferanser

- `src/pages/NewsPage.tsx`
- `src/App.tsx`
