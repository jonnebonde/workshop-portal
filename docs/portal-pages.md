# Workshop Portal – sider og dokumentasjon

Opprettet 2026-10-28 på `docs/portal-notes-and-copy`, fra `main@b6f6829baee6b1f4d875370836253a2dc1bfacb9`. Kartlagt mot [App.tsx](../src/App.tsx) og [Layout.tsx](../src/components/Layout.tsx). Dette er statisk kodegjennomgang, ikke funksjonstest, godkjent spesifikasjon eller produksjonsbekreftelse.

## Sider og delområder

Seks aktive sider: /, /new-case, /cases/:id, /news, /send-ddf-sms og /settings. Delområder under opprettelse og saksdetaljer er egne tekstark for enklere redigering.

| Område | Inngang | Dokumentasjon | Tekstark | Tekst-ID-er |
| --- | --- | --- | --- | --- |
| Saksoversikt | / | [Notater](cases-notes.md) | [Tekster](cases-copy.md) | 38 |
| Saksdetaljer | /cases/:id | [Notater](case-details-notes.md) | [Tekster](case-details-copy.md) | 39 |
| Forsikringsdekning | Saksdetaljer | [Notater](coverage-notes.md) | [Tekster](coverage-copy.md) | 7 |
| Skademelding og DDF | Saksdetaljer | [Notater](damage-form-notes.md) | [Tekster](damage-form-copy.md) | 26 |
| Bilder og vedlegg | Saksdetaljer | [Notater](images-notes.md) | [Tekster](images-copy.md) | 48 |
| Deler og arbeid | Saksdetaljer | [Notater](parts-labor-notes.md) | [Tekster](parts-labor-copy.md) | 23 |
| Kalibrering | Saksdetaljer og opprettelse | [Notater](calibration-notes.md) | [Tekster](calibration-copy.md) | 75 |
| Faktura i saksdetaljer | Saksdetaljer | [Notater](invoice-notes.md) | [Tekster](invoice-copy.md) | 9 |
| Logg og meldinger | Saksdetaljer | [Notater](communication-notes.md) | [Tekster](communication-copy.md) | 4 |
| Opprette sak – ramme og navigasjon | /new-case | [Notater](create-case-notes.md) | [Tekster](create-case-copy.md) | 24 |
| Opprette sak – kjøretøy og dekning | /new-case · steg 1 | [Notater](create-vehicle-notes.md) | [Tekster](create-vehicle-copy.md) | 70 |
| Opprette sak – skademelding | /new-case · steg 2 | [Notater](create-claim-notes.md) | [Tekster](create-claim-copy.md) | 88 |
| Opprette sak – deler og arbeid | /new-case · steg 3 | [Notater](create-parts-notes.md) | [Tekster](create-parts-copy.md) | 26 |
| Opprette sak – bilder | /new-case · steg 4 | [Notater](create-photos-notes.md) | [Tekster](create-photos-copy.md) | 67 |
| Opprette sak – faktura | /new-case · steg 5 | [Notater](create-invoice-notes.md) | [Tekster](create-invoice-copy.md) | 57 |
| Nyheter | /news | [Notater](news-notes.md) | [Tekster](news-copy.md) | 13 |
| Sende DDF-SMS | /send-ddf-sms | [Notater](send-ddf-sms-notes.md) | [Tekster](send-ddf-sms-copy.md) | 12 |
| Innstillinger | /settings | [Notater](settings-notes.md) | [Tekster](settings-copy.md) | 26 |
| Navigasjon og støtte | Felles skall | [Notater](navigation-notes.md) | [Tekster](navigation-copy.md) | 21 |
| Felles status og opplasting | Delte komponenter | [Notater](shared-notes.md) | [Tekster](shared-copy.md) | 4 |

## Dekning og avgrensning

677 tekst-ID-er dekker faste JSX-tekster, tekst-attributter, relevante valg og tilbakemeldinger i de oppførte komponentene. Rå saksdata, profilverdier, nyhetsinnhold og eksempelregistre er utelatt. Runtime-/API-meldinger og nettleserens innebygde tekster er ikke en komplett del av dette kodegrunnlaget. Dynamiske kategorier fra datafiler må kontrolleres separat når de skal endres.

Ukjent rute går til /. Ingen egen login- eller rapportside er registrert i App. Ikke opprett tekstark som later som slike sider finnes. Eldre/inaktive komponenter som NewCaseModal, CaseInfoSidebar, ChatLogSection og CaseSummarySection er ikke dokumentert som aktive sider.

## Vedlikehold

Begynn med [redigere tekst](editing-copy.md). Bevar eksisterende tekst-ID-er og forslag. Legg nye tekster til med nye ID-er, og marker fjernet/erstattet tekst. Oppdater relevante notes-filer og denne oversikten når sider endres. Delte komponenter dokumenteres én gang.

Eksisterende [kalibreringsnotat](calibration-ux-ui.md) og [nyhetsnotat](news-page-ux-ui.md) er bevart. Kildekode og brukerflyt er ikke endret av dokumentasjonsarbeidet. Se [kontrollrapport](documentation-check.md).
