# Endringslogg til utviklerne

Opprettet 2026-11-02. Gjelder endringer fra arbeidet med Agreements og sidetitler i Workshop Portal. Dette er starten på en løpende oversikt, ikke en full historikk over repoet.

Bruk avkryssingen til å holde kontroll på hva som er formidlet. Den betyr ikke at utviklerne har implementert endringen eller at noe er satt i produksjon.

| ID | Endret | Område | Kode-/demostatus | Formidlet til utviklerne |
| --- | --- | --- | --- | --- |
| WP-END-001 | 2026-10-29 | Ny Agreements-side | Lokal demo i commit `9ba6987` | [ ] |
| WP-END-002 | 2026-10-29 | Eksport med Excel og CSV | Lokal demo i commit `9ba6987` | [ ] |
| WP-END-003 | 2026-10-29 | Eksportvalg i modal | Lokal demo i commit `9ba6987` | [ ] |
| WP-END-004 | 2026-11-02 | Felles sidetitler og plassering | Endret i arbeidskopien, ikke committet ved registrering | [ ] |
| WP-END-005 | 2026-11-02 | Dashboard endret til Cases i sidemenyen | Endret i arbeidskopien, ikke committet ved registrering | [ ] |
| WP-END-006 | 2026-11-02 | Navn uten profilbilde i toppnavigasjonen | Endret i arbeidskopien, ikke committet ved registrering | [ ] |
| WP-END-007 | 2026-11-02 | Demoboks på Agreements følger Developer mode-stilen | Endret i arbeidskopien, ikke committet ved registrering | [ ] |

Arbeidsgren ved registrering: `docs/workshop-agreements-task`, HEAD `9ba6987`. Commitopplysningene er kontrollert lokalt; ekstern lagring, merge og produksjon er ikke verifisert her.

## WP-END-001 – Agreements

**Til utviklerne:** Verkstedet skal kunne lese sine egne avtaler fra en ny Agreements-side, med samme hovedmønster som i Agent Portal og Partner Portal.

- Ny side på `/price-agreement`, tilgjengelig fra navigasjonen.
- Viser uttrykkelig tilordnet prisavtale eller rammevilkår og eventuelle tilordnede rutepriser.
- Viser avtalenavn, verksted, forsikringsselskap, versjon og gyldighet. Gjeldende og historiske priser skilles tydelig.
- Søk, kjøretøy- og kategorifilter over grupperte prislinjer. Tydelige tomtilstander.
- Ingen Preferred Partner-data eller administrasjonshandlinger. Manglende tilordning gir ingen avtaler.

**Gjenstår:** Backend må håndheve tilgang og levere riktige avtaler og tillatte versjoner. Roller, kjedekontekst og historisk tilgang må avklares før integrasjon. Dagens fiktive data og klientfiltrering er en demo.

Se [avtalenotater](agreements-notes.md), [oppgavegrunnlag](workshop-agreements-task.md) og [sidekomponent](../src/pages/AgreementsPage.tsx).

## WP-END-002 – Eksport av valgt prisversjon

**Til utviklerne:** Brukeren skal kunne velge Excel eller CSV og tydelig se hvilken prisversjon som eksporteres. Excel er standard.

- Eksporterer alle prislinjer i valgt publisert versjon, inkludert historiske versjoner. Søk og filtre begrenser ikke eksporten; dette opplyses før nedlasting.
- Versjon, status og gyldighet følger både filinnholdet og filnavnet. Avtale, verksted og selskap følger filinnholdet.
- Excel er en ekte `.xlsx`-fil med tallverdier, formatering og fast tabellhode. CSV beholdes som alternativ. Manglende pris blir ikke null.
- Tom avtaleversjon kan ikke eksporteres.

**Gjenstår:** Eksportrettigheter må håndheves ved backend-integrasjon. Excel-filen er kontrollert strukturelt, men ikke visuelt i Microsoft Excel.

Se [eksportfunksjon](../src/features/agreements/export.ts) og [eksportbeskrivelse](agreements-notes.md#eksport).

## WP-END-003 – Eksportmodal

**Til utviklerne:** Eksportknappen skal åpne en modal der brukeren ser avtale og prisversjon, velger format og deretter starter nedlastingen.

- Åpning av modal starter ikke nedlasting.
- Viser avtale, verksted, selskap, versjon, historisk/gjeldende status, gyldighet og antall prislinjer.
- Excel er forhåndsvalgt. Brukeren kan velge CSV eller avbryte.
- Lastetilstand hindrer dobbel eksport. Ved feil beholdes modal og mulighet for nytt forsøk.
- Følger dialogmønsteret fra de andre portalene; en identisk ferdig eksportmodal ble ikke funnet i undersøkt referansekode.

**Gjenstår:** Kontroller åpning/lukking, fokus, Escape, tastatur og mobilvisning i nettleser.

Se [eksportmodal](../src/features/agreements/AgreementExportModal.tsx).

## WP-END-004 – Felles sidetitler

**Til utviklerne:** Bruk Dashboard som standard for alle hovedtitler, slik at tittelen holder samme stil og plassering når brukeren bytter side.

- Samme størrelse, vekt og farge: 18 px, semibold, `text-gray-900`.
- Samme innrykk i kode: 24 px fra venstre og 32 px fra toppen av innholdsområdet.
- Fjernet dekorative tittelikoner, introduksjonstekster, egne tittelbakgrunner, kantlinjer og skygger.
- Omfatter Dashboard, saksdetaljer, opprettelse av sak, News, Send DDF SMS, Settings og Agreements.
- News beholder smalere artikkelbredde. Saksdetaljer beholder handlinger, dato, VRN og festet fremdriftsvisning under tittelen.
- Seksjonsoverskrifter og modaltitler er ikke gjort om til sidetitler. Fjernede tekster er markert i eksisterende tekstark med opprinnelige ID-er.

**Gjenstår:** Visuell kontroll av plassering ved sidebytte, mobilbredder og rulling, særlig festet topp på saksdetaljer.

Se [felles sidestandard og berørte sider](portal-pages.md#vedlikehold).

## WP-END-005 – Cases i sidemenyen

**Til utviklerne:** Endre lenketeksten fra «Dashboard» til «Cases», slik at den samsvarer med sidetittelen. Lenken går fortsatt til `/`. Samme meny brukes på desktop og mobil.

Kilde: [Layout](../src/components/Layout.tsx) og tekst-ID WP-NAV-006 i [navigasjonstekstarket](navigation-copy.md). Kontrollert i kode og med diffkontroll; ingen ny funksjon eller rute.

## WP-END-006 – Navn uten profilbilde

**Til utviklerne:** Fjern det runde profilbildet i toppnavigasjonen og vis den innloggede brukerens navn på både desktop og mobil. Navnet åpner fortsatt profilmenyen med innstillinger og utlogging. Lange navn avkortes visuelt på smale skjermer.

Kilde: [Layout](../src/components/Layout.tsx). Alt-tekst WP-NAV-002 er markert som fjernet i [navigasjonstekstarket](navigation-copy.md). Kontrollert i kode og med diffkontroll; visuell mobilkontroll gjenstår.

## WP-END-007 – Demoboks i Developer mode-stil

**Til utviklerne:** Bruk samme visuelle uttrykk som Developer mode-panelet i kalibrering for demomerkingen på Agreements: lys oransje bakgrunn, stiplet kant og liten semibold overskrift. «Demo preview» og opplysningen om fiktive avtaler og priser beholdes, fordelt på overskrift og brødtekst. Ingen ny utviklerfunksjon eller av/på-bryter er lagt til.

Kilde: [AgreementsView](../src/features/agreements/AgreementsView.tsx) og [avtalenotater](agreements-notes.md). Visuell nettleserkontroll gjenstår.

## Kontroller og begrensninger ved registrering

- Sist kjørte bygg og ti avtaletester består. Målrettet lint/typekontroll bestod under avtale-/eksportarbeidet; dette er ikke en full typekontroll av repoet.
- Siste kalibreringsregresjon: 13 beståtte, to feilede tester på tekstforventninger. Kalibreringskomponentene og testfilen er ikke endret av sidetittelarbeidet. Dette er et separat funn.
- Visuell nettleserkontroll er ikke gjennomført. Ingen av oppføringene bekrefter produksjonsleveranse.

## Videre oppdatering

Legg til nye brukerrettede endringer med neste ledige ID. Oppgi dato, hva brukeren opplever, hva utviklerne skal ta med, lokal kode-/demostatus, kilde og gjenstående kontroll. Oppdater eksisterende punkt når samme endring videreutvikles; behold tidligere vesentlige valg. Marker formidlet først når dette faktisk er bekreftet.
