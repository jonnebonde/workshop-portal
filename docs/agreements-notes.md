# Agreements – Workshop Portal

Lokal demo, 2026-10-29. Implementert på `docs/workshop-agreements-task` etter brukerens uttrykkelige valg av gren, med utgangspunkt i `47639b7`. Gjenbruk av WP-utkast `be9ae9d` er gjennomgått og tilpasset. Ingen API-integrasjon eller produksjonsbekreftelse.

Referansekode lest 2026-10-29: PP `Prisavtale-v3@0f48f44111eb03d8148a3cc4b1170c13fa66122b` (PriceAgreement, PriceAgreementsV2 og WindscreenPrices) og AP `main@138b01d5afd34df712eccb8841684d2c014f8af8` (PriceAgreement). Faner, detaljhode, filtre, grupperte tabeller og fast tabellhode følger referansemønsteret med WP sine farger. Versjonshistorikken er en velger i samme detaljvisning, ikke referanseportalenes administrasjonsmodal.

## Formål og flyt

`/price-agreement` viser bare tilordnede avtaler i lesemodus. Velg et tilgjengelig forsikringsselskap, åpne prisavtalen eller rammevilkårene som er tilordnet verkstedet, og eventuelle tilordnede rutepriser. Velg gjeldende eller historisk versjon og filtrer tabellen på tekst, kjøretøytype og kategori.

Presentasjonen følger AP/PP-mønsteret med avtaleområder, kontekst, gyldighet, versjoner, grupperte prislinjer og samme eksisterende merkevarefarger. WP har ingen partneroversikt, partnerpreferanser, redigering, opprettelse, opplasting, planlegging eller publisering. Skjulte administrasjonskomponenter er ikke importert.

## Kode og avgrensning

- [AgreementsPage](../src/pages/AgreementsPage.tsx): lokal innloggings-/lastetilstand og datakobling.
- [AgreementsView](../src/features/agreements/AgreementsView.tsx): kontekst, avtaleområder, historikk, filtre og tabell.
- [model](../src/features/agreements/model.ts): eksplisitt tilordning og filtrering. Ingen automatisk prioritet mellom kjede- og verkstedavtale eller skjult fallback til rammevilkår.
- [demoRepository](../src/features/agreements/demoRepository.ts): fiktive priser/selskaper. Bare eksisterende `demo-user` får den faste demotilordningen; ukjent bruker får ingen avtaler.
- [Tester](../scripts/test-agreements.mjs): kjør `node --test scripts/test-agreements.mjs`.
- [Tekstark](agreements-copy.md).

Demokatalogen viser A med en kjedeavtale og rutepriser, og B med tilordnede rammevilkår. Historikk inneholder publiserte versjoner; utkast og planlagte versjoner vises ikke. Visning av rammevilkår er eksplisitt tilordnet av datakilden, ikke utledet fra fravær av annen avtale. Tom pris betyr ikke null; rabatt og ikke-fakturerbare linjer er synlige.

Tilordnet historikk er lesbar også uten aktiv versjon. En versjon uten prislinjer har egen tomtilstand, adskilt fra søk uten treff. Bytte av selskap eller avtale monterer detaljvisningen på nytt og nullstiller versjon og filtre; bytte av verksted nullstiller hele avtalevisningen. Verkstedvelger er ikke innført før autorisert kjedekontekst er avklart.

## Eksport

Brukeren ba 2026-10-29 om eksport med tydelig prisversjon, valg av filformat og deretter en modal for eksportvalgene. `Export [versjon]…` åpner [eksportmodalen](../src/features/agreements/AgreementExportModal.tsx), uten å starte nedlasting. Dialogen viser avtale, verksted, selskap, valgt versjon, status og gyldighet. Den åpnes med et øyeblikksbilde av versjonen brukeren ser på. Historiske priser merkes uttrykkelig. `File format` tilbyr Excel (.xlsx), valgt som standard hver gang dialogen åpnes, og CSV (.csv). `Export [versjon] ([format])` i dialogen starter nedlastingen og lukker dialogen når nedlastingen er startet.

Alle prislinjer i den valgte publiserte versjonen eksporteres, også historiske versjoner. Søk og filtre begrenser ikke eksporten; dette står i dialogen med radantallet. Tom versjon har deaktivert åpningsknapp. Under generering vises `Preparing export…`, og formatvalg, eksport og lukking er deaktivert. Feil beholder dialogen med mulighet for nytt forsøk. Cancel, lukkeknapp, Escape og klikk utenfor lukker ellers dialogen. Headless UI håndterer fokusfelle og tilbakeføring av fokus; formatvelgeren får startfokus.

Referansekontroll for modal 2026-10-29: AP PriceAgreement har en `Export list`-knapp uten eksportdialog i den undersøkte koden; PP WindscreenPrices/Reports/SummaryReport viste heller ingen ferdig eksportmodal. Dialogen følger derfor AP/PP sitt generelle dialogmønster (panel, overskrift, kantlinjer og handlinger nederst), tilpasset WP med eksisterende Headless UI. Dette er ikke en påstand om en identisk eksisterende eksportmodal.

[Eksportfunksjonen](../src/features/agreements/export.ts) lager semikolonseparert UTF-8 CSV med BOM. Hver prisrad inneholder demomerking, verksted, selskap, avtale-ID/navn/omfang, versjons-ID/navn/status, gyldighet, valuta og avgiftsgrunnlag. Filnavnet inneholder avtale-ID, versjons-ID, status og gyldighetsdatoer. Tom pris forblir tom. Tekst siteres og formelstarter nøytraliseres før filen åpnes i et regneark. Eksporten beregner eller velger ikke prisversjon for en sak.

Excel er et ekte XLSX-dokument generert med `write-excel-file` 4.1.1, lastet ved eksport. Ett ark viser avtale- og versjonskonteksten øverst og deretter prislinjene med tilpassede kolonnebredder og fast tabellhode. Priser og timer lagres som tall, rabatt som prosent, og manglende verdier som tomme celler. Artikkel-ID-er og andre tekster beholdes som tekst; tekst blir ikke en Excel-formel. Excel og CSV bruker samme datagrunnlag og samme versjonsmerking i filnavnet.

Dette er lokal nedlasting av allerede tilordnet demodata. Tilgang og eksportrettigheter i en integrert løsning må håndheves på serveren.

## Integrasjonskontrakt som gjenstår

- Backend må avlede verksted og tilordning fra autorisert identitet, og returnere bare tillatte avtaler/versjoner. Klientfiltrering er ikke tilgangssikkerhet; demodata finnes i klientpakken.
- Eksisterende WP-auth er en lokal simulering. Brukerprofilens fritekstfelter og rolle skal ikke bestemme avtaletilgang.
- Kjedebrukers verkstedvalg, admin/vanlig brukers rettigheter, historisk medlemskap og hvilke historiske versjoner som kan deles må avklares før reell tilgang bygges.
- Datakilden må levere korrekt gjeldende versjon og gyldighetsperioder. Dette er ikke implementasjon av prisberegning eller automatisk versjonsaktivering.
- Eksemplenes valuta, avgiftsvisning, priser, navn og tildelinger er demovalg, ikke vedtatte kontrakter eller kommersielle data.
- Framtidige publiserte versjoner og full API-feilhåndtering er ikke implementert. Excel- og CSV-eksport finnes i demoen; serverbasert eksport og rettigheter er ikke integrert.

## Kontroller

Ti målrettede tester består (`npm run test:agreements`): eksplisitt tilordning, ukjent bruker, utkast/fremtidig versjon, historikk uten aktiv versjon, tom avtale, kombinerte filtre, fravær av administrasjon/partnerpreferanser, korrekt eksportversjon og kontekst, CSV-sitering/formelbeskyttelse, simulert nedlasting/opprydding og reelt XLSX-innhold med numeriske priser, historisk kontekst, fast tabellhode og tekst uten formler. Modalinnholdet testes med portal/fokusdelen erstattet av en teststub; historisk kontekst, standardvalget Excel, CSV-alternativet og avbryt-handlingen kontrolleres i rendret HTML. Dette tester demologikk, serverrendret HTML og simulert nettleser-API, ikke serverautorisasjon eller modalinteraksjoner i nettleser. Vite-bygg, målrettet ESLint og TypeScript-kontroll for avtalevisning/modell/eksport/modal består. Bygget varsler om chunkstørrelse og gammel Browserslist-database. Excel-filen er kontrollert strukturelt som XLSX, men ikke visuelt i Microsoft Excel.

Nettleserkontroll 2026-10-29 ble blokkert: browser access host var utilgjengelig, og tilgang til Chrome via Computer Use ble ikke godkjent. Desktop, mobil, tastatur, kontekstbytte og horisontal rulling er derfor ikke nettleserverifisert. Hele repoets lint/typekontroll er ikke grunnlag for denne leveransen.
